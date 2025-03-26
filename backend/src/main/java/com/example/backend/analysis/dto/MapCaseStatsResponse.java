package com.example.backend.analysis.dto;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class MapCaseStatsResponse {
    String address;
    double latitude;
    double longitude;
    int fire_count;
    int assault_count;
    int crowd_congestion_count;
    int weapon_count;
    int swoon_count;
}
