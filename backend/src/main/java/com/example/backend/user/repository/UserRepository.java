package com.example.backend.user.repository;

import com.example.backend.user.domain.UserEntity;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;


public interface UserRepository extends JpaRepository<UserEntity, Long> {
    Optional<UserEntity> findByUserIdAndPassword(String userId, String password);
}
