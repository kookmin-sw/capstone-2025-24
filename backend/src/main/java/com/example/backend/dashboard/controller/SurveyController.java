package com.example.backend.dashboard.controller;

import com.example.backend.dashboard.dto.SurveyRequest;
import com.example.backend.dashboard.dto.SurveyResponse;
import com.example.backend.dashboard.service.SurveyService;
import jakarta.servlet.http.HttpSession;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1/survey")
@RequiredArgsConstructor
public class SurveyController {

    private final SurveyService surveyService;

    // AI 설문조사 결과 저장
    @PutMapping("/{id}")
    public ResponseEntity<?> saveSurveyResult(@PathVariable("id")  int id,
                                              @RequestBody SurveyRequest surveyRequest,
                                              HttpSession session) {
        SurveyResponse surveyResult = surveyService.saveSurveyResult(id, surveyRequest, session);
        return ResponseEntity.ok(surveyResult);
    }
}
