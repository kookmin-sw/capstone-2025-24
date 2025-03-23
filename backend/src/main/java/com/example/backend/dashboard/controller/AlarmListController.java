package com.example.backend.dashboard.controller;

import com.example.backend.dashboard.dto.AlarmResponse;
import com.example.backend.dashboard.service.AlarmListService;
import com.example.backend.user.dto.UserResponseDto;
import jakarta.servlet.http.HttpSession;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/case")
@RequiredArgsConstructor
public class AlarmListController {
    private final AlarmListService alarmListService;

    @GetMapping("/ready")
    public ResponseEntity<?> getReadyAlarmList(HttpSession session) {
        UserResponseDto user = (UserResponseDto) session.getAttribute("user");

        if (user == null) {
            return ResponseEntity.status(403).body("로그인이 필요합니다.");
        }

        Integer officeId = user.getOfficeId();
        List<AlarmResponse> alarms = alarmListService.getReadyCases(officeId);
        return ResponseEntity.ok(alarms);
    }

    // case_info id 값으로 상세 조회 (officeId가 동일한 데이터만)
    @GetMapping("/ready/{id}")
    public ResponseEntity<?> getCaseById(@PathVariable Integer id, HttpSession session) {
        UserResponseDto user = (UserResponseDto) session.getAttribute("user");

        if (user == null) {
            return ResponseEntity.status(403).body("로그인이 필요합니다.");
        }
        Integer officeId = user.getOfficeId();
        AlarmResponse alarm = alarmListService.getCaseById(id, officeId);
        return ResponseEntity.ok(alarm);
    }

    // 출동 | 미출동 클릭 시 => 1. 이미 출동인 상태 or 2. state를 업데이트
    @PutMapping("/ready/{id}")
    public ResponseEntity<?> updateCaseState(@PathVariable Integer id, HttpSession session) {
        UserResponseDto user = (UserResponseDto) session.getAttribute("user");
        if (user == null) {
            return ResponseEntity.status(403).body("로그인이 필요합니다.");
        }
        Integer officeId = user.getOfficeId();
        String message = alarmListService.updateCaseState(id, officeId);
        return ResponseEntity.ok(message);
    }

}
