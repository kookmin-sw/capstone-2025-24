package com.example.backend.dashboard.service;

import com.example.backend.common.domain.CaseEntity;
import com.example.backend.common.domain.PoliceEntity;
import com.example.backend.dashboard.dto.DashboardResponse;
import com.example.backend.dashboard.repository.DashboardRepository;
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
            throw new NoSuchElementException("해당 사건에 대한 권한이 없습니다.");
        }
        return caseEntity;
    }

    // 사건 조회
    public List<DashboardResponse> getCases(HttpSession session) {
        int officeId = getAuthenticatedOfficeId(session);

        List<CaseEntity.CaseState> targetStates = List.of(
                CaseEntity.CaseState.미확인,
                CaseEntity.CaseState.확인,
                CaseEntity.CaseState.출동
        );
        List<CaseEntity> cases = dashboardRepository.findAllByOfficeIdAndStateInOrderById(officeId, targetStates);

        return cases.stream()
                .map(DashboardResponse::fromEntity)
                .collect(Collectors.toList());
    }

    // id별 사건 영상 확인
    public Map<String, String> getCaseVideo(int id, HttpSession session) {
        CaseEntity caseEntity = getAuthorizedCase(id, session);

        String videoUrl = caseEntity.getVideo();
        if (videoUrl == null || videoUrl.trim().isEmpty()) {
            throw new EntityNotFoundException("해당 사건에 대한 영상이 없습니다.");
        }

        return Collections.singletonMap("video", videoUrl);
    }

    // 출동, 미출동 상태 변경
    public Map<Integer, String> updateCaseState(int id, CaseEntity.CaseState state, HttpSession session) {
        CaseEntity caseEntity = getAuthorizedCase(id, session);
        int policeId = getAuthenticatedPoliceId(session);

        if (caseEntity.getState() == CaseEntity.CaseState.출동 ||
                caseEntity.getState() == CaseEntity.CaseState.미출동 ||
                caseEntity.getState() == CaseEntity.CaseState.완료) {
            throw new IllegalStateException("해당 사건은 이미 출동 처리되었거나 완료된 사건입니다.");
        }

        if (state == CaseEntity.CaseState.출동) {
            // 출동 처리
            caseEntity.setState(CaseEntity.CaseState.출동);

            // 경찰관 배정
            PoliceEntity assignedPolice = PoliceEntity.builder().id(policeId).build();
            caseEntity.setPolice(assignedPolice);

            dashboardRepository.save(caseEntity);

            return Collections.singletonMap(id, "지금 출동합니다.");
        } else {
            // 미출동 처리
            caseEntity.setState(CaseEntity.CaseState.미출동);
            dashboardRepository.save(caseEntity);

            return Collections.singletonMap(id, "미출동 사건으로 변경합니다.");
        }
    }

    // 출동 중인 사건 해결 처리
    public Map<Integer, String> completeCase(int id, HttpSession session) {
        CaseEntity caseEntity = getAuthorizedCase(id, session);

        if (caseEntity.getState() != CaseEntity.CaseState.출동) {
            throw new IllegalStateException("해당 사건은 출동 상태가 아닙니다.");
        }

        caseEntity.setState(CaseEntity.CaseState.완료);
        dashboardRepository.save(caseEntity);

        return Collections.singletonMap(id, "해당 사건이 해결 처리되었습니다.");
    }
}
