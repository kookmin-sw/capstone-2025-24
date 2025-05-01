package com.example.backend.analysis.dto;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class MapCaseStatsResponse {
    String address;
    double latitude;
    double longitude;
    int fireCount;
    int assaultCount;
    int crowdCongestionCount;
    int weaponCount;
    int swoonCount;
    int smokeCount;
}
