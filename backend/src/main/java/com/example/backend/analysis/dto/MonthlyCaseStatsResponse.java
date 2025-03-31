package com.example.backend.analysis.dto;

import lombok.*;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class MonthlyCaseStatsResponse {
    private int month;
    private int fireCount;
    private int assaultCount;
    private int crowdCongestionCount;
    private int weaponCount;
    private int swoonCount;
}