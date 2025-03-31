package com.example.backend.analysis.dto;

import lombok.*;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class MapCaseStatsResponse {
    private String address;
    private double latitude;
    private double longitude;
    private int fireCount;
    private int assaultCount;
    private int crowdCongestionCount;
    private int weaponCount;
    private int swoonCount;

    public static MapCaseStatsResponse fromRow(Object[] row) {
        return MapCaseStatsResponse.builder()
                .address((String) row[0])
                .latitude((Double) row[1])
                .longitude((Double) row[2])
                .fireCount(((Number) row[3]).intValue())
                .assaultCount(((Number) row[4]).intValue())
                .crowdCongestionCount(((Number) row[5]).intValue())
                .weaponCount(((Number) row[6]).intValue())
                .swoonCount(((Number) row[7]).intValue())
                .build();
    }
}
