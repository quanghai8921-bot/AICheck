package com.nguyenquanghai.aicheck.services;

import com.nguyenquanghai.aicheck.repository.StudentRepository;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.nguyenquanghai.aicheck.common.enums.GradingStatus;
import com.nguyenquanghai.aicheck.common.enums.JoinStatus;
import com.nguyenquanghai.aicheck.common.enums.SubmissionStatus;
import com.nguyenquanghai.aicheck.common.utils.SecurityUtils;
import com.nguyenquanghai.aicheck.dto.message.SubmissionEventMessage;
import com.nguyenquanghai.aicheck.dto.request.student.SubmitExamRequest;
import com.nguyenquanghai.aicheck.dto.request.student.VerifyPasscodeRequest;
import com.nguyenquanghai.aicheck.dto.response.student.VerifyPasscodeResponse;
import com.nguyenquanghai.aicheck.dto.response.student.HistoryExamResponse;
import com.nguyenquanghai.aicheck.dto.response.student.ListExamResponse;
import com.nguyenquanghai.aicheck.dto.response.student.PreviousStylometryResponse;
import com.nguyenquanghai.aicheck.dto.response.student.QuestionResponse;
import com.nguyenquanghai.aicheck.dto.response.student.SubmitExamResponse;
import com.nguyenquanghai.aicheck.producer.SubmissionProducer;
import com.nguyenquanghai.aicheck.repository.ExamRepository;
import com.nguyenquanghai.aicheck.repository.HistoryRepository;
import com.nguyenquanghai.aicheck.repository.StudentAnswerRepository;

import jakarta.persistence.EntityNotFoundException;

import com.nguyenquanghai.aicheck.entity.*;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class StudentService {

    private final StudentRepository studentRepository;
    private final ExamRepository examRepository;
    private final HistoryRepository historyRepository;
    private final StudentAnswerRepository studentAnswerRepository;
    private final SubmissionProducer submissionProducer;

    QExam qexam = QExam.exam;
    QSubject qsubject = QSubject.subject;

    @Transactional(readOnly = true)
    public List<ListExamResponse> getActiveOrPrepareExam() {
        return examRepository.findExamOpenedOrPrepared();
    }

    @Transactional
    public VerifyPasscodeResponse verifyPasscode(UUID examId, VerifyPasscodeRequest request) {
        UUID currentStudentId = SecurityUtils.getCurrentUserId();
        Student student = studentRepository.findById(currentStudentId)
                .orElseThrow(() -> new EntityNotFoundException("Student not found"));
        Exam exam = examRepository.findById(examId)
                .orElseThrow(() -> new EntityNotFoundException("No exam found"));

        LocalDateTime now = LocalDateTime.now();

        String passcode = exam.getPasscode();
        LocalDateTime startAt = exam.getStartAt();
        LocalDateTime endAt = exam.getEndAt();

        // 1. Check the exam opening hours
        if (startAt != null && now.isBefore(startAt)) {
            throw new IllegalStateException("The exam hasn't started yet");
        }
        if (endAt != null && now.isAfter(endAt)) {
            throw new IllegalStateException("The exam is over");
        }

        if (passcode == null || !passcode.equalsIgnoreCase(request.getPasscode().trim())) {
            return VerifyPasscodeResponse.builder()
                    .valid(false)
                    .message("The passcode is incorrect")
                    .build();
        }

        Optional<History> existingHistory = historyRepository.findByStudent_StudentIdAndExam_ExamId(currentStudentId,
                examId);
        History history;
        if (existingHistory.isPresent()) {
            history = existingHistory.get();
            if (SubmissionStatus.SUBMITTED.name().equals(history.getStatusSubmission())) {
                throw new IllegalStateException("Student has already submitted this exam");
            }
            history.setStatusJoin(JoinStatus.JOIN.name());
        } else {
            history = History.builder()
                    .student(student)
                    .exam(exam)
                    .joinAt(LocalDateTime.now())
                    .statusJoin(JoinStatus.JOIN.name())
                    .build();
        }

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
        UUID currentStudentId = SecurityUtils.getCurrentUserId();
        History history = historyRepository.findByStudent_StudentIdAndExam_ExamId(currentStudentId, examId)
                .orElseThrow(() -> new IllegalStateException("Student has not joined this exam"));

        if (!JoinStatus.JOIN.name().equals(history.getStatusJoin())) {
            throw new IllegalStateException("Student has not joined this exam");
        }

        return examRepository.questionForExam(examId);
    }

    // Submit exam
    @Transactional
    public SubmitExamResponse submitExam(UUID examId, SubmitExamRequest request) {
        UUID currentStudentId = SecurityUtils.getCurrentUserId();

        // 1. Kiểm tra lịch sử tham gia và bài thi của sinh viên
        History history = historyRepository.findByStudent_StudentIdAndExam_ExamId(currentStudentId, examId)
                .orElseThrow(() -> new EntityNotFoundException("No exam session found for this student"));
        Exam exam = history.getExam();

        // 2. Kiểm tra trạng thái Join và đã nộp chưa
        if (!JoinStatus.JOIN.name().equals(history.getStatusJoin())) {
            throw new IllegalStateException("Student has not joined this exam");
        }
        if (SubmissionStatus.SUBMITTED.name().equals(history.getStatusSubmission())) {
            throw new IllegalStateException("Student has already submitted this exam");
        }

        // 3. Kiểm tra thời gian thi
        LocalDateTime now = LocalDateTime.now();
        if (exam.getStartAt() != null && now.isBefore(exam.getStartAt())) {
            throw new IllegalStateException("Exam hasn't started yet");
        }
        if (exam.getEndAt() != null && now.isAfter(exam.getEndAt())) {
            throw new IllegalStateException("Exam is not within valid submission time");
        }

        // 4. Cập nhật bảng history
        history.setStatusSubmission(SubmissionStatus.SUBMITTED.name());
        history.setSubmissionAt(now);
        history.setStatusGrading(GradingStatus.PENDING.name());
        historyRepository.save(history);

        // 5. Tạo và lưu StudentAnswer
        StudentAnswer answer = StudentAnswer.builder()
                .history(history)
                .content(request.getContent())
                .wordCount(request.getWordCount())
                .build();

        studentAnswerRepository.save(answer);

        // 6. Kiểm tra mốc Stylometry cũ và đẩy sự kiện sang RabbitMQ
        Optional<PreviousStylometryResponse> latestStylometryOpt = studentAnswerRepository
                .findLatestStylometryByStudentId(currentStudentId);

        boolean isFirstSubmission = latestStylometryOpt.isEmpty();
        PreviousStylometryResponse previousStylometry = latestStylometryOpt.orElse(null);

        SubmissionEventMessage message = SubmissionEventMessage.builder()
                .answerId(answer.getAnswerId())
                .studentId(currentStudentId)
                .examId(exam.getExamId())
                .questionId(request.getQuestionId())
                .content(request.getContent())
                .wordCount(request.getWordCount())
                .submittedAt(now)
                .isFirstSubmission(isFirstSubmission)
                .previousStylometry(previousStylometry)
                .build();

        submissionProducer.sendSubmissionEvent(message);

        return SubmitExamResponse.builder()
                .historyId(history.getHistoryId())
                .examId(exam.getExamId())
                .statusSubmission(history.getStatusSubmission())
                .submittedAt(history.getSubmissionAt())
                .message("Submit successfully")
                .build();
    }

}
