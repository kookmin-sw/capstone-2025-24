package com.example.backend.analysis.service;

import com.example.backend.analysis.dto.*;
import com.example.backend.analysis.repository.CaseStatsCategoryRepository;
import com.example.backend.analysis.repository.CaseStatsOverviewRepository;
import com.example.backend.common.domain.CaseStatsOverviewEntity;
import com.example.backend.user.dto.UserResponseDto;
import jakarta.servlet.http.HttpSession;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.time.YearMonth;
import java.util.*;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class CaseStatsService {

    private final CaseStatsOverviewRepository statsOverviewRepository;
    private final CaseStatsCategoryRepository statsCategoryRepository;

    // 세션에서 officeId 추출
    private int getOfficeId(HttpSession session) {
        UserResponseDto user = (UserResponseDto) session.getAttribute("user");
        if (user == null) {
            throw new IllegalStateException("세션이 만료되었거나 로그인되지 않았습니다.");
        }
        return user.getOfficeId();
    }

    // period에 따른 시작일 계산 (weekly: 최근 7일, monthly: 최근 1개월, yearly: 최근 1년)
    private LocalDateTime getStartDateFromPeriod(String period) {
        String periodParam = (period != null) ? period.toLowerCase() : "weekly";

        return switch (periodParam) {
            case "weekly" -> LocalDateTime.now().minusDays(7);
            case "monthly" -> LocalDateTime.now().minusMonths(1);
            case "yearly" -> LocalDateTime.now().minusYears(1);
            default -> throw new IllegalArgumentException("잘못된 period 값입니다. 'weekly', 'monthly', 'yearly' 중 하나여야 합니다.");
        };
    }

    // category 값 처리 (null이면 'all'로 처리)
    private String processCategory(String category) {
        return (category != null) ? category.toLowerCase() : "all";
    }

    // Overview 조회 (officeId 기반)
    public CaseStatsOverviewResponse getOverview(HttpSession session) {
        int officeId = getOfficeId(session);

        CaseStatsOverviewEntity stats = statsOverviewRepository.findByOfficeId(officeId)
                .orElseThrow(() -> new NoSuchElementException("해당 office_id에 대한 통계 데이터가 없습니다."));

        // 최근 한 달간 데이터를 기준으로 사건 건수가 가장 많은 CCTV 주소 조회
        String patrolRegionAddress = statsOverviewRepository.findAddressWithMostIncidentsLastMonth(officeId)
                .orElse("정보 없음");

        return CaseStatsOverviewResponse.fromEntity(stats, patrolRegionAddress);
    }

    // 시간대별 사건 수 조회 (결과에 없는 시간은 0으로 채움)
    public List<HourlyCaseStatsResponse> getHourlyCaseStats(String date, String category, HttpSession session) {
        int officeId = getOfficeId(session);

        String categoryParam = processCategory(category);
        List<Object[]> results = statsCategoryRepository.findHourlyCaseStats(date, officeId, categoryParam);

        // 조회된 결과를 hour를 key로 하는 맵에 담음
        Map<Integer, HourlyCaseStatsResponse> hourMap = new LinkedHashMap<>();
        for (Object[] row : results) {
            HourlyCaseStatsResponse response = HourlyCaseStatsResponse.fromRow(row);
            hourMap.put(response.getHour(), response);
        }

        // 0시부터 23시까지 모두 포함
        List<HourlyCaseStatsResponse> fullHourlyList = new ArrayList<>();
        for (int h = 0; h < 24; h++) {
            if (hourMap.containsKey(h)) {
                fullHourlyList.add(hourMap.get(h));
            } else {
                // 값이 없는 시간대는 0으로 채움
                fullHourlyList.add(HourlyCaseStatsResponse.builder()
                        .hour(h).fireCount(0).assaultCount(0).crowdCongestionCount(0).weaponCount(0).swoonCount(0)
                        .build());
            }
        }
        return fullHourlyList;
    }

    // 일별 사건 수 조회 (해당 월의 모든 날짜에 대해 없으면 0으로 채움)
    public List<DailyCaseStatsResponse> getDailyCaseStats(int year, int month, String category, HttpSession session) {
        int officeId = getOfficeId(session);

        String categoryParam = processCategory(category);
        List<Object[]> results = statsCategoryRepository.findDailyCaseStats(year, month, officeId, categoryParam);

        // 조회된 결과를 day를 key로 하는 맵에 담음
        Map<Integer, DailyCaseStatsResponse> dayMap = new LinkedHashMap<>();
        for (Object[] row : results) {
            DailyCaseStatsResponse response = DailyCaseStatsResponse.fromRow(row);
            dayMap.put(response.getDay(), response);
        }

        // 해당 월의 일 수 계산
        YearMonth yearMonth = YearMonth.of(year, month);
        int totalDays = yearMonth.lengthOfMonth();

        List<DailyCaseStatsResponse> fullDailyList = new ArrayList<>();
        for (int d = 1; d <= totalDays; d++) {
            if (dayMap.containsKey(d)) {
                fullDailyList.add(dayMap.get(d));
            } else {
                fullDailyList.add(DailyCaseStatsResponse.builder()
                        .day(d).fireCount(0).assaultCount(0).crowdCongestionCount(0).weaponCount(0).swoonCount(0)
                        .build());
            }
        }
        return fullDailyList;
    }

    // 월별 사건 수 조회 (해당 연도의 1~12월 모두에 대해 없으면 0으로 채움)
    public List<MonthlyCaseStatsResponse> getMonthlyCaseStats(int year, String category, HttpSession session) {
        int officeId = getOfficeId(session);

        String categoryParam = processCategory(category);
        List<Object[]> results = statsCategoryRepository.findMonthlyCaseStats(year, officeId, categoryParam);

        Map<Integer, MonthlyCaseStatsResponse> monthMap = new LinkedHashMap<>();
        for (Object[] row : results) {
            MonthlyCaseStatsResponse response = MonthlyCaseStatsResponse.fromRow(row);
            monthMap.put(response.getMonth(), response);
        }

        List<MonthlyCaseStatsResponse> fullMonthlyList = new ArrayList<>();
        for (int m = 1; m <= 12; m++) {
            if (monthMap.containsKey(m)) {
                fullMonthlyList.add(monthMap.get(m));
            } else {
                fullMonthlyList.add(MonthlyCaseStatsResponse.builder()
                        .month(m).fireCount(0).assaultCount(0).crowdCongestionCount(0).weaponCount(0).swoonCount(0)
                        .build());
            }
        }
        return fullMonthlyList;
    }

    // 유형별 사건 수 조회 (계산한 startDate 사용)
    // 결과가 없으면 기본 카테고리들을 모두 0으로 채워 반환
    public Map<String, Integer> getCategoryCaseStats(String period, HttpSession session) {
        int officeId = getOfficeId(session);

        LocalDateTime startDate = getStartDateFromPeriod(period);
        List<Object[]> results = statsCategoryRepository.findCategoryCaseStats(startDate, officeId);

        // 기본 카테고리 목록
        String[] categories = {"fire", "assault", "swoon", "weapon", "crowd_congestion"};
        Map<String, Integer> resultMap = new LinkedHashMap<>();
        for (String cat : categories) {
            resultMap.put(cat, 0);
        }

        // 조회 결과가 있으면 덮어씀
        for (Object[] row : results) {
            String cat = (String) row[0];
            int count = (row[1] == null) ? 0 : ((Number) row[1]).intValue();
            resultMap.put(cat, count);
        }
        return resultMap;
    }

    // 장소별 사건 수 조회 (startDate를 계산해 전달)
    public List<LocationCaseStatsResponse> getLocationCaseStats(String period, HttpSession session) {
        int officeId = getOfficeId(session);

        LocalDateTime startDate = getStartDateFromPeriod(period);
        List<Object[]> results = statsCategoryRepository.findLocationCaseStats(startDate, officeId);

        if (results.isEmpty()) {
            throw new NoSuchElementException("해당 기간에 대한 장소별 사건 데이터가 없습니다.");
        }

        return results.stream()
                .map(LocationCaseStatsResponse::fromRow)
                .collect(Collectors.toList());
    }

    // 지도용 장소별 사건 수 조회 (startDate를 계산해 전달)
    public List<MapCaseStatsResponse> getMapCaseStats(String period, HttpSession session) {
        int officeId = getOfficeId(session);

        LocalDateTime startDate = getStartDateFromPeriod(period);
        List<Object[]> results = statsCategoryRepository.findMapCaseStats(startDate);

        if (results.isEmpty()) {
            throw new NoSuchElementException("해당 기간에 대한 장소별 사건 데이터가 없습니다.");
        }

        return results.stream()
                .map(MapCaseStatsResponse::fromRow)
                .collect(Collectors.toList());
    }
}
