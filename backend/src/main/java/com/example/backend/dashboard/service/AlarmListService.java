package com.example.backend.dashboard.service;

import com.example.backend.common.domain.CaseEntity;
import com.example.backend.common.domain.PoliceEntity;
import com.example.backend.dashboard.dto.AlarmResponse;
import com.example.backend.dashboard.repository.AlarmListRepository;
import com.example.backend.user.dto.UserResponseDto;
import jakarta.persistence.EntityNotFoundException;
import jakarta.servlet.http.HttpSession;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.Arrays;
import java.util.List;
import java.util.NoSuchElementException;
import java.util.stream.Collectors;

import static com.example.backend.common.domain.CaseEntity.CaseState;

@Service
@RequiredArgsConstructor
public class AlarmListService {
    private final AlarmListRepository alarmListRepository;

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

        CaseEntity caseEntity = alarmListRepository.findById(caseId)
                .orElseThrow(() -> new EntityNotFoundException("해당 사건을 찾을 수 없습니다."));
        if (caseEntity.getOffice().getId() != officeId) {
            throw new NoSuchElementException("해당 사건에 대한 권한이 없습니다.");
        }
        return caseEntity;
    }

    public List<AlarmResponse> getReadyCases(HttpSession session) {
        int officeId = getAuthenticatedOfficeId(session);
        List<CaseEntity> cases = alarmListRepository.findByOfficeIdAndStateIn(
                officeId,
                Arrays.asList(CaseState.확인, CaseState.미확인)
        );

        return cases.stream()
                .map(AlarmResponse::fromEntity)
                .collect(Collectors.toList());
    }

    public AlarmResponse getCaseById(Integer id, HttpSession session) {
        CaseEntity caseEntity = getAuthorizedCase(id, session);

        if(caseEntity.getState() != CaseEntity.CaseState.확인 && caseEntity.getState() != CaseEntity.CaseState.미확인) {
            throw new IllegalStateException("해당 사건은 이미 출동 되었거나 완료된 사건입니다.");
        }

        return AlarmResponse.fromEntityWithVideo(caseEntity);
    }

    public String updateCaseState(Integer id, HttpSession session) {
        CaseEntity caseEntity = getAuthorizedCase(id, session);
        int policeId = getAuthenticatedPoliceId(session);

        // 이미 state가 "출동"이면 메시지 반환
        if (caseEntity.getState() == CaseEntity.CaseState.출동) {
            return "이미 출동된 사건입니다.";
        } else {
            // 그 외의 경우, state를 "출동"으로 변경 후 저장
            caseEntity.setState(CaseEntity.CaseState.출동);

            // 경찰관 배정: 현재 로그인한 경찰관의 id를 PoliceEntity에 할당
            PoliceEntity assignedPolice = PoliceEntity.builder().id(policeId).build();
            caseEntity.setPolice(assignedPolice);

            alarmListRepository.save(caseEntity);
            return "지금 출동합니다.";
        }
    }

}
