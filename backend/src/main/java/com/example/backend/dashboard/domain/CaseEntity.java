package com.example.backend.dashboard.domain;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "case_info")
@Getter @Setter @NoArgsConstructor @AllArgsConstructor @Builder
public class CaseEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    private int office_id;

    private int police_id;

    private int cctv_id;

    private String date;

    private int level;

    @Enumerated(EnumType.STRING)
    private CaseCategory category;

    private String video;

    @Enumerated(EnumType.STRING)
    private CaseState state;

    private boolean accuracy;

    private String memo;

    public enum CaseCategory {
        fire, assult, crowd_congestion, weapon, swoon
    }

    public enum CaseState {
        미확인, 확인, 미출동, 출동, 완료
    }
}
