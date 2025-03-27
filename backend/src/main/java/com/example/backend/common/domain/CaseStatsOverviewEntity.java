package com.example.backend.common.domain;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "case_stats_overview")
@Getter @Setter @NoArgsConstructor @AllArgsConstructor @Builder
public class CaseStatsOverviewEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    @ManyToOne
    @JoinColumn(name = "office_id", referencedColumnName = "id")
    private OfficeEntity office;

    private int recentCaseCount;
    private int todayCaseCount;

    @Enumerated(EnumType.STRING)
    private CaseEntity.CaseCategory mostCase;

}
