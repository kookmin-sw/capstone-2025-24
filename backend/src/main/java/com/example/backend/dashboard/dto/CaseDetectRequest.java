package com.example.backend.dashboard.dto;
import lombok.Data;

@Data
public class CaseDetectRequest {
    private Integer officeId; // 사무소 ID
    private Integer cctvId;   // CCTV ID
    private Integer level;    // 위험 레벨
    private String category;  // "fire", "assault" 등
    private String video;  // 스토리지에 저장된 영상 URL
    private String memo;      // 기타 메모
}
