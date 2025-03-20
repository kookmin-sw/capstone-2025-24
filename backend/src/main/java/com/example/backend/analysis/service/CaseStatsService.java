package com.example.backend.analysis.service;

import com.example.backend.analysis.domain.CaseStatsOverviewEntity;
import com.example.backend.analysis.dto.CaseStatsOverviewResponse;
import com.example.backend.analysis.repository.CaseStatsCategoryRepository;
import com.example.backend.analysis.repository.CaseStatsOverviewRepository;
import com.example.backend.user.dto.UserResponseDto;
import jakarta.servlet.http.HttpSession;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.*;

@Service
@RequiredArgsConstructor
public class CaseStatsService {

    private final CaseStatsOverviewRepository statsOverviewRepository;

    // Overview 조회 (세션을 활용한 office_id 필터링)
    public CaseStatsOverviewResponse getOverview(HttpSession session) {
        UserResponseDto user = (UserResponseDto) session.getAttribute("user");
        if (user == null) {
            throw new IllegalStateException("세션이 만료되었거나 로그인되지 않았습니다.");
        }

        int officeId = user.getOfficeId();

        CaseStatsOverviewEntity stats = statsOverviewRepository.findByOfficeId(officeId)
                .orElseThrow(() -> new NoSuchElementException("해당 office_id에 대한 통계 데이터가 없습니다."));

        return new CaseStatsOverviewResponse(
                stats.getRecentCaseCount(),
                stats.getTodayCaseCount(),
                stats.getMostCase().name()
        );
    }


}
