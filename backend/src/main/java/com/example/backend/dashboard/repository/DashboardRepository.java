package com.example.backend.dashboard.repository;

import com.example.backend.common.domain.CaseEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.time.LocalDateTime;
import java.util.List;

public interface DashboardRepository extends JpaRepository<CaseEntity, Integer> {
    @Query(value = """
        SELECT c FROM CaseEntity c
            WHERE c.office.id = :officeId
                AND c.state IN :states
                AND c.date >= :startDate
            ORDER BY c.date DESC""")
    List<CaseEntity> findRecentCasesByOfficeIdAndStates(@Param("officeId") int officeId, @Param("states") List<CaseEntity.CaseState> states, @Param("startDate") LocalDateTime startDate);

    List<CaseEntity> findAllByOfficeIdAndStateOrderByProgressDateDesc(int officeId, CaseEntity.CaseState state);
}
