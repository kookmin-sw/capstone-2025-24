package com.example.backend.search.dto;

import lombok.Builder;
import lombok.Getter;

import java.util.List;

@Getter
public class SearchResult {
    private final List<SearchResponse> results; // 검색 결과 리스트
    private final int totalPages; // 전체 페이지 수

    @Builder
    public SearchResult(List<SearchResponse> results, int totalPages) {
        this.results = results;
        this.totalPages = totalPages;
    }
}
