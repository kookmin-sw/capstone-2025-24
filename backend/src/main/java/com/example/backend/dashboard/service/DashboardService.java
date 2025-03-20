package com.example.backend.dashboard.service;

import com.example.backend.dashboard.domain.CaseEntity;
import com.example.backend.dashboard.domain.CaseEntity.CaseState;
import com.example.backend.dashboard.dto.CaseResponse;
import com.example.backend.dashboard.dto.SurveyRequest;
import com.example.backend.dashboard.dto.SurveyResponse;
import com.example.backend.dashboard.repository.CaseRepository;
import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Collections;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@Service
@Transactional
@RequiredArgsConstructor
public class DashboardService {

    private final CaseRepository caseRepository;

    // (전체) 출동 중인 사건 조회
    public List<CaseResponse> getActiveCases() {
        List<CaseEntity> cases = caseRepository.findAllByStateOrderById(CaseState.출동);

        return cases.stream().map(this::convertToDto).collect(Collectors.toList());
    }

    // 출동 중인 사건 영상 확인
    public Map<String, String> getCaseVideo(int id) {
        CaseEntity caseEntity = caseRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("해당 사건을 찾을 수 없습니다."));

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
    public Map<Integer, String> completeCase(int id) {
        CaseEntity caseEntity = caseRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("해당 사건을 찾을 수 없습니다."));

        if (caseEntity.getState() != CaseState.출동) {
            throw new IllegalStateException("해당 사건은 출동 상태가 아닙니다.");
        }

        caseEntity.setState(CaseState.완료);
        caseRepository.save(caseEntity);

        return Collections.singletonMap(id, "해당 사건이 해결 처리되었습니다.");
    }

    // AI 설문조사 결과 저장
    public SurveyResponse saveSurveyResult(int id, SurveyRequest surveyRequest) {
        CaseEntity caseEntity = caseRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("해당 사건을 찾을 수 없습니다."));

        // AI 정확성 반영 (이미 false이면 설문조사가 완료된 상태)
        if (!caseEntity.getAccuracy()) {
            throw new IllegalStateException("이미 설문조사가 완료된 사건입니다.");
        }

        caseEntity.setAccuracy(false);

        // category 업데이트 (예외 처리 포함)
        if (surveyRequest.getCategory() != null) {
            try {
                caseEntity.setCategory(surveyRequest.getCategory());
            } catch (IllegalArgumentException e) {
                throw new IllegalArgumentException("유효하지 않은 카테고리 값입니다: " + surveyRequest.getCategory());
            }
        }

        caseRepository.save(caseEntity);

        // 응답 생성
        return new SurveyResponse(id, caseEntity.getCategory(), "설문조사가 정상적으로 저장되었습니다.");
    }

    // Entity → DTO 변환 메서드
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
