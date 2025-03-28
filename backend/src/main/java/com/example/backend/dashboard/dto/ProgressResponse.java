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
public class ProgressResponse {
    private Integer id;
    private String police_name;
    private String police_rank;
    private String cctv_address;

    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd HH:mm:ss")
    private LocalDateTime date;

    private Integer level;
    private CaseCategory category;
    private String video;
    private CaseState state;
    private String memo;

    public static ProgressResponse fromEntity(CaseEntity entity) {
        return ProgressResponse.builder()
                .id(entity.getId())
                .police_name(entity.getPolice().getName())
                .police_rank(String.valueOf(entity.getPolice().getRank()))
                .cctv_address(entity.getCctv().getAddress())
                .date(entity.getDate())
                .level(entity.getLevel())
                .category(entity.getCategory())
                .video(entity.getVideo())
                .state(entity.getState())
                .memo(entity.getMemo())
                .build();
    }

}
