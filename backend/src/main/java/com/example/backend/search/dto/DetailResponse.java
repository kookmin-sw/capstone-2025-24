package com.example.backend.search.dto;

import com.example.backend.common.domain.CaseEntity;
import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.Builder;
import lombok.Getter;

import java.time.LocalDateTime;

@Getter
public class DetailResponse {
    private int id;
    private int policeId;
    private String policeName;
    private int cctvId;
    private String address;
    private Double longitude;
    private Double latitude;

    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd HH:mm:ss")
    private LocalDateTime date;

    private String category;
    private String video;
    private String memo;

    @Builder
    public DetailResponse(Integer id, Integer policeId, String policeName, Integer cctvId, String address, Double latitude, Double longitude, LocalDateTime date,
                          String category, String video, String memo) {
        this.id = id;
        this.policeId = policeId;
        this.policeName = policeName;
        this.cctvId = cctvId;
        this.address = address;
        this.latitude = latitude;
        this.longitude = longitude;
        this.date = date;
        this.category = category;
        this.video = video;
        this.memo = memo;
    }

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
