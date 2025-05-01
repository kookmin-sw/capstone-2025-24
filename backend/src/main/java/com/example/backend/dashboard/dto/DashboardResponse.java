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
    private Integer cctvId;
    private String policeName;
    private String policeRank;
    private String address;

    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd HH:mm:ss")
    private LocalDateTime date;

    private int level;
    private CaseCategory category;
    private CaseState state;

    public static DashboardResponse fromEntity(CaseEntity entity) {
        return DashboardResponse.builder()
                .id(entity.getId())
                .cctvId(entity.getCctv().getId())
                .policeName(entity.getPolice() != null ? entity.getPolice().getName() : null)
                .policeRank(entity.getPolice() != null ? String.valueOf(entity.getPolice().getRank()) : null)
                .address(entity.getCctv().getAddress())
                .date(entity.getDate())
                .level(entity.getLevel())
                .category(entity.getCategory())
                .state(entity.getState())
                .build();
    }

}
