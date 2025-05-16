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

    @JoinColumn(name = "recent_case_count", nullable = false)
    private int recentCaseCount;

    @JoinColumn(name = "today_case_count", nullable = false)
    private int todayCaseCount;

    @Enumerated(EnumType.STRING)
    @JoinColumn(name = "most_case", nullable = false)
    private CaseEntity.CaseCategory mostCase;

}
