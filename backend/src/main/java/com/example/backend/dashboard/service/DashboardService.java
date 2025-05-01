package com.example.backend.dashboard.service;

import com.amazonaws.HttpMethod;
import com.amazonaws.services.s3.model.GeneratePresignedUrlRequest;
import com.example.backend.common.domain.CaseEntity;
import com.example.backend.common.domain.PoliceEntity;
import com.example.backend.dashboard.dto.DashboardResponse;
import com.example.backend.dashboard.dto.StateRequest;
import com.example.backend.dashboard.dto.SurveyRequest;
import com.example.backend.dashboard.repository.DashboardRepository;
import com.example.backend.user.dto.UserResponseDto;
import jakarta.persistence.EntityNotFoundException;
import jakarta.servlet.http.HttpSession;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.*;
import java.util.concurrent.TimeUnit;
import java.util.stream.Collectors;


import com.amazonaws.services.s3.AmazonS3;


@Service
@Transactional
@RequiredArgsConstructor
public class DashboardService {

    @Value("${cloud.aws.bucket}")
    private String bucket;
    private final AmazonS3 s3Client;
    private final DashboardRepository dashboardRepository;

    // 세션에서 officeId 추출
    private int getAuthenticatedOfficeId(HttpSession session) {
        UserResponseDto user = (UserResponseDto) session.getAttribute("user");
        if (user == null) {
            throw new IllegalStateException("세션이 만료되었거나 로그인되지 않았습니다.");
        }
        return user.getOfficeId();
    }

    private int getAuthenticatedPoliceId(HttpSession session) {
        UserResponseDto user = (UserResponseDto) session.getAttribute("user");
        if (user == null) {
            throw new IllegalStateException("세션이 만료되었거나 로그인되지 않았습니다.");
        }
        return user.getId();
    }

    // 사건 조회 및 권한 검증 (중복 제거)
    private CaseEntity getAuthorizedCase(int caseId, HttpSession session) {
        int officeId = getAuthenticatedOfficeId(session);

        CaseEntity caseEntity = dashboardRepository.findById(caseId)
                .orElseThrow(() -> new EntityNotFoundException("해당 사건을 찾을 수 없습니다."));
        if (caseEntity.getOffice().getId() != officeId) {
            throw new IllegalStateException("해당 사건에 대한 권한이 없습니다.");
        }
        return caseEntity;
    }

    // 사건 조회
    public List<DashboardResponse> getCases(HttpSession session) {
        int officeId = getAuthenticatedOfficeId(session);

        List<CaseEntity.CaseState> targetStates = List.of(
                CaseEntity.CaseState.미확인,
                CaseEntity.CaseState.확인
        );

        List<CaseEntity> readyCases = dashboardRepository.findAllByOfficeIdAndStateInOrderByIdDesc(officeId, targetStates);

        List<CaseEntity> progressCases = dashboardRepository.findAllByOfficeIdAndStateOrderByProgressDateDesc(officeId, CaseEntity.CaseState.출동);

        if (readyCases.isEmpty() && progressCases.isEmpty()) {
            throw new NoSuchElementException("미확인, 확인 또는 출동 중인 사건이 없습니다.");
        }

        List<CaseEntity> combinedCases = new ArrayList<>();
        combinedCases.addAll(readyCases);
        combinedCases.addAll(progressCases);

        return combinedCases.stream()
                .map(DashboardResponse::fromEntity)
                .collect(Collectors.toList());
    }

    // id별 사건 영상 조회
    public Map<String, String> getCaseVideo(int id, HttpSession session) {
        CaseEntity caseEntity = getAuthorizedCase(id, session);

        String videoKey = caseEntity.getVideo();
        if (videoKey == null || videoKey.trim().isEmpty()) {
            throw new EntityNotFoundException("해당 사건에 대한 영상이 없습니다.");
        }

        if (caseEntity.getState() == CaseEntity.CaseState.미확인) {
            caseEntity.setState(CaseEntity.CaseState.확인);
            dashboardRepository.save(caseEntity);
        }

        // Presigned URL 유효기간 설정 (30분)
        Date expiration = new Date();
        long expTime = expiration.getTime();
        expTime += TimeUnit.MINUTES.toMillis(30);   // 30 minute
        expiration.setTime(expTime);

        GeneratePresignedUrlRequest presignRequest =
                new GeneratePresignedUrlRequest(bucket, videoKey)
                        .withMethod(HttpMethod.GET)
                        .withExpiration(expiration);

        String url = s3Client.generatePresignedUrl(presignRequest).toString();
        return Collections.singletonMap("video", url);

    }

    // 출동, 미출동 상태 변경
    public Map<String, String> updateCaseState(int id, StateRequest request, HttpSession session) {
        CaseEntity caseEntity = getAuthorizedCase(id, session);
        int policeId = getAuthenticatedPoliceId(session);

        if (caseEntity.getState() == CaseEntity.CaseState.출동 ||
                caseEntity.getState() == CaseEntity.CaseState.미출동 ||
                caseEntity.getState() == CaseEntity.CaseState.완료) {
            throw new IllegalStateException("해당 사건은 이미 출동 처리되었거나 완료된 사건입니다.");
        }

        if (request.getState() == CaseEntity.CaseState.출동) {
            // 출동 처리
            caseEntity.setState(CaseEntity.CaseState.출동);

            // 경찰관 배정
            PoliceEntity assignedPolice = PoliceEntity.builder().id(policeId).build();
            caseEntity.setPolice(assignedPolice);

            // 출동 날짜 및 시간
            LocalDateTime now = LocalDateTime.now();
            DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss");
            String formattedDate = now.format(formatter);

            // 올바른 형식으로 파싱하여 progressDate에 설정
            caseEntity.setProgressDate(LocalDateTime.parse(formattedDate, formatter));

            dashboardRepository.save(caseEntity);

            return Collections.singletonMap("message", "지금 출동합니다.");
        } else {
            // 미출동 처리
            caseEntity.setState(CaseEntity.CaseState.미출동);

            if (request.getCategory() != null) {
                caseEntity.setAccuracy(false);
                caseEntity.setCategory(request.getCategory());
            }

            dashboardRepository.save(caseEntity);

            return Collections.singletonMap("message", "미출동 사건으로 변경합니다.");
        }
    }

    // 출동 중인 사건 해결 처리
    public Map<String, String> completeCase(int id, SurveyRequest surveyRequest, HttpSession session) {
        CaseEntity caseEntity = getAuthorizedCase(id, session);

        if (caseEntity.getState() != CaseEntity.CaseState.출동) {
            throw new IllegalStateException("해당 사건은 출동 상태가 아닙니다.");
        }

        caseEntity.setState(CaseEntity.CaseState.완료);

        if (surveyRequest.getCategory() != null) {
            caseEntity.setAccuracy(false);
            caseEntity.setCategory(surveyRequest.getCategory());
        }

        dashboardRepository.save(caseEntity);

        return Collections.singletonMap("message", "해당 사건이 해결 처리되었습니다.");
    }
}
