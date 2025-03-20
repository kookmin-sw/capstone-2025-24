package com.example.backend.dashboard.domain;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "office_info")
@Getter @Setter @NoArgsConstructor @AllArgsConstructor @Builder
public class OfficeEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Column(name = "latitude", nullable = false)
    private Double latitude;

    @Column(name = "longitude", nullable = false)
    private Double longitude;

    @Column(name = "name", nullable = false, length = 100)
    private String name;

    @Column(name = "address", nullable = false, columnDefinition = "TEXT")
    private String address;

}
