package com.example.backend.search.dto;

import com.example.backend.common.domain.CaseEntity;
import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.*;

import java.time.LocalDateTime;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class SearchResponse {
    private int id;
    private Integer policeId;
    private String policeName;
    private Integer cctvId;
    private String address;

    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd HH:mm:ss")
    private LocalDateTime date;

    private String category;
    private String memo;

    public static SearchResponse fromEntity(CaseEntity entity) {
        return SearchResponse.builder()
                .id(entity.getId())
                .policeId(entity.getPolice() != null ? entity.getPolice().getId() : null)
                .policeName(entity.getPolice() != null ? entity.getPolice().getName() : null)
                .cctvId(entity.getCctv() != null ? entity.getCctv().getId() : null)
                .address(entity.getCctv().getAddress())
                .date(entity.getDate())
                .category(entity.getCategory().name())
                .memo(entity.getMemo())
                .build();
    }
}
