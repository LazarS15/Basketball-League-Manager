package com.basketball.league.exception.handler;

import com.basketball.league.dto.ExceptionDto;
import com.fasterxml.jackson.databind.ObjectMapper;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.web.AuthenticationEntryPoint;
import org.springframework.stereotype.Component;

import java.io.IOException;
import java.time.LocalDateTime;

@Component
@RequiredArgsConstructor
public class AuthenticationExceptionHandler implements AuthenticationEntryPoint {

    private final ObjectMapper mapper;
    @Override
    public void commence(HttpServletRequest request,
                         HttpServletResponse response,
                         AuthenticationException authException)
            throws IOException, ServletException {
        ExceptionDto error = ExceptionDto.builder()
                .code(HttpStatus.UNAUTHORIZED.value())
                .timeStamp(LocalDateTime.now())
                .message("Requires authentication")
                .build();
        String json = mapper.writeValueAsString(error);


        response.setStatus(HttpStatus.UNAUTHORIZED.value());
        response.setContentType(MediaType.APPLICATION_JSON_VALUE);
        response.getWriter().write(json);
        response.flushBuffer();
    }
}
