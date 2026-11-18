package com.nguyenquanghai.aicheck.services;

import com.nguyenquanghai.aicheck.repository.StudentRepository;
import java.time.LocalDateTime;
import java.util.List;
import java.util.UUID;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.nguyenquanghai.aicheck.common.enums.JoinStatus;
import com.nguyenquanghai.aicheck.common.utils.SecurityUtils;
import com.nguyenquanghai.aicheck.dto.request.student.VerifyPasscodeRequest;
import com.nguyenquanghai.aicheck.dto.response.student.VerifyPasscodeResponse;
import com.nguyenquanghai.aicheck.dto.response.student.ListExamResponse;
import com.nguyenquanghai.aicheck.dto.response.student.QuestionResponse;
import com.nguyenquanghai.aicheck.repository.ExamRepository;
import com.nguyenquanghai.aicheck.repository.HistoryRepository;

import jakarta.persistence.EntityNotFoundException;

import com.nguyenquanghai.aicheck.entity.*;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class StudentService {

    private final StudentRepository studentRepository;
    private final ExamRepository examRepository;
    private final HistoryRepository historyRepository;
    QExam qexam = QExam.exam;
    QSubject qsubject = QSubject.subject;

    @Transactional(readOnly = true)
    public List<ListExamResponse> getActiveOrPrepareExam() {

        return examRepository.findExamOpenedOrPrepared();

    }

    public VerifyPasscodeResponse verifyPasscode(VerifyPasscodeRequest request) {
        UUID currentStudentId = SecurityUtils.getCurrentUserId();
        Student student = studentRepository.findById(currentStudentId)
                .orElseThrow();
        Exam exam = examRepository.findById(request.getExamId())
                .orElseThrow(() -> new EntityNotFoundException("No exam found"));

        LocalDateTime now = LocalDateTime.now();

        String passcode = exam.getPasscode();
        LocalDateTime startAt = exam.getStartAt();
        LocalDateTime endAt = exam.getEndAt();

        History history;

        // 1. Check the exam opening hours
        if (startAt != null && now.isBefore(startAt)) {
            throw new IllegalStateException("The exam hasn't started yet");
        }
        if (endAt != null && now.isAfter(endAt)) {
            throw new IllegalStateException("The exam is over");
        }

        if (!passcode.equalsIgnoreCase(request.getPasscode().trim())) {
            return VerifyPasscodeResponse.builder()
                    .valid(false)
                    .message("The passcode is incorrect")
                    .build();
        }

        history = History.builder()
                .student(student)
                .exam(exam)
                .joinAt(LocalDateTime.now())
                .statusJoin(JoinStatus.JOIN.name())
                .build();

        history = historyRepository.save(history);

        return VerifyPasscodeResponse.builder()
                .valid(true)
                .message("Verification successful")
                .examId(exam.getExamId())
                .build();
    }

    // Exam questions and time
    @Transactional(readOnly = true)
    public QuestionResponse getListQuestion(UUID examId) {
        return examRepository.questionForExam(examId);
    }

}
