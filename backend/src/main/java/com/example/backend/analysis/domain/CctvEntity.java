package com.example.backend.analysis.domain;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "cctv_info")
@Getter @Setter @NoArgsConstructor @AllArgsConstructor @Builder
public class CctvEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @ManyToOne
    @JoinColumn(name = "office_id", referencedColumnName = "id")
    private OfficeEntity office;

    @Column(name = "latitude", nullable = false)
    private Double latitude;

    @Column(name = "longitude", nullable = false)
    private Double longitude;

    @Column(name = "address", nullable = false, columnDefinition = "TEXT")
    private String address;

}
