package com.example.backend.dashboard.service;

import com.example.backend.dashboard.domain.CaseEntity;
import com.example.backend.dashboard.domain.CaseEntity.CaseState;
import com.example.backend.dashboard.dto.CaseResponse;
import com.example.backend.dashboard.dto.SurveyRequest;
import com.example.backend.dashboard.dto.SurveyResponse;
import com.example.backend.dashboard.repository.CaseRepository;
import com.example.backend.user.dto.UserResponseDto;
import jakarta.persistence.EntityNotFoundException;
import jakarta.servlet.http.HttpSession;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Collections;
import java.util.List;
import java.util.Map;
import java.util.NoSuchElementException;
import java.util.stream.Collectors;

@Service
@Transactional
@RequiredArgsConstructor
public class DashboardService {

    private final CaseRepository caseRepository;

    // 세션에서 officeId 추출
    private int getAuthenticatedOfficeId(HttpSession session) {
        UserResponseDto user = (UserResponseDto) session.getAttribute("user");
        if (user == null) {
            throw new IllegalStateException("세션이 만료되었거나 로그인되지 않았습니다.");
        }
        return user.getOfficeId();
    }

    // 사건 조회 및 권한 검증 (중복 제거)
    private CaseEntity getAuthorizedCase(int caseId, HttpSession session) {
        int officeId = getAuthenticatedOfficeId(session);
        CaseEntity caseEntity = caseRepository.findById(caseId)
                .orElseThrow(() -> new EntityNotFoundException("해당 사건을 찾을 수 없습니다."));
        if (caseEntity.getOffice().getId() != officeId) {
            throw new NoSuchElementException("해당 사건에 대한 권한이 없습니다.");
        }
        return caseEntity;
    }

    // (전체) 출동 중인 사건 조회
    public List<CaseResponse> getActiveCases(HttpSession session) {
        int officeId = getAuthenticatedOfficeId(session);

        List<CaseEntity> cases = caseRepository.findAllByOfficeIdAndStateOrderById(officeId, CaseState.출동);

        return cases.stream().map(this::convertToDto).collect(Collectors.toList());
    }

    // 출동 중인 사건 영상 확인
    public Map<String, String> getCaseVideo(int id, HttpSession session) {
        CaseEntity caseEntity = getAuthorizedCase(id, session);

        if (caseEntity.getState() != CaseState.출동) {
            throw new IllegalStateException("해당 사건은 출동 상태가 아닙니다.");
        }

        String videoUrl = caseEntity.getVideo();
        if (videoUrl == null || videoUrl.trim().isEmpty()) {
            throw new EntityNotFoundException("해당 사건에 대한 영상이 없습니다.");
        }

        return Collections.singletonMap("video", videoUrl);
    }

    // 출동 중인 사건 해결 처리
    public Map<Integer, String> completeCase(int id, HttpSession session) {
        CaseEntity caseEntity = getAuthorizedCase(id, session);

        if (caseEntity.getState() != CaseState.출동) {
            throw new IllegalStateException("해당 사건은 출동 상태가 아닙니다.");
        }

        caseEntity.setState(CaseState.완료);
        caseRepository.save(caseEntity);

        return Collections.singletonMap(id, "해당 사건이 해결 처리되었습니다.");
    }

    // AI 설문조사 결과 저장
    public SurveyResponse saveSurveyResult(int id, SurveyRequest surveyRequest, HttpSession session) {
        CaseEntity caseEntity = getAuthorizedCase(id, session);

        if (!caseEntity.getAccuracy()) {
            throw new IllegalStateException("이미 설문조사가 완료된 사건입니다.");
        }

        caseEntity.setAccuracy(false);
        if (surveyRequest.getCategory() != null) {
            caseEntity.setCategory(surveyRequest.getCategory());
        }
        caseRepository.save(caseEntity);

        return new SurveyResponse(id, caseEntity.getCategory(), "설문조사가 정상적으로 저장되었습니다.");
    }

    // Entity → DTO 변환
    private CaseResponse convertToDto(CaseEntity entity) {
        CaseResponse dto = new CaseResponse();
        dto.setId(entity.getId());
        dto.setOfficeId(entity.getOffice().getId());
        dto.setPoliceId(entity.getPolice().getId());
        dto.setCctvId(entity.getCctv().getId());
        dto.setDate(entity.getDate());
        dto.setLevel(entity.getLevel());
        dto.setCategory(entity.getCategory());
        dto.setVideo(entity.getVideo());
        dto.setState(entity.getState());
        dto.setAccuracy(entity.getAccuracy());
        dto.setMemo(entity.getMemo());
        return dto;
    }

}
