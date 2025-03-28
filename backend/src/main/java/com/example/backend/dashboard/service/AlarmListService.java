package com.example.backend.dashboard.service;

import com.example.backend.common.domain.CaseEntity;
import com.example.backend.dashboard.dto.AlarmResponse;
import com.example.backend.dashboard.repository.AlarmListRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.Arrays;
import java.util.List;
import java.util.stream.Collectors;

import static com.example.backend.common.domain.CaseEntity.CaseState;

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

    public AlarmResponse getCaseById(Integer id, Integer officeId) {
        CaseEntity caseEntity = alarmListRepository.findByIdAndOffice_Id(id, officeId)
                .orElseThrow(() -> new IllegalArgumentException("해당 사건이 존재하지 않거나, 접근 권한이 없습니다."));
        return AlarmResponse.fromEntityWithVideo(caseEntity);
    }

    public String updateCaseState(Integer id, Integer officeId) {
        CaseEntity caseEntity = alarmListRepository.findByIdAndOffice_Id(id, officeId)
                .orElseThrow(() -> new IllegalArgumentException("해당 사건이 존재하지 않거나, 접근 권한이 없습니다."));

        // 이미 state가 "출동"이면 메시지 반환
        if (caseEntity.getState() == CaseEntity.CaseState.출동) {
            return "이미 출동된 사건입니다.";
        } else {
            // 그 외의 경우, state를 "출동"으로 변경 후 저장
            caseEntity.setState(CaseEntity.CaseState.출동);
            alarmListRepository.save(caseEntity);
            return "지금 출동합니다.";
        }
    }

}
