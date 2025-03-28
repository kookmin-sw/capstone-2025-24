package com.example.backend.search.controller;

import com.example.backend.search.dto.DetailRequest;
import com.example.backend.search.dto.DetailResponse;
import com.example.backend.search.dto.SearchRequest;
import com.example.backend.search.dto.SearchResult;
import com.example.backend.search.service.SearchService;
import com.example.backend.user.dto.UserResponseDto;
import jakarta.servlet.http.HttpSession;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1")
@RequiredArgsConstructor
public class SearchController {
    private final SearchService searchService;

    // 로그 검색 API
    @GetMapping("/log")
    public ResponseEntity<?> getCheckLog(@RequestBody SearchRequest request, HttpSession session) {
        // 세션에서 사용자 정보 가져오기
        UserResponseDto user = (UserResponseDto) session.getAttribute("user");
        if (user == null) {
            // 전역 예외 핸들러에서 처리할 수 있도록 예외를 던짐
            throw new IllegalStateException("로그인이 필요합니다.");
        }
        int officeId = user.getOfficeId();
        SearchResult searchResult = searchService.getCheckLog(
                request.getCategory(),
                request.getStartDateTime(),
                request.getEndDateTime(),
                request.getLocation(),
                request.getPolice(),
                request.getOrder(),
                request.getPage(),
                officeId
        );
        return ResponseEntity.ok(searchResult);
    }

    // 특정 로그 조회 API
    @GetMapping("/log/{id}")
    public ResponseEntity<?> getLogById(@PathVariable Integer id) {
        DetailResponse log = searchService.getLogById(id);
        return ResponseEntity.ok(log);
    }

    // 특정 로그 수정 API
    @PutMapping("/log/{id}")
    public ResponseEntity<?> updateLog(@PathVariable Integer id, @RequestBody DetailRequest newMemo) {
        searchService.updateLog(id, newMemo);
        return ResponseEntity.ok("로그가 수정되었습니다.");
    }
}
