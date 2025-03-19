package com.example.backend.user.controller;

import com.example.backend.user.dto.UserRequestDto;
import com.example.backend.user.dto.UserResponseDto;
import com.example.backend.user.service.UserService;
import jakarta.servlet.http.HttpSession;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Collections;

@RestController
@RequestMapping("/api/v1")
public class UserController {

    private final UserService userService;

    public UserController(UserService userService) {
        this.userService = userService;
    }

    @PostMapping("/auth")
    public ResponseEntity<?> authenticate(@RequestBody UserRequestDto requestDto, HttpSession session) {
        try {
            UserResponseDto userResponse = userService.authenticate(requestDto);

            // 세션에 사용자 정보 저장
            session.setAttribute("user", userResponse);

            return ResponseEntity.ok(userResponse);  // 200 OK
        } catch (IllegalArgumentException e) {      // 400 Bad Request
            return ResponseEntity.status(400)
                    .body(Collections.singletonMap("message", e.getMessage()));
        } catch (Exception e) {     // 서버 에러
            return ResponseEntity.status(500)
                    .body(Collections.singletonMap("message", "내부 서버 오류가 발생했습니다."));
        }
    }


    // 세션에 저장된 로그인 정보 확인
    @GetMapping("/session")
    public ResponseEntity<?> getSessionUser(HttpSession session) {
        try {
            // 세션에서 사용자 정보 가져오기
            UserResponseDto user = (UserResponseDto) session.getAttribute("user");

            if (user == null) {
                // 사용자 정보가 없으면 404 상태 코드 반환
                return ResponseEntity.status(404)
                        .body(Collections.singletonMap("message", "사용자가 존재하지 않습니다."));
            }
            return ResponseEntity.ok(user);
        } catch (Exception e) {
            // 기타 예외 처리 시 500 상태 코드 반환 (서버 에러)
            return ResponseEntity.status(500)
                    .body(Collections.singletonMap("message", "내부 서버 오류가 발생했습니다."));
        }
    }


}
