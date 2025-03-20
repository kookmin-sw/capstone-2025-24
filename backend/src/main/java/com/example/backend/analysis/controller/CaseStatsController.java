package com.example.backend.analysis.controller;

import com.example.backend.analysis.dto.CaseStatsOverviewResponse;
import com.example.backend.analysis.service.CaseStatsService;
import jakarta.servlet.http.HttpSession;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Collections;
import java.util.NoSuchElementException;

@RestController
@RequestMapping("/api/v1/stats")
@RequiredArgsConstructor
public class CaseStatsController {

    private final CaseStatsService caseStatsService;

    // Overview 조회
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

}
