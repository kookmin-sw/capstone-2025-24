package com.example.backend.dashboard.repository;

import com.example.backend.common.domain.CaseEntity;
import com.example.backend.common.domain.CaseEntity.CaseState;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface CaseRepository extends JpaRepository<CaseEntity, Integer> {
    List<CaseEntity> findAllByOfficeIdAndStateOrderById(int officeId, CaseState state);
}
