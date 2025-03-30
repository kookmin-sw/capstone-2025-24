package com.example.backend.dashboard.dto;

import com.example.backend.common.domain.CaseEntity;
import com.example.backend.common.domain.CaseEntity.CaseState;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class StateRequest {
    private CaseState state; // "출동" or "미출동"
    private CaseEntity.CaseCategory category;
}
