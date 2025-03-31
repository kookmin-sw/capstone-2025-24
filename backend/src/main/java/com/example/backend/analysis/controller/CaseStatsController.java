package com.example.backend.analysis.controller;

import com.example.backend.analysis.dto.*;
import com.example.backend.analysis.service.CaseStatsService;
import jakarta.servlet.http.HttpSession;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Collections;
import java.util.List;
import java.util.Map;
import java.util.NoSuchElementException;

@RestController
@RequestMapping("/api/v1/stats")
@RequiredArgsConstructor
public class CaseStatsController {

    private final CaseStatsService caseStatsService;

    // 개요 조회
    @GetMapping("/overview")
    public ResponseEntity<?> getOverview(HttpSession session) {
        try {
            CaseStatsOverviewResponse response = caseStatsService.getOverview(session);
            return ResponseEntity.ok(response);
        } catch (IllegalStateException e) {
            return ResponseEntity.status(401).body(Collections.singletonMap("message", e.getMessage()));
        } catch (NoSuchElementException e) {
            return ResponseEntity.status(404).body(Collections.singletonMap("message", e.getMessage()));
        } catch (Exception e) {
            return ResponseEntity.status(500).body(Collections.singletonMap("message", "내부 서버 오류 발생"));
        }
    }

    // 시간대별 사건 수 조회 (0시~23시 모두 반환)
    @GetMapping("/hour")
    public ResponseEntity<?> getHourlyCaseStats(@RequestParam("date") String date,
                                                @RequestParam(value = "category", required = false) String category,
                                                HttpSession session) {
        try {
            List<HourlyCaseStatsResponse> stats = caseStatsService.getHourlyCaseStats(date, category, session);
            return ResponseEntity.ok(stats);
        } catch (IllegalStateException e) {
            return ResponseEntity.status(401).body(Collections.singletonMap("message", e.getMessage()));
        } catch (NoSuchElementException e) {
            return ResponseEntity.status(404).body(Collections.singletonMap("message", e.getMessage()));
        } catch (Exception e) {
            return ResponseEntity.status(500).body(Collections.singletonMap("message", "내부 서버 오류가 발생했습니다."));
        }
    }

    // 월별/일별 사건 수 조회 (month 파라미터 존재 여부에 따라 분기; 전체 범위를 0으로 채워 반환)
    @GetMapping("/date")
    public ResponseEntity<?> getCaseStats(@RequestParam("year") int year,
                                          @RequestParam(value = "month", required = false) Integer month,
                                          @RequestParam(value = "category", required = false) String category,
                                          HttpSession session) {
        try {
            if (month == null) {
                List<MonthlyCaseStatsResponse> monthlyStats = caseStatsService.getMonthlyCaseStats(year, category, session);
                return ResponseEntity.ok(monthlyStats);
            }
            List<DailyCaseStatsResponse> dailyStats = caseStatsService.getDailyCaseStats(year, month, category, session);
            return ResponseEntity.ok(dailyStats);
        } catch (IllegalStateException e) {
            return ResponseEntity.status(401).body(Collections.singletonMap("message", e.getMessage()));
        } catch (NoSuchElementException e) {
            return ResponseEntity.status(404).body(Collections.singletonMap("message", e.getMessage()));
        } catch (Exception e) {
            return ResponseEntity.status(500).body(Collections.singletonMap("message", "내부 서버 오류가 발생했습니다."));
        }
    }

    // 유형별 사건 수 조회 (기본 카테고리 0 포함)
    @GetMapping("/category")
    public ResponseEntity<?> getCategoryCaseStats(@RequestParam("period") String period, HttpSession session) {
        try {
            Map<String, Integer> stats = caseStatsService.getCategoryCaseStats(period, session);
            return ResponseEntity.ok(stats);
        } catch (IllegalStateException e) {
            return ResponseEntity.status(401).body(Collections.singletonMap("message", e.getMessage()));
        } catch (IllegalArgumentException e) {
            return ResponseEntity.status(400).body(Collections.singletonMap("message", e.getMessage()));
        } catch (NoSuchElementException e) {
            return ResponseEntity.status(404).body(Collections.singletonMap("message", e.getMessage()));
        } catch (Exception e) {
            return ResponseEntity.status(500).body(Collections.singletonMap("message", "내부 서버 오류가 발생했습니다."));
        }
    }

    // 장소별 사건 수 조회
    @GetMapping("/location")
    public ResponseEntity<?> getLocationCaseStats(@RequestParam("period") String period, HttpSession session) {
        try {
            List<LocationCaseStatsResponse> stats = caseStatsService.getLocationCaseStats(period, session);
            return ResponseEntity.ok(stats);
        } catch (IllegalStateException e) {
            return ResponseEntity.status(401).body(Collections.singletonMap("message", e.getMessage()));
        } catch (IllegalArgumentException e) {
            return ResponseEntity.status(400).body(Collections.singletonMap("message", e.getMessage()));
        } catch (NoSuchElementException e) {
            return ResponseEntity.status(404).body(Collections.singletonMap("message", e.getMessage()));
        } catch (Exception e) {
            return ResponseEntity.status(500).body(Collections.singletonMap("message", "내부 서버 오류가 발생했습니다."));
        }
    }

    // 지도용 장소별 사건 수 조회
    @GetMapping("/map")
    public ResponseEntity<?> getMapCaseStats(HttpSession session) {
        List<MapCaseStatsResponse> stats = caseStatsService.getMapCaseStats(session);
        return ResponseEntity.ok(stats);
    }
}
