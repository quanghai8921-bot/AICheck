package com.nguyenquanghai.aicheck.controller;

import com.nguyenquanghai.aicheck.dto.request.ForgotPasswordRequest;
import com.nguyenquanghai.aicheck.dto.request.student.StudentLoginRequest;
import com.nguyenquanghai.aicheck.dto.request.teacher.TeacherLoginRequest;
import com.nguyenquanghai.aicheck.dto.response.LoginResponse;
import com.nguyenquanghai.aicheck.dto.response.MessageResponse;
import com.nguyenquanghai.aicheck.dto.response.TokenResponse;
import com.nguyenquanghai.aicheck.security.service.KeycloakAuthService;

import jakarta.validation.Valid;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1/auth")
public class AuthController {

    private final KeycloakAuthService keycloakAuthService;

    public AuthController(KeycloakAuthService keycloakAuthService) {
        this.keycloakAuthService = keycloakAuthService;
    }

    /**
     * 1. Student Login (Use Student ID and Password)
     */
    @PostMapping("/student/login")
    public ResponseEntity<?> studentLogin(@RequestBody StudentLoginRequest request) {
        // Send the student ID and password to Keycloak along with the student's client ID and secret
        TokenResponse token = keycloakAuthService.loginWithKeycloak(
                request.getStudentCode(),
                request.getPassword(),
                keycloakAuthService.getClientIdStudent(),
                keycloakAuthService.getClientSecretStudent());

        LoginResponse response = LoginResponse.builder()
                .accessToken(token.getAccess_token())
                .tokenType("Bearer")
                .expiresIn(token.getExpires_in())
                .role("STUDENT")
                .build();

        return ResponseEntity.ok(response);
    }

    /**
     * 2. Teacher Login (Use Teacher ID and Password)
     */
    @PostMapping("/teacher/login")
    public ResponseEntity<?> teacherLogin(@RequestBody TeacherLoginRequest request) {
        // Send the teacher's code and password to Keycloak along with the teacher's client ID and secret
        TokenResponse token = keycloakAuthService.loginWithKeycloak(
                request.getTeacherCode(),
                request.getPassword(),
                keycloakAuthService.getClientIdTeacher(),
                keycloakAuthService.getClientSecretTeacher());

        LoginResponse response = LoginResponse.builder()
                .accessToken(token.getAccess_token())
                .tokenType("Bearer")
                .expiresIn(token.getExpires_in())
                .role("TEACHER")
                .build();

        return ResponseEntity.ok(response);
    }

    @PostMapping("/forgot-password")
    public ResponseEntity<?> studentForgotPassword(@Valid @RequestBody ForgotPasswordRequest request) {
        keycloakAuthService.sendResetPasswordEmail(request.getEmail());
        return ResponseEntity.ok(new MessageResponse("The password reset link has been sent to your email."));
    }
}
