package com.example.backend.search.dto;

import lombok.Data;

import java.time.LocalDate;
import java.time.LocalDateTime;

@Data
public class SearchRequest {
    private String category;
    private String startDate;
    private String endDate;
    private String location;
    private String police;
    private String order;
    private Integer page;

    // startDate 변환 00:00:00
    public LocalDateTime getStartDateTime() {
        return startDate != null ? LocalDate.parse(startDate).atStartOfDay() : null;
    }

    // endDate 변환 23:59:59
    public LocalDateTime getEndDateTime() {
        return endDate != null ? LocalDate.parse(endDate).atTime(23, 59, 59) : null;
    }
}
