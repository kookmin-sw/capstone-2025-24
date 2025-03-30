package com.example.backend.dashboard.dto;
import com.example.backend.common.domain.CaseEntity;
import com.example.backend.common.domain.CaseEntity.CaseState;
import com.example.backend.common.domain.CaseEntity.CaseCategory;

import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.Builder;
import lombok.Data;
import java.time.LocalDateTime;

@Data
@Builder
public class DashboardResponse {
    private Integer id;
    private String police_name;
    private String police_rank;
    private String address;

    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd HH:mm:ss")
    private LocalDateTime date;

    private Integer level;
    private CaseCategory category;
    private CaseState state;

    public static DashboardResponse fromEntity(CaseEntity entity) {
        return DashboardResponse.builder()
                .id(entity.getId())
                .police_name(entity.getPolice().getName())
                .police_rank(String.valueOf(entity.getPolice().getRank()))
                .address(entity.getCctv().getAddress())
                .date(entity.getDate())
                .level(entity.getLevel())
                .category(entity.getCategory())
                .state(entity.getState())
                .build();
    }

}
