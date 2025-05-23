package com.example.backend.dashboard.dto;

import com.example.backend.common.domain.CaseEntity;
import java.time.format.DateTimeFormatter;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class CaseDetectResponse {
    private Integer id;       // 사건 ID
    private Integer cctvId;
    private String category;      // 사건 카테고리 (예: fire, assault 등)
    private int level;
    private String address;   // CCTV 주소
    private String date;      // 사건 감지 시각 (문자열 형태, yyyy-MM-dd HH:mm:ss)
    private String video;      // 영상 URL

    public static CaseDetectResponse fromEntity(CaseEntity entity) {
        String formattedDateTime = entity.getDate()
                .format(DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss"));
        return CaseDetectResponse.builder()
                .id(entity.getId())
                .cctvId(entity.getCctv().getId())
                .category(entity.getCategory().name())
                .level(entity.getLevel())
                .address(entity.getCctv().getAddress())
                .date(formattedDateTime)
                .video(entity.getVideo())
                .build();
    }
}
