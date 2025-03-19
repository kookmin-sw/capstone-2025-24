package com.example.backend.dashboard.controller;

import com.example.backend.dashboard.dto.CaseResponse;
import com.example.backend.dashboard.service.DashboardService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1")
@RequiredArgsConstructor
public class DashboardController {

    private final DashboardService dashboardService;

    // (전체) 출동 중인 사건 조회 (완)
    @GetMapping("/case/move")
    public ResponseEntity<List<CaseResponse>> getActiveCases() {
        return ResponseEntity.ok(dashboardService.getActiveCases());
    }

}
