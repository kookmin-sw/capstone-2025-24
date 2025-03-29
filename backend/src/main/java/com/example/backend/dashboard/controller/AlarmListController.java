package com.example.backend.dashboard.controller;

import com.example.backend.dashboard.dto.AlarmRequest;
import com.example.backend.dashboard.dto.AlarmResponse;
import com.example.backend.dashboard.service.AlarmListService;
import jakarta.servlet.http.HttpSession;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Collections;
import java.util.List;

@RestController
@RequestMapping("/api/v1/case")
@RequiredArgsConstructor
public class AlarmListController {
    private final AlarmListService alarmListService;

    @GetMapping("/ready")
    public ResponseEntity<?> getReadyAlarmList(HttpSession session) {
        List<AlarmResponse> alarms = alarmListService.getReadyCases(session);
        return ResponseEntity.ok(alarms);
    }

    // case_info id 값으로 상세 조회 (officeId가 동일한 데이터만)
    @GetMapping("/ready/{id}")
    public ResponseEntity<?> getCaseById(@PathVariable("id")  int id, HttpSession session) {
        AlarmResponse alarm = alarmListService.getCaseById(id, session);
        return ResponseEntity.ok(alarm);
    }

    // 출동 | 미출동 클릭 시 => 1. 이미 출동인 상태 or 2. state를 업데이트
    @PutMapping("/ready/{id}")
    public ResponseEntity<?> updateCaseState(@PathVariable("id") int id, @RequestBody AlarmRequest request, HttpSession session) {
        String message = alarmListService.updateCaseState(id, request.getState(), session);
        return ResponseEntity.ok(Collections.singletonMap("message", message));
    }

}
