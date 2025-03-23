package com.example.backend.dashboard.dto;

import com.example.backend.dashboard.domain.CaseEntity;
import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonInclude;
import lombok.Builder;
import lombok.Data;

import java.time.LocalDateTime;

@Data
@Builder
@JsonInclude(JsonInclude.Include.NON_NULL)
public class AlarmResponse {
    private Integer id;
    private Integer officeId;
    private Integer cctvId;
    private String location;

    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd HH:mm:ss")
    private LocalDateTime date;

    private Integer level;
    private String category;
    private String video;
    private String state;

    public static AlarmResponse fromEntity(CaseEntity entity) {
        return AlarmResponse.builder()
                .id(entity.getId())
                .officeId(entity.getOffice() != null ? entity.getOffice().getId() : null)
                .cctvId(entity.getCctv() != null ? entity.getCctv().getId() : null)
                .location(entity.getCctv() != null ? entity.getCctv().getAddress() : null)
                .date(entity.getDate())
                .level(entity.getLevel())
                .category(entity.getCategory().name())
                .state(entity.getState().name())
                .build();
    }

    public static AlarmResponse fromEntityWithVideo(CaseEntity entity) {
        return AlarmResponse.builder()
                .id(entity.getId())
                .officeId(entity.getOffice() != null ? entity.getOffice().getId() : null)
                .cctvId(entity.getCctv() != null ? entity.getCctv().getId() : null)
                .location(entity.getCctv() != null ? entity.getCctv().getAddress() : null)
                .date(entity.getDate())
                .level(entity.getLevel())
                .category(entity.getCategory().name())
                .video(entity.getVideo())
                .state(entity.getState().name())
                .build();
    }

}
