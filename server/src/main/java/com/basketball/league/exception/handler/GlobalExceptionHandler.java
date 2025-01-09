package com.basketball.league.exception.handler;

import com.basketball.league.exception.models.AlreadyExistsException;
import com.basketball.league.dto.ExceptionDto;
import com.basketball.league.exception.models.LimitExceededException;
import com.basketball.league.exception.models.NotFoundException;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;
import org.springframework.web.servlet.NoHandlerFoundException;

import java.time.LocalDateTime;

@Slf4j
@RestControllerAdvice
public class GlobalExceptionHandler {

    @ExceptionHandler(AlreadyExistsException.class)
    public ResponseEntity<ExceptionDto> handleAlreadyExistsException(AlreadyExistsException exception) {
        log.error("Conflict: {}", exception.getMessage(), exception);
        return buildResponseEntity(HttpStatus.CONFLICT, exception.getMessage());
    }

    @ExceptionHandler({NotFoundException.class, NoHandlerFoundException.class})
    public ResponseEntity<ExceptionDto> handleNotFoundException(Exception exception) {
        log.error("Not Found: {}", exception.getMessage(), exception);
        return buildResponseEntity(HttpStatus.NOT_FOUND, exception.getMessage());
    }

    @ExceptionHandler({IllegalArgumentException.class, LimitExceededException.class})
    public ResponseEntity<ExceptionDto> handleBadRequest(Exception exception) {
        log.error("Bad Request: {}", exception.getMessage(), exception);
        return buildResponseEntity(HttpStatus.BAD_REQUEST, exception.getMessage());
    }

    @ExceptionHandler(AccessDeniedException.class)
    public ResponseEntity<ExceptionDto> handleAccessDeniedException(AccessDeniedException exception) {
        log.error("Access Denied: {}", exception.getMessage(), exception);
        return buildResponseEntity(HttpStatus.FORBIDDEN, exception.getMessage());
    }

    @ExceptionHandler(Exception.class)
    public ResponseEntity<ExceptionDto> handleInternalError(Exception exception) {
        log.error("Internal Server Error: {}", exception.getMessage(), exception);
        return buildResponseEntity(HttpStatus.INTERNAL_SERVER_ERROR, exception.getMessage());
    }

    private ResponseEntity<ExceptionDto> buildResponseEntity(HttpStatus status, String message) {
        ExceptionDto exceptionDto = ExceptionDto.builder()
                .code(status.value())
                .timeStamp(LocalDateTime.now())
                .message(message)
                .build();
        return new ResponseEntity<>(exceptionDto, status);
    }
}

