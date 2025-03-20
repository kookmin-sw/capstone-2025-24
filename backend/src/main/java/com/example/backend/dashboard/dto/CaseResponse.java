package com.example.backend.dashboard.dto;
import com.example.backend.dashboard.domain.CaseEntity.CaseState;
import com.example.backend.dashboard.domain.CaseEntity.CaseCategory;

import lombok.Data;
import java.time.LocalDateTime;

@Data
public class CaseResponse {
    private Integer id;
    private Integer officeId;
    private Integer policeId;
    private Integer cctvId;
    private LocalDateTime date;
    private Integer level;
    private CaseCategory category;
    private String video;
    private CaseState state;
    private Boolean accuracy;
    private String memo;

}
