package com.example.backend.dashboard.service;

import com.example.backend.dashboard.domain.CaseEntity;
import com.example.backend.dashboard.domain.CaseEntity.CaseState;
import com.example.backend.dashboard.dto.CaseResponse;
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

    // Entity → DTO 변환 메서드
    private CaseResponse convertToDto(CaseEntity entity) {
        CaseResponse dto = new CaseResponse();
        dto.setId(entity.getId());
        dto.setOfficeId(entity.getOffice_id());
        dto.setPoliceId(entity.getPolice_id());
        dto.setCctvId(entity.getCctv_id());
        dto.setDate(entity.getDate());
        dto.setLevel(entity.getLevel());
        dto.setCategory(entity.getCategory().name());
        dto.setVideo(entity.getVideo());
        dto.setState(entity.getState().name());
        dto.setAccuracy(entity.isAccuracy());
        dto.setMemo(entity.getMemo());
        return dto;
    }
}
