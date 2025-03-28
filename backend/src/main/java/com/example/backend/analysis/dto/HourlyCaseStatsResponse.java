package com.example.backend.analysis.dto;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class HourlyCaseStatsResponse {
    private int hour;
    private int fireCount;
    private int assaultCount;
    private int crowdCongestionCount;
    private int weaponCount;
    private int swoonCount;
}
