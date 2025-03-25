package com.example.backend.dashboard.repository;

import com.example.backend.dashboard.domain.CaseEntity;
import com.example.backend.dashboard.domain.CaseEntity.CaseState;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface AlarmListRepository extends JpaRepository<CaseEntity, Integer> {
    List<CaseEntity> findByOffice_IdAndStateIn(Integer officeId, List<CaseState> states);
    Optional<CaseEntity> findByIdAndOffice_Id(Integer id, Integer officeId);
}
