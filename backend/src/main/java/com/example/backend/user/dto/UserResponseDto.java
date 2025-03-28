package com.example.backend.user.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public class UserResponseDto {
    private Integer id;
    private Integer officeId;
    private String name;
    private String profileUrl;
}
