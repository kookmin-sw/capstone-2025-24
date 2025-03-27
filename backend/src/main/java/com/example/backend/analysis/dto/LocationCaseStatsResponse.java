package com.example.backend.analysis.dto;

import lombok.*;

@Data
@AllArgsConstructor
public class LocationCaseStatsResponse {
    String address;
    double latitude;
    double longitude;
    int count;
}
