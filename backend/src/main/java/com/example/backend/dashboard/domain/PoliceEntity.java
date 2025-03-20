package com.example.backend.dashboard.domain;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "police_info")
@Getter @Setter @NoArgsConstructor @AllArgsConstructor @Builder
public class PoliceEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @ManyToOne
    @JoinColumn(name = "office_id", referencedColumnName = "id")
    private OfficeEntity office ;

    @Column(name = "name", nullable = false, length = 40)
    private String name;

    @Column(name = "user_id", unique = true, nullable = false, length = 40)
    private String userId;

    @Column(name = "password", nullable = false, columnDefinition = "TEXT")
    private String password;

    @Column(name = "profile_url", nullable = false)
    private String profileUrl;

}
