package com.example.backend.dashboard.service;

import com.example.backend.dashboard.domain.CaseEntity;
import com.example.backend.dashboard.domain.CaseEntity.CaseState;
import com.example.backend.dashboard.dto.CaseResponse;
import com.example.backend.dashboard.repository.CaseRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Collections;
import java.util.List;
import java.util.Objects;
import java.util.stream.Collectors;

@Service
@Transactional
@RequiredArgsConstructor
public class DashboardService {

    private final CaseRepository caseRepository;

    // (전체) 출동 중인 사건 조회
    public List<CaseResponse> getActiveCases() {
        List<CaseEntity> cases = caseRepository.findAllByStateOrderById(CaseState.출동);

        if (cases == null || cases.isEmpty()) {
            return Collections.emptyList();
        }

        //  return cases.stream().map(this::convertToDto).collect(Collectors.toList());
        return cases.stream().map(this::convertToDto).collect(Collectors.toList());
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
