package com.example.backend.search.dto;

import com.example.backend.common.domain.CaseEntity;
import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.*;

import java.time.LocalDateTime;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class DetailResponse {
    private int id;
    private Integer policeId;
    private String policeName;
    private Integer cctvId;
    private String address;
    private Double longitude;
    private Double latitude;

    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd HH:mm:ss")
    private LocalDateTime date;

    private String category;
    private String video;
    private String memo;

    public static DetailResponse fromEntity(CaseEntity entity) {
        return DetailResponse.builder()
                .id(entity.getId())
                .policeId(entity.getPolice() != null ? entity.getPolice().getId() : null)
                .policeName(entity.getPolice() != null ? entity.getPolice().getName() : null)
                .cctvId(entity.getCctv() != null ? entity.getCctv().getId() : null)
                .address(entity.getCctv().getAddress())
                .latitude(entity.getCctv().getLatitude())
                .longitude(entity.getCctv().getLongitude())
                .date(entity.getDate())
                .category(entity.getCategory().name())
                .video(entity.getVideo())
                .memo(entity.getMemo())
                .build();
    }
}
