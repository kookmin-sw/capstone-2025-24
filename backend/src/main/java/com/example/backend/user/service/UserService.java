package com.example.backend.user.service;

import com.example.backend.user.dto.UserRequestDto;
import com.example.backend.user.dto.UserResponseDto;
import com.example.backend.user.domain.UserEntity;
import com.example.backend.user.repository.UserRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

@Service
public class UserService {
    // BCryptPasswordEncoder로 나중에 암호화

    private final UserRepository userRepository;  // DB 접근을 위한 UserRepository 객체

    // 생성자 - UserService 클래스는 UserRepository를 주입받아서 사용
    public UserService(UserRepository userRepository) {
        this.userRepository = userRepository;  // userRepository 필드를 초기화
    }


    @Transactional(readOnly = true)  // 이 메서드는 읽기 전용으로 실행됨 (성능 최적화)
    public UserResponseDto authenticate(UserRequestDto requestDto) {
        // requestDto에서 받은 userId와 password를 기반으로 사용자 정보를 조회
        Optional<UserEntity> user = userRepository.findByUserIdAndPassword(requestDto.getUserId(), requestDto.getPassword());

        // 조회한 결과가 있으면 UserResponseDto 객체로 변환하여 반환하고, 없으면 예외 던짐
        return user.map(value -> new UserResponseDto(value.getOfficeId(), value.getName(), value.getProfileUrl()))  // 사용자 이름을 포함한 응답 생성
                .orElseThrow(() -> new IllegalArgumentException("Invalid credentials"));  // 사용자 정보가 없으면 예외 처리
    }

}
