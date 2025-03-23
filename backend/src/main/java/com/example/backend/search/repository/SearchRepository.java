package com.example.backend.search.repository;

import com.example.backend.search.domain.CaseEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;

public interface SearchRepository extends JpaRepository<CaseEntity, Integer>, JpaSpecificationExecutor<CaseEntity> {
}   // JpaSpecificationExecutor => Specification을 이용한 동적 검색

