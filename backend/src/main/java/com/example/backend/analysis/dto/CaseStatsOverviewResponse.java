package com.example.backend.analysis.dto;

import com.example.backend.common.domain.CaseEntity;
import com.example.backend.common.domain.CaseStatsOverviewEntity;
import lombok.*;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class CaseStatsOverviewResponse {
    private int recentCase;
    private int todayCase;
    private CaseEntity.CaseCategory mostCase;
    private String patrolRegion;

    public static CaseStatsOverviewResponse fromEntity(CaseStatsOverviewEntity entity, String patrolRegionAddress) {
        return CaseStatsOverviewResponse.builder()
                .recentCase(entity.getRecentCaseCount())
                .todayCase(entity.getTodayCaseCount())
                .mostCase(entity.getMostCase())
                .patrolRegion(patrolRegionAddress)
                .build();
    }
}
