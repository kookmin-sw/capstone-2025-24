package com.example.backend.analysis.repository;

import com.example.backend.common.domain.CaseStatsOverviewEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface CaseStatsOverviewRepository extends JpaRepository<CaseStatsOverviewEntity, Integer> {
    Optional<CaseStatsOverviewEntity> findByOfficeId(int officeId);

    @Query(value = """
        SELECT ci.address
        FROM case_stats_category csc
        JOIN cctv_info ci ON csc.cctv_id = ci.id
        WHERE csc.office_id = :officeId
          AND csc.date >= NOW() - INTERVAL '1 month'
        GROUP BY ci.address
        ORDER BY SUM(csc.fire_count + csc.assault_count + csc.crowd_congestion_count + csc.weapon_count + csc.swoon_count) DESC
        LIMIT 1
        """, nativeQuery = true)
    Optional<String> findAddressWithMostIncidentsLastMonth(@Param("officeId") int officeId);
}
