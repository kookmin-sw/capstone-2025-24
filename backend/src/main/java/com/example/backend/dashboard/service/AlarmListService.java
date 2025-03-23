package com.example.backend.dashboard.service;

import com.example.backend.dashboard.domain.CaseEntity;
import com.example.backend.dashboard.dto.AlarmResponse;
import com.example.backend.dashboard.repository.AlarmListRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.Arrays;
import java.util.List;
import java.util.stream.Collectors;

import static com.example.backend.dashboard.domain.CaseEntity.CaseState;

@Service
@RequiredArgsConstructor
public class AlarmListService {
    private final AlarmListRepository alarmListRepository;

    public List<AlarmResponse> getReadyCases(Integer officeId) {
        List<CaseEntity> cases = alarmListRepository.findByOffice_IdAndStateIn(
                officeId,
                Arrays.asList(CaseState.확인, CaseState.미확인)
        );

        return cases.stream()
                .map(AlarmResponse::fromEntity)
                .collect(Collectors.toList());
    }

}
