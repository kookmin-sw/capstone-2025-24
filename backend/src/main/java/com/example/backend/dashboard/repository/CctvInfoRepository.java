package com.example.backend.dashboard.repository;

import com.example.backend.common.domain.CctvEntity;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface CctvInfoRepository extends JpaRepository<CctvEntity, Integer> {
    List<CctvEntity> findAllByOfficeIdOrderById(int officeId);
}