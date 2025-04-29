package com.example.backend.search.service;

import com.amazonaws.HttpMethod;
import com.amazonaws.services.s3.AmazonS3;
import com.amazonaws.services.s3.model.GeneratePresignedUrlRequest;
import com.example.backend.common.domain.CaseEntity;
import com.example.backend.search.domain.SearchSpecification;
import com.example.backend.search.dto.*;
import com.example.backend.search.repository.SearchRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.domain.*;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.Date;
import java.util.List;
import java.util.concurrent.TimeUnit;
import java.util.stream.Collectors;

@Service
@Transactional
@RequiredArgsConstructor
public class SearchService {
    private final SearchRepository searchRepository;
    private static final int PAGE_SIZE = 8; // 한 페이지당 8개씩

    public SearchResult getCheckLog(String category, LocalDateTime startDate, LocalDateTime endDate, String address, String police, String order, Integer page, Integer officeId) {

        // 동적 검색 조건 생성
        Specification<CaseEntity> spec = SearchSpecification.filterCases(category, startDate, endDate, police, address, officeId);

        // 정렬 설정
        Sort sort = Sort.unsorted();
        if ("latest".equals(order)) {
            sort = Sort.by(Sort.Direction.DESC, "date");
        } else if ("oldest".equals(order)) {
            sort = Sort.by(Sort.Direction.ASC, "date");
        }

        // 페이지 기본값 설정 (1부터 시작)
        int pageNumber = (page == null || page < 1) ? 0 : page - 1; // JPA는 0부터 시작

        // Pageable 적용
        Pageable pageable = PageRequest.of(pageNumber, PAGE_SIZE, sort);
        Page<CaseEntity> casePage = searchRepository.findAll(spec, pageable);

        // DTO 변환
        List<SearchResponse> results = casePage.getContent().stream()
                .map(SearchResponse::fromEntity)
                .collect(Collectors.toList());

        // 전체 페이지 수 가져오기
        int totalPages = casePage.getTotalPages();
        long totalElements = casePage.getTotalElements();

        // 결과 반환
        return SearchResult.builder()
                .results(results)
                .totalPages(totalPages)
                .totalElements(totalElements)
                .build();
    }

    @Value("${cloud.aws.bucket}")
    private String bucket;
    private final AmazonS3 s3Client;
    public DetailResponse getLogById(Integer id) {
        CaseEntity caseEntity = searchRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("해당 ID의 로그를 찾을 수 없습니다."));

        String videoKey = caseEntity.getVideo();

        // Presigned URL 유효기간 설정 (30분)
        Date expiration = new Date();
        long expTime = expiration.getTime();
        expTime += TimeUnit.MINUTES.toMillis(30);   // 30 minute
        expiration.setTime(expTime);

        GeneratePresignedUrlRequest presignRequest =
                new GeneratePresignedUrlRequest(bucket, videoKey)
                        .withMethod(HttpMethod.GET)
                        .withExpiration(expiration);

        String presignedUrl = s3Client.generatePresignedUrl(presignRequest).toString();

        return DetailResponse.fromEntity(caseEntity, presignedUrl);
    }


    public void updateLog(Integer id, DetailRequest request) {
        CaseEntity caseEntity = searchRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("해당 ID의 로그를 찾을 수 없습니다."));

        caseEntity.setMemo(request.getMemo());

        searchRepository.save(caseEntity);
    }
}

