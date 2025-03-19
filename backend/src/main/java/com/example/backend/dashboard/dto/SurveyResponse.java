package com.example.backend.dashboard.dto;

import lombok.*;

@Getter
@AllArgsConstructor
public class SurveyResponse {
    private int id;
    private String category;
    private String resultMessage;

}
