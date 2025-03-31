package com.example.backend.analysis.dto;

import lombok.*;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class HourlyCaseStatsResponse {
    private int hour;
    private int fireCount;
    private int assaultCount;
    private int crowdCongestionCount;
    private int weaponCount;
    private int swoonCount;

    public static HourlyCaseStatsResponse fromRow(Object[] row) {
        return HourlyCaseStatsResponse.builder()
                .hour(((Number) row[0]).intValue())
                .fireCount(((Number) row[1]).intValue())
                .assaultCount(((Number) row[2]).intValue())
                .crowdCongestionCount(((Number) row[3]).intValue())
                .weaponCount(((Number) row[4]).intValue())
                .swoonCount(((Number) row[5]).intValue())
                .build();
    }
}
