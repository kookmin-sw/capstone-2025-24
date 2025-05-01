package com.example.backend.common.domain;

import jakarta.persistence.*;
import lombok.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "case_info")
@Getter @Setter @NoArgsConstructor @AllArgsConstructor @Builder
public class CaseEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @ManyToOne
    @JoinColumn(name = "office_id", referencedColumnName = "id")
    private OfficeEntity office;

    @ManyToOne
    @JoinColumn(name = "police_id", referencedColumnName = "id")
    private PoliceEntity police;

    @ManyToOne
    @JoinColumn(name = "cctv_id", referencedColumnName = "id")
    private CctvEntity cctv;

    @Column(name = "date", nullable = false, columnDefinition = "TIMESTAMP WITHOUT TIME ZONE")
    private LocalDateTime date;

    @Column(name = "level", nullable = false)
    private Integer level;

    @Enumerated(EnumType.STRING)
    @Column(name = "category", nullable = false)
    private CaseCategory category;

    @Column(name = "video", nullable = false)
    private String video;

    @Enumerated(EnumType.STRING)
    @Column(name = "state", nullable = false)
    private CaseState state;

    @Column(name = "accuracy", nullable = false)
    private Boolean accuracy;

    @Column(name = "memo", nullable = false, columnDefinition = "TEXT")
    private String memo;

    @Column(name = "progress_date", columnDefinition = "TIMESTAMP WITHOUT TIME ZONE")
    private LocalDateTime progressDate;

    public enum CaseCategory {
        fire, assault, crowd_congestion, weapon, swoon, smoke
    }

    public enum CaseState {
        미확인, 확인, 미출동, 출동, 완료
    }

}
