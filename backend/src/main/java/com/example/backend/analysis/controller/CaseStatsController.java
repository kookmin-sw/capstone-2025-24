package com.example.backend.analysis.controller;

import com.example.backend.analysis.dto.CaseStatsOverviewResponse;
import com.example.backend.analysis.dto.DailyCaseStatsResponse;
import com.example.backend.analysis.dto.HourlyCaseStatsResponse;
import com.example.backend.analysis.dto.MonthlyCaseStatsResponse;
import com.example.backend.analysis.dto.CctvCaseStatsResponse;
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

    // 시간대별 사건 수 조회
    @GetMapping("/hour")
    public ResponseEntity<?> getHourlyCaseStats(@RequestParam("date") String date,
                                                @RequestParam(value = "category", required = false) String category,
                                                HttpSession session) {
        try {
            List<HourlyCaseStatsResponse> stats = caseStatsService.getHourlyCaseStats(date, category, session);

            if (stats.isEmpty()) {
                return ResponseEntity.status(404).body(Collections.singletonMap("message", "해당 날짜에 대한 사건 데이터가 없습니다."));
            }

            return ResponseEntity.ok(stats);
        } catch (IllegalStateException e) {
            return ResponseEntity.status(401) // 401 Unauthorized
                    .body(Collections.singletonMap("message", e.getMessage()));
        } catch (Exception e) {
            return ResponseEntity.status(500)
                    .body(Collections.singletonMap("message", "내부 서버 오류가 발생했습니다."));
        }
    }

    // 월별 & 일별 사건 수 조회
    @GetMapping("/date")
    public ResponseEntity<?> getCaseStats(@RequestParam("year") int year,
                                          @RequestParam(value = "month", required = false) Integer month,
                                          @RequestParam(value = "category", required = false) String category,
                                          HttpSession session) {
        try {
            // month가 없으면 월별 사건 수 조회
            if (month == null) {
                List<MonthlyCaseStatsResponse> monthlyStats = caseStatsService.getMonthlyCaseStats(year, category, session);
                return ResponseEntity.ok(monthlyStats);
            }

            // month가 있으면 일별 사건 수 조회
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

    // 유형별 사건 수 조회
    @GetMapping("/category")
    public ResponseEntity<?> getCategoryCaseStats(@RequestParam("period") String period, HttpSession session) {
        try {
            Map<String, Integer> stats = caseStatsService.getCategoryCaseStats(period, session);
            return ResponseEntity.ok(stats);
        } catch (IllegalStateException e) {
            return ResponseEntity.status(401).body(Collections.singletonMap("message", e.getMessage()));
        } catch (IllegalArgumentException e) {
            return ResponseEntity.status(400).body(Collections.singletonMap("message", e.getMessage()));
        } catch (Exception e) {
            return ResponseEntity.status(500).body(Collections.singletonMap("message", "내부 서버 오류가 발생했습니다."));
        }
    }

    // 장소별 사건 수 조회
    @GetMapping("/location")
    public ResponseEntity<?> getLocationCaseStats(@RequestParam("period") String period, HttpSession session) {
        try {
            List<CctvCaseStatsResponse> stats = caseStatsService.getLocationCaseStats(period, session);
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

    // 장소별 사건 수 조회 - 지도
    @GetMapping("/map")
    public ResponseEntity<?> getMapCaseStats(@RequestParam("period") String period, HttpSession session) {
        try {
            List<CctvCaseStatsResponse> stats = caseStatsService.getMapCaseStats(period, session);
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

}
