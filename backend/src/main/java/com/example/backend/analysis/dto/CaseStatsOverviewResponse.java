package com.example.backend.analysis.dto;

import lombok.*;

@Data
@AllArgsConstructor
public class CaseStatsOverviewResponse {
    private int recentCase;
    private int todayCase;
    private String mostCase;
}
