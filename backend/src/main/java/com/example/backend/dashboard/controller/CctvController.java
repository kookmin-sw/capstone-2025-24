package com.example.backend.dashboard.controller;

import com.example.backend.dashboard.dto.CctvInfoResponse;
import com.example.backend.dashboard.service.CctvService;
import jakarta.servlet.http.HttpSession;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/cctv")
@RequiredArgsConstructor
public class CctvController {


    private final CctvService CctvService;

    @GetMapping("")
    public ResponseEntity<?> getCctvInfo(HttpSession session) {
        List<CctvInfoResponse> cctvs = CctvService.getCctvInfo(session);
        return ResponseEntity.ok(cctvs);
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> getCctvLive(@PathVariable("id") int id, HttpSession session) {
        CctvInfoResponse cctv = CctvService.getCctvLive(id, session);
        return ResponseEntity.ok(cctv);
    }

}
