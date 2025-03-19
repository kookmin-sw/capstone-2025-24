package com.example.backend.dashboard.dto;

import lombok.Data;

@Data
public class CaseRequest {
    private int id;
    private int officeId;
    private int policeId;
    private int cctvId;
    private String date;
    private int level;
    private String category;
    private String video;
    private String state;
    private boolean accuracy;
    private String memo;
}
