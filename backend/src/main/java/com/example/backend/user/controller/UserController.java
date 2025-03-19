package com.example.backend.user.controller;

import com.example.backend.user.dto.UserRequestDto;
import com.example.backend.user.dto.UserResponseDto;
import com.example.backend.user.service.UserService;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1")
public class UserController {

    private final UserService userService;

    // userService를 주입받아서 사용
    public UserController(UserService userService) {
        this.userService = userService;
    }

    @PostMapping("/auth")
    // RequestBody의 데이터를 UserRequestDto 객체로 변환해서 받음
    public UserResponseDto authenticate(@RequestBody UserRequestDto requestDto) {
        // 메서드 수행 결과 반환
        return userService.authenticate(requestDto);
    }
}
