package com.basketball.league.dto;

import lombok.Builder;
import lombok.Data;

import java.time.LocalDateTime;

@Data
@Builder
public class ExceptionDto {
    private LocalDateTime timeStamp;
    private int code;
    private String message;
}
