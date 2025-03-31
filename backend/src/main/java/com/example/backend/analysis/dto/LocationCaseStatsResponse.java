package com.example.backend.analysis.dto;

import lombok.*;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class LocationCaseStatsResponse {
    private String address;
    private double latitude;
    private double longitude;
    private int count;

    public static LocationCaseStatsResponse fromRow(Object[] row) {
        return LocationCaseStatsResponse.builder()
                .address((String) row[0])
                .latitude((Double) row[1])
                .longitude((Double) row[2])
                .count(((Number) row[3]).intValue())
                .build();
    }
}
