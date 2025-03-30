package com.example.backend.dashboard.repository;

import com.example.backend.common.domain.CaseEntity;
import org.springframework.data.jpa.repository.JpaRepository;

public interface SurveyRepository extends JpaRepository<CaseEntity, Integer> {

}
