package com.example.backend.search.dto;

import lombok.Builder;
import lombok.Getter;

import java.util.List;

@Getter @Builder
public class SearchResult {
    private final List<SearchResponse> results; // 검색 결과 리스트
    private final int totalPages; // 전체 페이지 수
    private final long totalElements;  // 전체 데이터 개수
}
