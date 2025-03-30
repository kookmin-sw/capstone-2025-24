package com.example.backend.dashboard.controller;

import com.example.backend.dashboard.dto.*;
import com.example.backend.dashboard.service.DashboardService;
import jakarta.servlet.http.HttpSession;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Collections;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/v1/case")
@RequiredArgsConstructor
public class DashboardController {

    private final DashboardService dashboardService;

    // 사건 정보 조회
    @GetMapping("")
    public ResponseEntity<?> getCases(HttpSession session) {
        List<DashboardResponse> cases = dashboardService.getCases(session);
        if (cases.isEmpty()) {
            return ResponseEntity.status(404)
                    .body(Collections.singletonMap("message", "사건이 없습니다."));
        }
        return ResponseEntity.ok(cases);
    }

    // 사건 영상 확인
    @GetMapping("/{id}")
    public ResponseEntity<?> getCaseVideo(@PathVariable("id") int id, HttpSession session) {
        Map<String, String> videoResponse = dashboardService.getCaseVideo(id, session);
        return ResponseEntity.ok(videoResponse);
    }

    // 출동 | 미출동 클릭 시 => 1. 이미 출동인 상태 or 2. state를 업데이트
    @PutMapping("/ready/{id}")
    public ResponseEntity<?> updateCaseState(@PathVariable("id") int id, @RequestBody StateRequest request, HttpSession session) {
        Map<Integer, String> message = dashboardService.updateCaseState(id, request.getState(), session);
        return ResponseEntity.ok(message);
    }

    // 출동 중인 사건 해결 처리
    @PutMapping("/complete/{id}")
    public ResponseEntity<?> completeCase(@PathVariable("id")  int id, HttpSession session) {
        Map<Integer, String> completedCase = dashboardService.completeCase(id, session);
        return ResponseEntity.ok(completedCase);
    }

}
