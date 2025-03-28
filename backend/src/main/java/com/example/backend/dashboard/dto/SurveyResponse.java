package com.example.backend.dashboard.dto;
import com.example.backend.common.domain.CaseEntity.CaseCategory;

import lombok.*;

@Getter
@AllArgsConstructor
public class SurveyResponse {
    private int id;
    private CaseCategory category;
    private String resultMessage;

}
