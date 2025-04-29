package com.example.backend.dashboard.service;

import com.example.backend.common.domain.CaseEntity;
import com.example.backend.common.domain.CctvEntity;
import com.example.backend.common.domain.OfficeEntity;
import com.example.backend.dashboard.dto.CaseDetectRequest;
import com.example.backend.dashboard.dto.CaseDetectResponse;
import com.example.backend.dashboard.repository.DashboardRepository;
import com.example.backend.search.repository.CctvRepository;
import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;

@Service
@Transactional
@RequiredArgsConstructor
public class CaseDetectService {

    private final DashboardRepository caseRepository;
    private final CctvRepository cctvRepository; // CCTV 정보(주소) 조회용

    public CaseDetectResponse saveCase(CaseDetectRequest request) {
        // 1) CCTV 정보 조회 (주소 포함)
        CctvEntity cctvEntity = cctvRepository.findById(request.getCctvId())
                .orElseThrow(() -> new EntityNotFoundException("CCTV 정보를 찾을 수 없습니다."));

        int level;
        if(request.getCategory().equals("assault") || request.getCategory().equals("crowd_congestion") ) {
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

        // 3) DTO 변환: 기존에 정의한 fromEntity 메서드를 사용하여 응답 객체 생성
        return CaseDetectResponse.fromEntity(saved);
    }
}
