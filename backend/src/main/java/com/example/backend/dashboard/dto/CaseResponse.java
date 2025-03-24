package com.example.backend.dashboard.dto;
import com.example.backend.dashboard.domain.CaseEntity.CaseState;
import com.example.backend.dashboard.domain.CaseEntity.CaseCategory;

import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.Data;
import java.time.LocalDateTime;

@Data
public class CaseResponse {
    private Integer id;
    private String police_name;
    private String police_rank;
    private String cctv_address;

    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd HH:mm:ss")
    private LocalDateTime date;

    private Integer level;
    private CaseCategory category;
    private String video;
    private CaseState state;
    private String memo;

}
