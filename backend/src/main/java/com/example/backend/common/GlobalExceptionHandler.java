package com.example.backend.common;

import jakarta.persistence.EntityNotFoundException;
import jakarta.servlet.http.HttpServletResponse;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;

import java.io.IOException;
import java.util.Collections;
import java.util.NoSuchElementException;

@Slf4j
@ControllerAdvice
public class GlobalExceptionHandler {

    // SSE 연결 종료 (브라우저에서 탭 닫거나, 연결 끊긴 경우)
    @ExceptionHandler(IOException.class)
    public void handleIOException(IOException e) {
        log.warn("SSE 연결 종료: {}", e.getMessage());
    }

    @ExceptionHandler(IllegalStateException.class)
    public ResponseEntity<?> handleIllegalStateException(IllegalStateException e) {
        log.warn("IllegalStateException: {}", e.getMessage());
        if (e.getMessage().contains("로그인이 필요")) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                    .body(Collections.singletonMap("message", e.getMessage()));
        } else if (e.getMessage().contains("이미 출동")){
            return ResponseEntity.status(HttpStatus.ALREADY_REPORTED)
                    .body(Collections.singletonMap("message", e.getMessage()));
        }
        return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                .body(Collections.singletonMap("message", e.getMessage()));
    }

    @ExceptionHandler(IllegalArgumentException.class)
    public ResponseEntity<?> handleIllegalArgumentException(IllegalArgumentException e) {
        log.warn("IllegalArgumentException: {}", e.getMessage());
        return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                .body(Collections.singletonMap("message", e.getMessage()));
    }

    @ExceptionHandler(NoSuchElementException.class)
    public ResponseEntity<?> handleNoSuchElementException(NoSuchElementException e) {
        return ResponseEntity.status(HttpStatus.NOT_FOUND)
                .body(Collections.singletonMap("message", e.getMessage()));
    }

    @ExceptionHandler(EntityNotFoundException.class)
    public ResponseEntity<?> handleEntityNotFoundException(EntityNotFoundException e) {
        return ResponseEntity.status(HttpStatus.NOT_FOUND)
                .body(Collections.singletonMap("message", e.getMessage()));
    }

    @ExceptionHandler(Exception.class)
    public void handleGenericException(Exception e, HttpServletResponse response) throws IOException {
        log.error("Unexpected error: ", e);
        if ("text/event-stream".equals(response.getContentType())) {
            // SSE 통신 도중 에러 → event-stream 포맷으로 전달
            response.getWriter().write("event: error\n");
            response.getWriter().write("data: " + e.getMessage() + "\n\n");
            response.getWriter().flush();
        } else {
            // 일반 요청 → JSON 에러 응답
            response.setStatus(HttpStatus.INTERNAL_SERVER_ERROR.value());
            response.setContentType(MediaType.APPLICATION_JSON_VALUE);
            response.getWriter().write("{\"message\": \"" + e.getMessage() + "\"}");
            response.getWriter().flush();
        }
    }
}
