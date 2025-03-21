package com.example.backend.search.dto;

import com.example.backend.search.domain.CaseEntity;
import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.Builder;
import lombok.Data;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Getter
@NoArgsConstructor
@Data
public class SearchResponse {
    private int id;
    private int policeId;
    private String policeName;
    private int cctvId;
    private String location;

    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd HH:mm:ss")
    private LocalDateTime date;

    private String category;
    private String video;
    private String memo;

    @Builder
    public SearchResponse(Integer id, Integer policeId, String policeName, Integer cctvId, String location, LocalDateTime date,
                          String category, String video, String memo) {
        this.id = id;
        this.policeId = policeId;
        this.policeName = policeName;
        this.cctvId = cctvId;
        this.location = location;
        this.date = date;
        this.category = category;
        this.video = video;
        this.memo = memo;
    }

    public static SearchResponse fromEntity(CaseEntity entity) {
        return SearchResponse.builder()
                .id(entity.getId())
                .policeId(entity.getPolice() != null ? entity.getPolice().getId() : null)
                .policeName(entity.getPolice() != null ? entity.getPolice().getName() : null)
                .cctvId(entity.getCctv() != null ? entity.getCctv().getId() : null)
                .location(entity.getCctv().getAddress())
                .date(entity.getDate())
                .category(entity.getCategory().name())
                .video(entity.getVideo())
                .memo(entity.getMemo())
                .build();
    }
}
