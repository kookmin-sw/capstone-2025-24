package com.example.backend.dashboard.controller;

import com.example.backend.dashboard.dto.CaseResponse;
import com.example.backend.dashboard.service.DashboardService;
import jakarta.persistence.EntityNotFoundException;
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

    // (전체) 출동 중인 사건 조회 (완)
    @GetMapping("/case/move")
    public ResponseEntity<?> getActiveCases() {
        try {
            List<CaseResponse> cases = dashboardService.getActiveCases();

            if (cases.isEmpty()) {
                return ResponseEntity.status(404)
                        .body(Collections.singletonMap("message", "출동 중인 사건이 없습니다."));
            }

            return ResponseEntity.ok(cases);
        } catch (Exception e) {
            return ResponseEntity.status(500)
                    .body(Collections.singletonMap("message", "내부 서버 오류가 발생했습니다."));
        }
    }

    // 출동 중인 사건 영상 확인
    @GetMapping("/case/move/{id}")
    public ResponseEntity<Map<String, String>> getCaseVideo(@PathVariable("id") int id) {
        try {
            Map<String, String> videoResponse = dashboardService.getCaseVideo(id);
            return ResponseEntity.ok(videoResponse);
        } catch (EntityNotFoundException e) {
            return ResponseEntity.status(404)
                    .body(Collections.singletonMap("message", e.getMessage()));
        } catch (IllegalStateException e) {
            return ResponseEntity.status(400)
                    .body(Collections.singletonMap("message", e.getMessage()));
        } catch (Exception e) {
            return ResponseEntity.status(500)
                    .body(Collections.singletonMap("message", "내부 서버 오류가 발생했습니다."));
        }
    }

}
