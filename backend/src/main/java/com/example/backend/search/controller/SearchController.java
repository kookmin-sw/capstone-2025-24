package com.example.backend.search.controller;

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

    @GetMapping("/log")
    public ResponseEntity<?> getCheckLog(@RequestBody SearchRequest request,  HttpSession session) {
        try {
            // 세션에서 사용자 정보 가져오기
            UserResponseDto user = (UserResponseDto) session.getAttribute("user");

            if (user == null) {
                return ResponseEntity.status(403).body("로그인이 필요합니다.");
            }

            // 세션에서 officeId 가져오기
            int officeId = user.getOfficeId();
            // DTO의 값을 서비스로 전달
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
        } catch (Exception e) {
            return ResponseEntity.status(500).body(e.getMessage());
        }
    }
}
