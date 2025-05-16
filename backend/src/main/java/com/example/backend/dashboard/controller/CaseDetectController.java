package com.example.backend.dashboard.controller;

import com.example.backend.dashboard.dto.CaseDetectRequest;
import com.example.backend.dashboard.dto.CaseDetectResponse;
import com.example.backend.dashboard.service.CaseDetectService;
import com.example.backend.dashboard.service.SseEmitterService;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.mvc.method.annotation.SseEmitter;

@RestController
@RequestMapping("/api/v1/case")
@RequiredArgsConstructor
public class CaseDetectController {

    private final CaseDetectService caseDetectService;
    private final SseEmitterService sseEmitterService;

    @PostMapping("/detect")
    public ResponseEntity<?> detectAlarm(@RequestBody CaseDetectRequest request) {
        CaseDetectResponse response = caseDetectService.saveCase(request);
        sseEmitterService.broadcast(response);
        return ResponseEntity.ok(response);
    }

    @GetMapping(value = "/subscribe", produces = MediaType.TEXT_EVENT_STREAM_VALUE)
    public SseEmitter subscribe(HttpServletResponse response) {

        response.setHeader("Cache-Control", "no-cache");
        response.setHeader("X-Accel-Buffering", "no"); // Nginx 버퍼링 해제
        response.setHeader("Connection", "keep-alive"); // 명시적 Keep-Alive

        return sseEmitterService.createEmitter();
    }

}
