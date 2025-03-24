package com.example.backend.dashboard.controller;

import com.example.backend.dashboard.dto.CaseResponse;
import com.example.backend.dashboard.dto.SurveyRequest;
import com.example.backend.dashboard.dto.SurveyResponse;
import com.example.backend.dashboard.service.DashboardService;
import jakarta.persistence.EntityNotFoundException;
import jakarta.servlet.http.HttpSession;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Collections;
import java.util.List;
import java.util.Map;
import java.util.NoSuchElementException;

@RestController
@RequestMapping("/api/v1")
@RequiredArgsConstructor
public class DashboardController {

    private final DashboardService dashboardService;

    // 출동 중인 사건 조회
    @GetMapping("/case/move")
    public ResponseEntity<?> getActiveCases(HttpSession session) {
        try {
            List<CaseResponse> cases = dashboardService.getActiveCases(session);
            if (cases.isEmpty()) {
                return ResponseEntity.status(404).body(Collections.singletonMap("message", "출동 중인 사건이 없습니다."));
            }
            return ResponseEntity.ok(cases);
        } catch (IllegalStateException e) {
            if (e.getMessage().contains("세션이 만료") || e.getMessage().contains("로그인되지")) {
                return ResponseEntity.status(401).body(Collections.singletonMap("message", e.getMessage()));
            }
            return ResponseEntity.status(400).body(Collections.singletonMap("message", e.getMessage()));
        } catch (NoSuchElementException e) {
            return ResponseEntity.status(403).body(Collections.singletonMap("message", e.getMessage()));
        } catch (EntityNotFoundException e) {
            return ResponseEntity.status(404).body(Collections.singletonMap("message", e.getMessage()));
        } catch (Exception e) {
            return ResponseEntity.status(500).body(Collections.singletonMap("message", "내부 서버 오류가 발생했습니다."));
        }
    }

    // 출동 중인 사건 영상 확인
    @GetMapping("/case/move/{id}")
    public ResponseEntity<?> getCaseVideo(@PathVariable int id, HttpSession session) {
        try {
            Map<String, String> videoResponse = dashboardService.getCaseVideo(id, session);
            return ResponseEntity.ok(videoResponse);
        } catch (IllegalStateException e) {
            if (e.getMessage().contains("세션이 만료") || e.getMessage().contains("로그인되지")) {
                return ResponseEntity.status(401).body(Collections.singletonMap("message", e.getMessage()));
            }
            return ResponseEntity.status(400).body(Collections.singletonMap("message", e.getMessage()));
        } catch (NoSuchElementException e) {
            return ResponseEntity.status(403).body(Collections.singletonMap("message", e.getMessage()));
        } catch (EntityNotFoundException e) {
            return ResponseEntity.status(404).body(Collections.singletonMap("message", e.getMessage()));
        } catch (Exception e) {
            return ResponseEntity.status(500).body(Collections.singletonMap("message", "내부 서버 오류가 발생했습니다."));
        }
    }

    // 출동 중인 사건 해결 처리
    @PutMapping("/case/complete/{id}")
    public ResponseEntity<?> completeCase(@PathVariable int id, HttpSession session) {
        try {
            Map<Integer, String> completedCase = dashboardService.completeCase(id, session);
            return ResponseEntity.ok(completedCase);
        } catch (IllegalStateException e) {
            if (e.getMessage().contains("세션이 만료") || e.getMessage().contains("로그인되지")) {
                return ResponseEntity.status(401).body(Collections.singletonMap("message", e.getMessage()));
            }
            return ResponseEntity.status(400).body(Collections.singletonMap("message", e.getMessage()));
        } catch (NoSuchElementException e) {
            return ResponseEntity.status(403).body(Collections.singletonMap("message", e.getMessage()));
        } catch (EntityNotFoundException e) {
            return ResponseEntity.status(404).body(Collections.singletonMap("message", e.getMessage()));
        } catch (Exception e) {
            return ResponseEntity.status(500).body(Collections.singletonMap("message", "내부 서버 오류가 발생했습니다."));
        }
    }

    // AI 설문조사 결과 저장
    @PutMapping("/survey/{id}")
    public ResponseEntity<?> saveSurveyResult(@PathVariable int id,
                                              @RequestBody SurveyRequest surveyRequest,
                                              HttpSession session) {
        try {
            SurveyResponse surveyResult = dashboardService.saveSurveyResult(id, surveyRequest, session);
            return ResponseEntity.ok(surveyResult);
        } catch (IllegalStateException e) {
            if (e.getMessage().contains("세션이 만료") || e.getMessage().contains("로그인되지")) {
                return ResponseEntity.status(401).body(Collections.singletonMap("message", e.getMessage()));
            }
            return ResponseEntity.status(400).body(Collections.singletonMap("message", e.getMessage()));
        } catch (NoSuchElementException e) {
            return ResponseEntity.status(403).body(Collections.singletonMap("message", e.getMessage()));
        } catch (EntityNotFoundException e) {
            return ResponseEntity.status(404).body(Collections.singletonMap("message", e.getMessage()));
        } catch (Exception e) {
            return ResponseEntity.status(500).body(Collections.singletonMap("message", "내부 서버 오류가 발생했습니다."));
        }
    }
}
