package com.example.backend.analysis.controller;

import com.example.backend.analysis.dto.CaseStatsOverviewResponse;
import com.example.backend.analysis.dto.HourlyCaseStatsResponse;
import com.example.backend.analysis.service.CaseStatsService;
import jakarta.servlet.http.HttpSession;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Collections;
import java.util.List;
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

}
