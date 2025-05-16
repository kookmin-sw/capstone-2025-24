package com.example.backend.search.domain;

import com.example.backend.common.domain.CaseEntity;
import org.springframework.data.jpa.domain.Specification;

import java.time.LocalDateTime;

public class SearchSpecification {

    // 관할 경찰서 필터
    public static Specification<CaseEntity> hasOffice(Integer officeId) {
        return (root, query, criteriaBuilder) ->
                officeId == null ? criteriaBuilder.conjunction() : criteriaBuilder.equal(root.get("office").get("id"), officeId);
    }

    // 카테고리 필터
    public static Specification<CaseEntity> hasCategory(String category) {
        return (root, query, criteriaBuilder) ->
                category == null ? criteriaBuilder.conjunction() : criteriaBuilder.equal(root.get("category"), category);
    }

    // state=완료 필터
    public static Specification<CaseEntity> hasState(String state) {
        return (root, query, criteriaBuilder) ->
                criteriaBuilder.equal(root.get("state"), state);
    }

    // 날짜 범위 필터 (시작일과 종료일이 모두 있는 경우에 적용)
    public static Specification<CaseEntity> hasDateRange(LocalDateTime startDate, LocalDateTime endDate) {
        return (root, query, criteriaBuilder) -> {
            if (startDate == null && endDate == null) {
                return criteriaBuilder.conjunction();  // 두 날짜가 모두 null일 때는 아무 조건도 안 걸음
            } else if (startDate == null) {
                return criteriaBuilder.lessThanOrEqualTo(root.get("date"), endDate);  // 종료일만 있을 때
            } else if (endDate == null) {
                return criteriaBuilder.greaterThanOrEqualTo(root.get("date"), startDate);  // 시작일만 있을 때
            } else {
                // 시작일과 종료일이 모두 있을 때
                return criteriaBuilder.between(root.get("date"), startDate, endDate);
            }
        };
    }

    // 담당 경찰관 필터
    public static Specification<CaseEntity> hasPolice(String police) {
        return (root, query, criteriaBuilder) -> {
            if  (police == null || police.isEmpty()) {
                return criteriaBuilder.conjunction();
            }
            return root.get("police").get("name").in(police);
        };
//                police == null ? criteriaBuilder.conjunction() : criteriaBuilder.equal(root.get("police"), police);
    }

    // 주소 포함 필터
    public static Specification<CaseEntity> hasAddress(String address) {
        return (root, query, criteriaBuilder) -> {
            if (address == null || address.trim().isEmpty()) {
                return criteriaBuilder.conjunction();
            }
            return criteriaBuilder.like(root.get("cctv").get("address"), "%" + address + "%");
        };
    }

    // 여러 조건을 조합하는 메서드
    public static Specification<CaseEntity> filterCases(String category, LocalDateTime startDate, LocalDateTime endDate, String police, String address, Integer officeId) {
        return Specification
                .where(hasOffice(officeId))
                .and(hasState("완료"))
                .and(hasDateRange(startDate, endDate))
                .and(hasAddress(address))
                .and(hasPolice(police))
                .and(hasCategory(category));
    }

}
