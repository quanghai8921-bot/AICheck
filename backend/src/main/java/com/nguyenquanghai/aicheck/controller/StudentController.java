package com.nguyenquanghai.aicheck.controller;

import com.nguyenquanghai.aicheck.dto.response.student.listExam;
import com.nguyenquanghai.aicheck.dto.response.student.listSubjectMajor;
import com.nguyenquanghai.aicheck.dto.response.student.studentMajor;
import com.nguyenquanghai.aicheck.services.StudentService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/api/v1/student")
@RequiredArgsConstructor
public class StudentController {

    private final StudentService studentService;

    /**
     * Lấy danh sách kỳ thi của sinh viên (bao gồm các ca thi đang mở và sắp mở)
     */
    @GetMapping({ "/exams" })
    @PreAuthorize("hasRole('STUDENT')")
    public ResponseEntity<List<listExam>> getExams() {
        List<listExam> exams = studentService.getActiveOrPrepareExam();
        return ResponseEntity.ok(exams);
    }

    /**
     * Lấy thông tin ngành học của sinh viên theo ID sinh viên
     */
    @GetMapping("/{studentId}/major")
    @PreAuthorize("hasRole('STUDENT')")
    public ResponseEntity<studentMajor> getStudentMajor(@PathVariable UUID studentId) {
        studentMajor major = studentService.getStudentMajor(studentId);
        return ResponseEntity.ok(major);
    }

    /**
     * Lấy danh sách môn học theo chuyên ngành
     */
    @GetMapping("/majors/{majorId}/subjects")
    @PreAuthorize("hasRole('STUDENT')")
    public ResponseEntity<List<listSubjectMajor>> getSubjectsByMajor(@PathVariable UUID majorId) {
        List<listSubjectMajor> subjects = studentService.getSubjectsByMajor(majorId);
        return ResponseEntity.ok(subjects);
    }

    
}
