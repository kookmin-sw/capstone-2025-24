package com.example.backend.analysis.dto;

import lombok.*;

@Data
@AllArgsConstructor
public class CctvCaseStatsResponse {
    String Location;
    double latitude;
    double longitude;
    int count;
}
