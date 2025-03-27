package com.example.backend.common.domain;

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

    @Enumerated(EnumType.STRING)
    @Column(name = "rank", nullable = false)
    private police_rank rank;

    public enum police_rank {
        순경, 경장, 경사, 경위, 경감, 경정, 총경, 경무관, 치안감, 치안정감, 치안총감
    }

}
