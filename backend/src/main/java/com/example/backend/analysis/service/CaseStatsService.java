package com.example.backend.analysis.service;

import com.example.backend.analysis.domain.CaseStatsOverviewEntity;
import com.example.backend.analysis.dto.CaseStatsOverviewResponse;
import com.example.backend.analysis.dto.DailyCaseStatsResponse;
import com.example.backend.analysis.dto.HourlyCaseStatsResponse;
import com.example.backend.analysis.dto.MonthlyCaseStatsResponse;
import com.example.backend.analysis.repository.CaseStatsCategoryRepository;
import com.example.backend.analysis.repository.CaseStatsOverviewRepository;
import com.example.backend.user.dto.UserResponseDto;
import jakarta.servlet.http.HttpSession;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.*;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class CaseStatsService {

    private final CaseStatsOverviewRepository statsOverviewRepository;
    private final CaseStatsCategoryRepository statsCategoryRepository;

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

    // 시간대 별 사건 수 조회 (category로 필터링 가능)
    public List<HourlyCaseStatsResponse> getHourlyCaseStats(String date, String category, HttpSession session) {
        UserResponseDto user = (UserResponseDto) session.getAttribute("user");
        if (user == null) {
            throw new IllegalStateException("사용자가 로그인하지 않았습니다.");
        }

        int officeId = user.getOfficeId();
        String categoryParam = (category != null) ? category.toLowerCase() : "all";

        List<Object[]> result = statsCategoryRepository.findHourlyCaseStats(date, officeId, categoryParam);

        return result.stream()
                .map(row -> new HourlyCaseStatsResponse(
                        ((Number) row[0]).intValue(),  // hour
                        ((Number) row[1]).intValue(),  // fire
                        ((Number) row[2]).intValue(),  // assault
                        ((Number) row[3]).intValue(),  // crowdCongestion
                        ((Number) row[4]).intValue(),  // weapon
                        ((Number) row[5]).intValue()   // swoon
                ))
                .collect(Collectors.toList());
    }

    // 월별 사건 수 조회 (category로 필터링 가능)
    public List<DailyCaseStatsResponse> getDailyCaseStats(int year, int month, String category, HttpSession session) {
        UserResponseDto user = (UserResponseDto) session.getAttribute("user");
        if (user == null) {
            throw new IllegalStateException("사용자가 로그인하지 않았습니다.");
        }

        int officeId = user.getOfficeId();
        String categoryParam = (category != null) ? category.toLowerCase() : "all";

        List<Object[]> results = statsCategoryRepository.findDailyCaseStats(year, month, officeId, categoryParam);

        if (results.isEmpty()) {
            throw new NoSuchElementException("해당 연도 및 월에 대한 사건 데이터가 없습니다.");
        }

        return results.stream()
                .map(row -> new DailyCaseStatsResponse(
                        ((Number) row[0]).intValue(),  // day
                        ((Number) row[1]).intValue(),  // fire
                        ((Number) row[2]).intValue(),  // assault
                        ((Number) row[3]).intValue(),  // crowdCongestion
                        ((Number) row[4]).intValue(),  // weapon
                        ((Number) row[5]).intValue()   // swoon
                ))
                .collect(Collectors.toList());
    }

    // 일별 사건 수 조회 (category로 필터링 가능)
    public List<MonthlyCaseStatsResponse> getMonthlyCaseStats(int year, String category, HttpSession session) {
        UserResponseDto user = (UserResponseDto) session.getAttribute("user");
        if (user == null) {
            throw new IllegalStateException("사용자가 로그인하지 않았습니다.");
        }

        int officeId = user.getOfficeId();
        String categoryParam = (category != null) ? category.toLowerCase() : "all";

        List<Object[]> results = statsCategoryRepository.findMonthlyCaseStats(year, officeId, categoryParam);

        if (results.isEmpty()) {
            throw new NoSuchElementException("해당 연도에 대한 사건 데이터가 없습니다.");
        }

        return results.stream()
                .map(row -> new MonthlyCaseStatsResponse(
                        ((Number) row[0]).intValue(),  // month
                        ((Number) row[1]).intValue(),  // fire
                        ((Number) row[2]).intValue(),  // assault
                        ((Number) row[3]).intValue(),  // crowdCongestion
                        ((Number) row[4]).intValue(),  // weapon
                        ((Number) row[5]).intValue()   // swoon
                ))
                .collect(Collectors.toList());
    }

}
