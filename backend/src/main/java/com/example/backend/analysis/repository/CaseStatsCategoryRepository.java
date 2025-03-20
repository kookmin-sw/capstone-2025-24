package com.example.backend.analysis.repository;

import com.example.backend.analysis.domain.CaseStatsCategoryEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface CaseStatsCategoryRepository extends JpaRepository<CaseStatsCategoryEntity, Integer> {
    @Query(value = """
            SELECT 
                EXTRACT(HOUR FROM c.date) AS hour,
                SUM(CASE WHEN :category = 'fire' OR :category = 'all' THEN c.fire_count ELSE 0 END) AS fire,
                SUM(CASE WHEN :category = 'assault' OR :category = 'all' THEN c.assult_count ELSE 0 END) AS assault,
                SUM(CASE WHEN :category = 'crowd' OR :category = 'all' THEN c.crowd_congestion_count ELSE 0 END) AS crowdCongestion,
                SUM(CASE WHEN :category = 'weapon' OR :category = 'all' THEN c.weapon_count ELSE 0 END) AS weapon,
                SUM(CASE WHEN :category = 'swoon' OR :category = 'all' THEN c.swoon_count ELSE 0 END) AS swoon
            FROM case_stats_category c
            WHERE DATE(c.date) = DATE(:date)
            AND c.office_id = :officeId
            GROUP BY hour
            ORDER BY hour
            """, nativeQuery = true)
    List<Object[]> findHourlyCaseStats(@Param("date") String date, @Param("officeId") int officeId, @Param("category") String category);

}

