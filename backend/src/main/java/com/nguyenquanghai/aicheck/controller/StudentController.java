package com.nguyenquanghai.aicheck.controller;

import com.nguyenquanghai.aicheck.dto.response.student.HistoryExamResponse;
import com.nguyenquanghai.aicheck.dto.response.student.ListExamResponse;
import com.nguyenquanghai.aicheck.services.StudentService;

import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/student")
@RequiredArgsConstructor
public class StudentController {

    private final StudentService studentService;

    /**
     * Get the student's exam list (including currently open and upcoming exam
     * sessions)
     */
    @GetMapping("/exams")
    @PreAuthorize("hasRole('STUDENT')")
    public ResponseEntity<List<ListExamResponse>> getExams() {
        List<ListExamResponse> exams = studentService.getActiveOrPrepareExam();
        return ResponseEntity.ok(exams);
    }

    @GetMapping("/history")
    @PreAuthorize("hasRole('STUDENT')")
    public ResponseEntity<List<HistoryExamResponse>> getHistory() {
        List<HistoryExamResponse> history = studentService.getHistoryExam();
        return ResponseEntity.ok(history);
    }

}
