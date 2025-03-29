package com.example.backend.dashboard.controller;

import com.example.backend.dashboard.dto.CaseDetectRequest;
import com.example.backend.dashboard.dto.CaseDetectResponse;
import com.example.backend.dashboard.service.CaseDetectService;
import com.example.backend.dashboard.service.SseEmitterService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.mvc.method.annotation.SseEmitter;

@RestController
@RequestMapping("/api/v1/case")
@RequiredArgsConstructor
@CrossOrigin(origins = "http://127.0.0.1:5500", allowCredentials = "true")
public class CaseDetectController {

    private final CaseDetectService caseDetectService;
    private final SseEmitterService sseEmitterService;

    @PostMapping("/detect")
    public ResponseEntity<?> detectAlarm(@RequestBody CaseDetectRequest request) {
        CaseDetectResponse response = caseDetectService.saveCase(request);
        sseEmitterService.broadcast(response);
        return ResponseEntity.ok(response);
    }

    @GetMapping("/subscribe")
    public SseEmitter subscribe() {
        return sseEmitterService.createEmitter();
    }

}
