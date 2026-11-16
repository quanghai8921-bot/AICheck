package com.nguyenquanghai.aicheck.controller;

import java.util.UUID;

import org.apache.http.HttpStatus;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.nguyenquanghai.aicheck.dto.request.student.VerifyPasscodeRequest;
import com.nguyenquanghai.aicheck.dto.response.student.VerifyPasscodeResponse;
import com.nguyenquanghai.aicheck.dto.response.student.listQuestion;
import com.nguyenquanghai.aicheck.services.StudentService;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/v1/student/exams")
@RequiredArgsConstructor
public class ExamController {

    private final StudentService studentService;

    /**
     * Sinh viên nhập passcode để vào ca thi
     */
    @PostMapping("/{examId}/join")
    @PreAuthorize("hasRole('STUDENT')")
    public ResponseEntity<VerifyPasscodeResponse> verifyPasscode(
            @PathVariable UUID examId,
            @Valid @RequestBody VerifyPasscodeRequest request) {
        VerifyPasscodeResponse response = studentService.verifyPasscode(request);

        if (!response.isValid()) {
            return ResponseEntity.badRequest().body(response);
        }

        return ResponseEntity.ok(response);
    }

    // Kì thi đó có câu hỏi gì
    @GetMapping("/{examId}/questions")
    @PreAuthorize("hasRole('STUDENT')")
    public ResponseEntity<listQuestion> getListQuestion(
            @PathVariable UUID examId) {
        listQuestion listQuestion = studentService.getListQuestion(examId);
        return ResponseEntity.ok(listQuestion);
    }

}
