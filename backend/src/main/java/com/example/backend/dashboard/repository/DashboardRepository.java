package com.example.backend.dashboard.repository;

import com.example.backend.common.domain.CaseEntity;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface DashboardRepository extends JpaRepository<CaseEntity, Integer> {
    List<CaseEntity> findAllByOfficeIdOrderById(int officeId);
}
