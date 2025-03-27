package com.example.backend.analysis.repository;

import com.example.backend.common.domain.CaseStatsOverviewEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface CaseStatsOverviewRepository extends JpaRepository<CaseStatsOverviewEntity, Integer> {
    Optional<CaseStatsOverviewEntity> findByOfficeId(int officeId);
}
