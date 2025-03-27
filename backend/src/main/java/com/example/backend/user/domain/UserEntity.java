package com.example.backend.user.domain;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Entity
@Getter
@NoArgsConstructor
@Table(name = "police_info")  // 실제 DB 테이블명에 맞게 수정
public class UserEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;  // PK

    @Column(name = "office_id", nullable = false)
    private Integer officeId;

    @Column(name = "name", nullable = false)
    private String name;

    @Column(name = "user_id", unique = true, nullable = false)
    private String userId;

    @Column(name = "password", nullable = false)
    private String password;

    @Column(name = "profile_url", nullable = false)
    private String profileUrl;

    @Column(name = "rank", nullable = false)
    private String rank;
}
