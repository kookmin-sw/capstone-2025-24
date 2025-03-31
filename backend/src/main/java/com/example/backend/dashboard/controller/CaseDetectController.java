package com.example.backend.dashboard.controller;

import com.example.backend.dashboard.dto.CaseDetectRequest;
import com.example.backend.dashboard.dto.CaseDetectResponse;
import com.example.backend.dashboard.service.CaseDetectService;
import com.example.backend.dashboard.service.SseEmitterService;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.mvc.method.annotation.SseEmitter;

@RestController
@RequestMapping("/api/v1/case")
@RequiredArgsConstructor
public class CaseDetectController {

    private final CaseDetectService caseDetectService;
    private final SseEmitterService sseEmitterService;

    @Value("${cors.allowed-origins}")
    private String allowedOrigin;

    @PostMapping("/detect")
    public ResponseEntity<?> detectAlarm(@RequestBody CaseDetectRequest request) {
        CaseDetectResponse response = caseDetectService.saveCase(request);
        sseEmitterService.broadcast(response);
        return ResponseEntity.ok(response);
    }

    @GetMapping("/subscribe")
    public SseEmitter subscribe(HttpServletResponse response) {
        response.setHeader("Access-Control-Allow-Origin", allowedOrigin);
        response.setHeader("Access-Control-Allow-Credentials", "true");
        response.setHeader("Cache-Control", "no-cache");
        response.setHeader("Connection", "keep-alive");

        return sseEmitterService.createEmitter();
    }

}
