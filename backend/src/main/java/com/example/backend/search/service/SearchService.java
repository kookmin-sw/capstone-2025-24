package com.example.backend.search.service;

import com.example.backend.search.domain.CaseEntity;
import com.example.backend.search.domain.SearchSpecification;
import com.example.backend.search.dto.SearchResponse;
import com.example.backend.search.repository.CctvRepository;
import com.example.backend.search.repository.SearchRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

@Service
@Transactional
@RequiredArgsConstructor
public class SearchService {
    private final SearchRepository searchRepository;
    private final CctvRepository cctvRepository;

    public List<SearchResponse> getCheckLog(String category, LocalDateTime startDate, LocalDateTime endDate, String location, String police, String order, Integer page) {
        // location이 있을 경우, cctv_info에서 해당 주소를 가진 cctv_id 리스트 조회
        List<Integer> cctvIds = null;
        if (location != null) {
            cctvIds = cctvRepository.findCctvIdsByAddress(location);
        }

        // 동적 검색 조건 생성
        Specification<CaseEntity> spec = SearchSpecification.filterCases(category, startDate, endDate, police, cctvIds);

        // 정렬 설정
        Sort sort = Sort.unsorted();
        if ("latest".equals(order)) {
            sort = Sort.by(Sort.Direction.DESC, "date");
        } else if ("oldest".equals(order)) {
            sort = Sort.by(Sort.Direction.ASC, "date");
        }

        // 필터 적용 후 데이터 조회
        List<CaseEntity> cases = searchRepository.findAll(spec, sort);

        // DTO 변환 후 반환
        return cases.stream().map(SearchResponse::fromEntity).collect(Collectors.toList());
    }

}
