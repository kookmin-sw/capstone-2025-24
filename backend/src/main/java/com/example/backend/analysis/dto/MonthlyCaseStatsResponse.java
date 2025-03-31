package com.example.backend.analysis.dto;

import lombok.*;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class MonthlyCaseStatsResponse {
    private int month;
    private int fireCount;
    private int assaultCount;
    private int crowdCongestionCount;
    private int weaponCount;
    private int swoonCount;

    public static MonthlyCaseStatsResponse fromRow(Object[] row) {
        return MonthlyCaseStatsResponse.builder()
                .month(((Number) row[0]).intValue())
                .fireCount(((Number) row[1]).intValue())
                .assaultCount(((Number) row[2]).intValue())
                .crowdCongestionCount(((Number) row[3]).intValue())
                .weaponCount(((Number) row[4]).intValue())
                .swoonCount(((Number) row[5]).intValue())
                .build();
    }
}