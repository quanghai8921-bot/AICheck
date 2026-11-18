package com.nguyenquanghai.aicheck.exception;

import com.nguyenquanghai.aicheck.dto.response.ErrorLoginResponse;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;
import org.springframework.web.client.HttpStatusCodeException;

import java.time.LocalDateTime;

@RestControllerAdvice
public class GlobalExceptionHandler {

    @ExceptionHandler(HttpStatusCodeException.class)
    public ResponseEntity<ErrorLoginResponse> handleKeycloakHttpException(HttpStatusCodeException ex,
            HttpServletRequest request) {
        HttpStatus status = (ex.getStatusCode() == HttpStatus.UNAUTHORIZED
                || ex.getStatusCode() == HttpStatus.BAD_REQUEST)
                        ? HttpStatus.UNAUTHORIZED
                        : HttpStatus.valueOf(ex.getStatusCode().value());

        ErrorLoginResponse errorResponse = ErrorLoginResponse.builder()
                .timestamp(LocalDateTime.now())
                .status(status.value())
                .error(status.getReasonPhrase())
                .message("Invalid credentials. Please verify your username and password.")
                .path(request.getRequestURI())
                .build();

        return ResponseEntity.status(status).body(errorResponse);
    }
}