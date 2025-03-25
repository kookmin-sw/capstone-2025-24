package com.example.backend.analysis.service;

import com.example.backend.analysis.domain.CaseStatsOverviewEntity;
import com.example.backend.analysis.dto.CaseStatsOverviewResponse;
import com.example.backend.analysis.dto.DailyCaseStatsResponse;
import com.example.backend.analysis.dto.HourlyCaseStatsResponse;
import com.example.backend.analysis.dto.MonthlyCaseStatsResponse;
import com.example.backend.analysis.dto.CctvCaseStatsResponse;
import com.example.backend.analysis.repository.CaseStatsCategoryRepository;
import com.example.backend.analysis.repository.CaseStatsOverviewRepository;
import com.example.backend.user.dto.UserResponseDto;
import jakarta.servlet.http.HttpSession;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.time.YearMonth;
import java.util.ArrayList;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;
import java.util.NoSuchElementException;
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

        return new CaseStatsOverviewResponse(
                stats.getRecentCaseCount(), // 지난 7일간 사건 수
                stats.getTodayCaseCount(), // 오늘 사건 수
                stats.getMostCase().name() // 이번 달 가장 많이 발생 한 사건 유형
        );
    }

    // 시간대별 사건 수 조회 (결과에 없는 시간은 0으로 채움)
    public List<HourlyCaseStatsResponse> getHourlyCaseStats(String date, String category, HttpSession session) {
        int officeId = getOfficeId(session);

        String categoryParam = processCategory(category);
        List<Object[]> results = statsCategoryRepository.findHourlyCaseStats(date, officeId, categoryParam);

        // 조회된 결과를 hour를 key로 하는 맵에 담음
        Map<Integer, HourlyCaseStatsResponse> hourMap = new LinkedHashMap<>();
        for (Object[] row : results) {
            int hour = ((Number) row[0]).intValue();
            HourlyCaseStatsResponse response = new HourlyCaseStatsResponse(
                    hour,
                    ((Number) row[1]).intValue(),  // fire
                    ((Number) row[2]).intValue(),  // assault
                    ((Number) row[3]).intValue(),  // crowdCongestion
                    ((Number) row[4]).intValue(),  // weapon
                    ((Number) row[5]).intValue()   // swoon
            );
            hourMap.put(hour, response);
        }

        // 0시부터 23시까지 모두 포함하는 리스트 생성
        List<HourlyCaseStatsResponse> fullHourlyList = new ArrayList<>();
        for (int h = 0; h < 24; h++) {
            if (hourMap.containsKey(h)) {
                fullHourlyList.add(hourMap.get(h));
            } else {
                fullHourlyList.add(new HourlyCaseStatsResponse(h, 0, 0, 0, 0, 0));
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
            int day = ((Number) row[0]).intValue();
            DailyCaseStatsResponse response = new DailyCaseStatsResponse(
                    day,
                    ((Number) row[1]).intValue(),  // fire
                    ((Number) row[2]).intValue(),  // assault
                    ((Number) row[3]).intValue(),  // crowdCongestion
                    ((Number) row[4]).intValue(),  // weapon
                    ((Number) row[5]).intValue()   // swoon
            );
            dayMap.put(day, response);
        }

        // 해당 월의 일 수 계산
        YearMonth yearMonth = YearMonth.of(year, month);
        int totalDays = yearMonth.lengthOfMonth();

        List<DailyCaseStatsResponse> fullDailyList = new ArrayList<>();
        for (int d = 1; d <= totalDays; d++) {
            if (dayMap.containsKey(d)) {
                fullDailyList.add(dayMap.get(d));
            } else {
                fullDailyList.add(new DailyCaseStatsResponse(d, 0, 0, 0, 0, 0));
            }
        }

        return fullDailyList;
    }

    // 월별 사건 수 조회 (해당 연도의 1~12월 모두에 대해 없으면 0으로 채움)
    public List<MonthlyCaseStatsResponse> getMonthlyCaseStats(int year, String category, HttpSession session) {
        int officeId = getOfficeId(session);

        String categoryParam = processCategory(category);
        List<Object[]> results = statsCategoryRepository.findMonthlyCaseStats(year, officeId, categoryParam);

        // 조회된 결과를 month를 key로 하는 맵에 담음
        Map<Integer, MonthlyCaseStatsResponse> monthMap = new LinkedHashMap<>();
        for (Object[] row : results) {
            int month = ((Number) row[0]).intValue();
            MonthlyCaseStatsResponse response = new MonthlyCaseStatsResponse(
                    month,
                    ((Number) row[1]).intValue(),  // fire
                    ((Number) row[2]).intValue(),  // assault
                    ((Number) row[3]).intValue(),  // crowdCongestion
                    ((Number) row[4]).intValue(),  // weapon
                    ((Number) row[5]).intValue()   // swoon
            );
            monthMap.put(month, response);
        }

        List<MonthlyCaseStatsResponse> fullMonthlyList = new ArrayList<>();
        for (int m = 1; m <= 12; m++) {
            if (monthMap.containsKey(m)) {
                fullMonthlyList.add(monthMap.get(m));
            } else {
                fullMonthlyList.add(new MonthlyCaseStatsResponse(m, 0, 0, 0, 0, 0));
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
    public List<CctvCaseStatsResponse> getLocationCaseStats(String period, HttpSession session) {
        int officeId = getOfficeId(session);

        LocalDateTime startDate = getStartDateFromPeriod(period);
        List<Object[]> results = statsCategoryRepository.findLocationCaseStats(startDate, officeId);

        if (results.isEmpty()) {
            throw new NoSuchElementException("해당 기간에 대한 장소별 사건 데이터가 없습니다.");
        }

        return results.stream()
                .map(row -> new CctvCaseStatsResponse(
                        (String) row[0], // address
                        (Double) row[1], // latitude
                        (Double) row[2], // longitude
                        ((Number) row[3]).intValue())) // count
                .collect(Collectors.toList());
    }

    // 지도용 장소별 사건 수 조회 (startDate를 계산해 전달)
    public List<CctvCaseStatsResponse> getMapCaseStats(String period, HttpSession session) {
        int officeId = getOfficeId(session);

        LocalDateTime startDate = getStartDateFromPeriod(period);
        List<Object[]> results = statsCategoryRepository.findMapCaseStats(startDate, officeId);

        if (results.isEmpty()) {
            throw new NoSuchElementException("해당 기간에 대한 장소별 사건 데이터가 없습니다.");
        }

        return results.stream()
                .map(row -> new CctvCaseStatsResponse(
                        (String) row[0], // address
                        (Double) row[1], // latitude
                        (Double) row[2], // longitude
                        ((Number) row[3]).intValue())) // count
                .collect(Collectors.toList());
    }

}
