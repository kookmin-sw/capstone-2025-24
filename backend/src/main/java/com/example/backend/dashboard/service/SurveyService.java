package com.example.backend.dashboard.service;

import com.example.backend.common.domain.CaseEntity;
import com.example.backend.dashboard.dto.SurveyRequest;
import com.example.backend.dashboard.dto.SurveyResponse;
import com.example.backend.dashboard.repository.SurveyRepository;
import com.example.backend.user.dto.UserResponseDto;
import jakarta.persistence.EntityNotFoundException;
import jakarta.servlet.http.HttpSession;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.NoSuchElementException;

@Service
@Transactional
@RequiredArgsConstructor
public class SurveyService {

    private final SurveyRepository surveyRepository;

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
        CaseEntity caseEntity = surveyRepository.findById(caseId)
                .orElseThrow(() -> new EntityNotFoundException("해당 사건을 찾을 수 없습니다."));
        if (caseEntity.getOffice().getId() != officeId) {
            throw new NoSuchElementException("해당 사건에 대한 권한이 없습니다.");
        }
        return caseEntity;
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
        surveyRepository.save(caseEntity);

        return new SurveyResponse(id, caseEntity.getCategory(), "설문조사가 정상적으로 저장되었습니다.");
    }
}
