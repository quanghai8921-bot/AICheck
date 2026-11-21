package com.nguyenquanghai.aicheck.controller;

import java.util.UUID;

import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.nguyenquanghai.aicheck.dto.request.student.SubmitExamRequest;
import com.nguyenquanghai.aicheck.dto.request.student.VerifyPasscodeRequest;
import com.nguyenquanghai.aicheck.dto.response.student.QuestionResponse;
import com.nguyenquanghai.aicheck.dto.response.student.SubmitExamResponse;
import com.nguyenquanghai.aicheck.dto.response.student.VerifyPasscodeResponse;
import com.nguyenquanghai.aicheck.services.StudentService;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/v1/student/exams")
@RequiredArgsConstructor
public class ExamController {

    private final StudentService studentService;

    /**
     * Students enter the passcode to join the exam session
     */
    @PostMapping("/{examId}/join")
    @PreAuthorize("hasRole('STUDENT')")
    public ResponseEntity<VerifyPasscodeResponse> verifyPasscode(
            @PathVariable UUID examId,
            @Valid @RequestBody VerifyPasscodeRequest request) {
        VerifyPasscodeResponse response = studentService.verifyPasscode(examId, request);

        if (!response.isValid()) {
            return ResponseEntity.badRequest().body(response);
        }

        return ResponseEntity.ok(response);
    }

    // What questions were on that exam?
    @GetMapping("/{examId}/questions")
    @PreAuthorize("hasRole('STUDENT')")
    public ResponseEntity<QuestionResponse> getListQuestion(
            @PathVariable UUID examId) {
        QuestionResponse listQuestion = studentService.getListQuestion(examId);
        return ResponseEntity.ok(listQuestion);
    }

    // Sinh viên nộp bài thi
    @PostMapping("/{examId}/submit")
    @PreAuthorize("hasRole('STUDENT')")
    public ResponseEntity<SubmitExamResponse> submitExam(
            @PathVariable UUID examId,
            @RequestBody @Valid SubmitExamRequest request) {
        SubmitExamResponse response = studentService.submitExam(examId, request);
        return ResponseEntity.ok(response);
    }

}
