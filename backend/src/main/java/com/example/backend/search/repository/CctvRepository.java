package com.example.backend.search.repository;

import com.example.backend.common.domain.CctvEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface CctvRepository extends JpaRepository<CctvEntity, Integer> {

    @Query("SELECT c.id FROM CctvEntity c WHERE c.address LIKE %:location%")
    List<Integer> findCctvIdsByAddress(@Param("location") String location);
}
