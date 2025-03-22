package com.example.backend.analysis.repository;

import com.example.backend.analysis.domain.CaseStatsCategoryEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.time.LocalDateTime;
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

    @Query(value = """
        SELECT
            EXTRACT(MONTH FROM c.date) AS month,
            SUM(CASE WHEN :category = 'fire' OR :category = 'all' THEN c.fire_count ELSE 0 END) AS fire,
            SUM(CASE WHEN :category = 'assault' OR :category = 'all' THEN c.assult_count ELSE 0 END) AS assault,
            SUM(CASE WHEN :category = 'crowd' OR :category = 'all' THEN c.crowd_congestion_count ELSE 0 END) AS crowdCongestion,
            SUM(CASE WHEN :category = 'weapon' OR :category = 'all' THEN c.weapon_count ELSE 0 END) AS weapon,
            SUM(CASE WHEN :category = 'swoon' OR :category = 'all' THEN c.swoon_count ELSE 0 END) AS swoon
        FROM case_stats_category c
        WHERE EXTRACT(YEAR FROM c.date) = :year
          AND c.office_id = :officeId
        GROUP BY month
        ORDER BY month
        """, nativeQuery = true)
    List<Object[]> findMonthlyCaseStats(@Param("year") int year, @Param("officeId") int officeId, @Param("category") String category);

    @Query(value = """
        SELECT
            EXTRACT(DAY FROM c.date) AS day,
            SUM(CASE WHEN :category = 'fire' OR :category = 'all' THEN c.fire_count ELSE 0 END) AS fire,
            SUM(CASE WHEN :category = 'assault' OR :category = 'all' THEN c.assult_count ELSE 0 END) AS assault,
            SUM(CASE WHEN :category = 'crowd' OR :category = 'all' THEN c.crowd_congestion_count ELSE 0 END) AS crowdCongestion,
            SUM(CASE WHEN :category = 'weapon' OR :category = 'all' THEN c.weapon_count ELSE 0 END) AS weapon,
            SUM(CASE WHEN :category = 'swoon' OR :category = 'all' THEN c.swoon_count ELSE 0 END) AS swoon
        FROM case_stats_category c
        WHERE EXTRACT(YEAR FROM c.date) = :year
          AND EXTRACT(MONTH FROM c.date) = :month
          AND c.office_id = :officeId
        GROUP BY day
        ORDER BY day
        """, nativeQuery = true)
    List<Object[]> findDailyCaseStats(@Param("year") int year, @Param("month") int month, @Param("officeId") int officeId, @Param("category") String category);

    @Query(value = """
        SELECT category, SUM(count) AS total
        FROM (
            SELECT 'fire' AS category, SUM(c.fire_count) AS count
            FROM case_stats_category c
            WHERE c.office_id = :officeId
              AND c.date >= :startDate
            UNION ALL
            SELECT 'assault', SUM(c.assult_count)
            FROM case_stats_category c
            WHERE c.office_id = :officeId
              AND c.date >= :startDate
            UNION ALL
            SELECT 'swoon', SUM(c.swoon_count)
            FROM case_stats_category c
            WHERE c.office_id = :officeId
              AND c.date >= :startDate
            UNION ALL
            SELECT 'weapon', SUM(c.weapon_count)
            FROM case_stats_category c
            WHERE c.office_id = :officeId
              AND c.date >= :startDate
            UNION ALL
            SELECT 'crowd_congestion', SUM(c.crowd_congestion_count)
            FROM case_stats_category c
            WHERE c.office_id = :officeId
              AND c.date >= :startDate
        ) AS stats
        GROUP BY category
        """, nativeQuery = true)
    List<Object[]> findCategoryCaseStats(@Param("startDate") LocalDateTime startDate, @Param("officeId") int officeId);

    @Query(value = """
        SELECT cv.address, cv.latitude, cv.longitude, SUM(total) AS total
        FROM (
            SELECT c.cctv_id, SUM(c.fire_count + c.assult_count + c.swoon_count + c.weapon_count + c.crowd_congestion_count) AS total
            FROM case_stats_category c
            WHERE c.office_id = :officeId
              AND c.date >= :startDate
            GROUP BY c.cctv_id
        ) AS sub
        JOIN cctv_info cv ON sub.cctv_id = cv.id
        GROUP BY cv.address, cv.latitude, cv.longitude
        ORDER BY total DESC
        """, nativeQuery = true)
    List<Object[]> findLocationCaseStats(@Param("startDate") LocalDateTime startDate, @Param("officeId") int officeId);

    @Query(value = """
        SELECT cv.address, cv.latitude, cv.longitude, SUM(sub.total) AS total
        FROM (
            SELECT c.cctv_id, SUM(c.fire_count + c.assult_count + c.swoon_count + c.weapon_count + c.crowd_congestion_count) AS total
            FROM case_stats_category c
            WHERE c.date >= :startDate
            GROUP BY c.cctv_id
        ) AS sub
        JOIN cctv_info cv ON sub.cctv_id = cv.id
        GROUP BY cv.address, cv.latitude, cv.longitude
        ORDER BY total DESC
        """, nativeQuery = true)
    List<Object[]> findMapCaseStats(@Param("startDate") LocalDateTime startDate, @Param("officeId") int officeId);

}
