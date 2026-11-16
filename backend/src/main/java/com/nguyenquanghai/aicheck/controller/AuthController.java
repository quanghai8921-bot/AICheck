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
     * 1. Đăng nhập dành cho Sinh viên (Dùng Mã sinh viên và Mật khẩu)
     */
    @PostMapping("/student/login")
    public ResponseEntity<?> studentLogin(@RequestBody StudentLoginRequest request) {
        // Gửi mã sinh viên và mật khẩu sang Keycloak kèm client ID và secret của sinh viên
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
     * 2. Đăng nhập dành cho Giáo viên (Dùng Mã giáo viên và Mật khẩu)
     */
    @PostMapping("/teacher/login")
    public ResponseEntity<?> teacherLogin(@RequestBody TeacherLoginRequest request) {
        // Gửi mã giáo viên và mật khẩu sang Keycloak kèm client ID và secret của giáo viên
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
        return ResponseEntity.ok(new MessageResponse("Liên kết đặt lại mật khẩu đã được gửi tới email của bạn."));
    }
}
