package com.example.backend.dashboard.dto;

import com.example.backend.common.domain.CctvEntity;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class CctvInfoResponse {
    private Integer id;       // CCTV ID
    private double latitude;
    private double longitude;
    private String address;   // CCTV 주소
    private String liveUrl;   // 생략 가능: getCctvInfo에는 필요 없음

    public static CctvInfoResponse fromEntity(CctvEntity entity) {
        return CctvInfoResponse.builder()
                .id(entity.getId())
                .latitude(entity.getLatitude())
                .longitude(entity.getLongitude())
                .address(entity.getAddress())
                .build();
    }

    public static CctvInfoResponse fromEntityWithLiveUrl(CctvEntity entity, String urlPrefix) {
        return CctvInfoResponse.builder()
                .id(entity.getId())
                .latitude(entity.getLatitude())
                .longitude(entity.getLongitude())
                .address(entity.getAddress())
                .liveUrl(urlPrefix + entity.getId() + ".m3u8")
                .build();
    }

}

