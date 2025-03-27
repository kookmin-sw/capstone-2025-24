package com.example.backend.search.domain;

import org.springframework.data.jpa.domain.Specification;

import java.time.LocalDateTime;
import java.util.List;

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


    // cctv_id 필터 추가 (cctv_info 테이블에서 가져온 id 값)
    public static Specification<CaseEntity> hasCctvIds(List<Integer> cctvIds) {
        return (root, query, criteriaBuilder) -> {
            if (cctvIds == null || cctvIds.isEmpty()) {
                return criteriaBuilder.conjunction(); // 조건 없으면 전체 조회
            }
            return root.get("cctv").get("id").in(cctvIds);
        };
    }

    // 여러 조건을 조합하는 메서드
    public static Specification<CaseEntity> filterCases(String category, LocalDateTime startDate, LocalDateTime endDate, String police, List<Integer> cctvIds, Integer officeId) {
        return Specification
                .where(hasOffice(officeId))
                .and(hasState("완료"))
                .and(hasDateRange(startDate, endDate))  // 날짜 범위 조건을 추가
                .and(hasCctvIds(cctvIds))
                .and(hasPolice(police)) // police 필터 추가
                .and(hasCategory(category));
    }

}
