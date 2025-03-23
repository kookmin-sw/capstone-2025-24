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



}
