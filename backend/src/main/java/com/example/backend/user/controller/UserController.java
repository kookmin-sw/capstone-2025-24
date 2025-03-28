package com.example.backend.user.controller;

import com.example.backend.user.dto.UserRequestDto;
import com.example.backend.user.dto.UserResponseDto;
import com.example.backend.user.service.UserService;
import jakarta.servlet.http.HttpSession;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1")
@RequiredArgsConstructor
public class UserController {

    private final UserService userService;

    // 인증 (로그인) API
    @PostMapping("/auth")
    public ResponseEntity<?> authenticate(@RequestBody UserRequestDto requestDto, HttpSession session) {
        UserResponseDto userResponse = userService.authenticate(requestDto);
        // 세션에 사용자 정보 저장
        session.setAttribute("user", userResponse);
        return ResponseEntity.ok(userResponse);
    }

    // 세션에 저장된 로그인 정보 확인 API
    @GetMapping("/session")
    public ResponseEntity<?> getSessionUser(HttpSession session) {
        UserResponseDto user = (UserResponseDto) session.getAttribute("user");
        if (user == null) {
            throw new IllegalStateException( "로그인이 필요합니다.");
        }
        return ResponseEntity.ok(user);
    }
}
