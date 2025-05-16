package com.example.backend.user.repository;

import com.example.backend.common.domain.PoliceEntity;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;


public interface UserRepository extends JpaRepository<PoliceEntity, Integer> {
    Optional<PoliceEntity> findByUserIdAndPassword(String userId, String password);
}
