package com.example.backend.common.domain;

import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;

@Entity
@Table(name = "case_stats_category")
@Getter @Setter @NoArgsConstructor @AllArgsConstructor @Builder
public class CaseStatsCategoryEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    @ManyToOne
    @JoinColumn(name = "office_id", referencedColumnName = "id")
    private OfficeEntity office;

    @ManyToOne
    @JoinColumn(name = "cctv_id", referencedColumnName = "id")
    private CctvEntity cctv;

    @Column(name = "date", nullable = false, columnDefinition = "TIMESTAMP WITHOUT TIME ZONE")
    private LocalDateTime date;

    @Column(name = "fire_count", nullable = false)
    private int fireCount;

    @Column(name = "assault_count", nullable = false)
    private int assaultCount;

    @Column(name = "crowd_congestion_count", nullable = false)
    private int crowdCongestionCount;

    @Column(name = "weapon_count", nullable = false)
    private int weaponCount;

    @Column(name = "swoon_count", nullable = false)
    private int swoonCount;

    @Column(name = "smoke_count", nullable = false)
    private int smokeCount;

}
