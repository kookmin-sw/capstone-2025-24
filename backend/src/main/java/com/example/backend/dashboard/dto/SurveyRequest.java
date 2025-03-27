package com.example.backend.dashboard.dto;
import com.example.backend.common.domain.CaseEntity.CaseCategory;

import lombok.Data;

@Data
public class SurveyRequest {
    private CaseCategory category;  // 수정된 정확한 사건 카테고리
}
