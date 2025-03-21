package com.example.backend.search.controller;

import com.example.backend.search.dto.SearchRequest;
import com.example.backend.search.dto.SearchResponse;
import com.example.backend.search.service.SearchService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1")
@RequiredArgsConstructor
public class SearchController {
    private final SearchService searchService;

    @GetMapping("/log")
    public ResponseEntity<?> getCheckLog(@RequestBody SearchRequest request) {
        try {
            // DTO의 값을 서비스로 전달
            List<SearchResponse> cases = searchService.getCheckLog(
                    request.getCategory(),
                    request.getStartDateTime(),
                    request.getEndDateTime(),
                    request.getLocation(),
                    request.getPolice(),
                    request.getOrder(),
                    request.getPage()
            );
            return ResponseEntity.ok(cases);
        } catch (Exception e) {
            return ResponseEntity.status(500).body(e.getMessage());
        }
    }

}
