package com.example.backend.dashboard.controller;

import com.example.backend.dashboard.dto.CaseResponse;
import com.example.backend.dashboard.dto.SurveyRequest;
import com.example.backend.dashboard.dto.SurveyResponse;
import com.example.backend.dashboard.service.DashboardService;
import jakarta.servlet.http.HttpSession;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Collections;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/v1")
@RequiredArgsConstructor
public class DashboardController {

    private final DashboardService dashboardService;

    // 출동 중인 사건 조회
    @GetMapping("/case/move")
    public ResponseEntity<?> getActiveCases(HttpSession session) {
        List<CaseResponse> cases = dashboardService.getActiveCases(session);
        if (cases.isEmpty()) {
            return ResponseEntity.status(404)
                    .body(Collections.singletonMap("message", "출동 중인 사건이 없습니다."));
        }
        return ResponseEntity.ok(cases);
    }

    // 출동 중인 사건 영상 확인
    @GetMapping("/case/move/{id}")
    public ResponseEntity<?> getCaseVideo(@PathVariable("id") int id, HttpSession session) {
        Map<String, String> videoResponse = dashboardService.getCaseVideo(id, session);
        return ResponseEntity.ok(videoResponse);
    }

    // 출동 중인 사건 해결 처리
    @PutMapping("/case/complete/{id}")
    public ResponseEntity<?> completeCase(@PathVariable("id")  int id, HttpSession session) {
        Map<Integer, String> completedCase = dashboardService.completeCase(id, session);
        return ResponseEntity.ok(completedCase);
    }

    // AI 설문조사 결과 저장
    @PutMapping("/survey/{id}")
    public ResponseEntity<?> saveSurveyResult(@PathVariable("id")  int id,
                                              @RequestBody SurveyRequest surveyRequest,
                                              HttpSession session) {
        SurveyResponse surveyResult = dashboardService.saveSurveyResult(id, surveyRequest, session);
        return ResponseEntity.ok(surveyResult);
    }
}
