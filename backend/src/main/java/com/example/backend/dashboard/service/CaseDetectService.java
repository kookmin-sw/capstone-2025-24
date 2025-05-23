package com.example.backend.dashboard.service;

import com.amazonaws.HttpMethod;
import com.amazonaws.services.s3.AmazonS3;
import com.amazonaws.services.s3.model.GeneratePresignedUrlRequest;
import com.example.backend.common.domain.CaseEntity;
import com.example.backend.common.domain.CctvEntity;
import com.example.backend.common.domain.OfficeEntity;
import com.example.backend.dashboard.dto.CaseDetectRequest;
import com.example.backend.dashboard.dto.CaseDetectResponse;
import com.example.backend.dashboard.repository.DashboardRepository;
import com.example.backend.search.repository.CctvRepository;
import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.Date;
import java.util.concurrent.TimeUnit;

@Service
@Transactional
@RequiredArgsConstructor
public class CaseDetectService {

    private final DashboardRepository caseRepository;
    private final CctvRepository cctvRepository; // CCTV 정보(주소) 조회용

    @Value("${cloud.aws.bucket}")
    private String bucket;
    private final AmazonS3 s3Client;

    public CaseDetectResponse saveCase(CaseDetectRequest request) {
        // 1) CCTV 정보 조회 (주소 포함)
        CctvEntity cctvEntity = cctvRepository.findById(request.getCctvId())
                .orElseThrow(() -> new EntityNotFoundException("CCTV 정보를 찾을 수 없습니다."));

        int level;
        if(request.getCategory().equals("assault") || request.getCategory().equals("crowd_congestion") || request.getCategory().equals("smoke")) {
            level = 1;
        } else level = 2;

        // 2) 사건 저장
        CaseEntity caseEntity = CaseEntity.builder()
                .office(OfficeEntity.builder().id(request.getOfficeId()).build())
                .cctv(cctvEntity)
                .date(LocalDateTime.now())
                .category(CaseEntity.CaseCategory.valueOf(request.getCategory()))
                .video(request.getVideo())
                .state(CaseEntity.CaseState.미확인)
                .accuracy(true)
                .memo(request.getMemo())
                .level(level)
                .progressDate(null)
                .build();

        CaseEntity saved = caseRepository.save(caseEntity);

        CaseDetectResponse detect_case = CaseDetectResponse.fromEntity(saved);

        // Presigned URL 유효기간 설정 (30분)
        Date expiration = new Date();
        long expTime = expiration.getTime();
        expTime += TimeUnit.MINUTES.toMillis(30);   // 30 minute
        expiration.setTime(expTime);

        GeneratePresignedUrlRequest presignRequest =
                new GeneratePresignedUrlRequest(bucket, detect_case.getVideo())
                        .withMethod(HttpMethod.GET)
                        .withExpiration(expiration);

        String url = s3Client.generatePresignedUrl(presignRequest).toString();
        detect_case.setVideo(url);

        // 3) DTO 변환: 기존에 정의한 fromEntity 메서드를 사용하여 응답 객체 생성
        return detect_case;
    }
}
