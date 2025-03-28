package com.example.backend.user.dto;

import com.example.backend.common.domain.PoliceEntity;
import com.example.backend.common.domain.PoliceEntity.police_rank;
import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public class UserResponseDto {
    private Integer officeId;
    private String name;
    private String officeName;
    private String profileUrl;
    private police_rank rank;

    public static UserResponseDto fromEntity(PoliceEntity police) {
        return new UserResponseDto(
                police.getOffice().getId(),
                police.getName(),
                police.getOffice().getName(),
                police.getProfileUrl(),
                police.getRank()
        );
    }
}