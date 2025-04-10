package com.example.backend.dashboard.service;

import com.example.backend.common.domain.CctvEntity;
import com.example.backend.dashboard.dto.CctvInfoResponse;
import com.example.backend.dashboard.repository.CctvInfoRepository;
import com.example.backend.user.dto.UserResponseDto;
import jakarta.persistence.EntityNotFoundException;
import jakarta.servlet.http.HttpSession;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@Transactional
@RequiredArgsConstructor
public class CctvService {

    private final CctvInfoRepository cctvRepository;

    @Value("${cctv.stream-url-prefix}")
    private String streamUrlPrefix;

    // 세션에서 officeId 추출
    private int getAuthenticatedOfficeId(HttpSession session) {
        UserResponseDto user = (UserResponseDto) session.getAttribute("user");
        if (user == null) {
            throw new IllegalStateException("세션이 만료되었거나 로그인되지 않았습니다.");
        }
        return user.getOfficeId();
    }

    public List<CctvInfoResponse> getCctvInfo(HttpSession session) {
        int officeId = getAuthenticatedOfficeId(session);
        List<CctvEntity> cctvs = cctvRepository.findAllByOfficeIdOrderById(officeId);

        return cctvs.stream()
                .map(CctvInfoResponse::fromEntity)
                .toList();
    }

    public CctvInfoResponse getCctvLive(int cctvId, HttpSession session) {
        getAuthenticatedOfficeId(session);

        CctvEntity entity = cctvRepository.findById(cctvId)
                .orElseThrow(() -> new EntityNotFoundException("해당 CCTV를 찾을 수 없습니다."));

        return CctvInfoResponse.fromEntityWithLiveUrl(entity, streamUrlPrefix);
    }

}