CREATE TABLE IF NOT EXISTS "users" (
	"userId" UUID NOT NULL DEFAULT gen_random_uuid(),
	"fullName" TEXT NOT NULL,
	"dateOfBirth" TIMESTAMP NOT NULL,
	"phoneNumber" VARCHAR(10) NOT NULL UNIQUE,
	"email" VARCHAR(255) NOT NULL UNIQUE,
	"sex" VARCHAR(10) NOT NULL,
	"identificationCard" VARCHAR(12) NOT NULL UNIQUE,
	"address" TEXT NOT NULL,
	"password" VARCHAR(255) NOT NULL,
	-- ACTIVE, LOCKED, INACTIVE
	"status" VARCHAR(10) NOT NULL,
	"createdAt" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
	"roleId" UUID NOT NULL,
	PRIMARY KEY("userId")
);

COMMENT ON COLUMN "users"."status" IS 'ACTIVE, LOCKED, INACTIVE';

CREATE TABLE IF NOT EXISTS "teachers" (
	"userId" UUID NOT NULL,
	"teacherCode" VARCHAR(10) NOT NULL UNIQUE,
	"subjectCode" VARCHAR(10) NOT NULL,
	"experience" INTEGER NOT NULL,
	"startAt" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
	"endAt" TIMESTAMP NULL,
	PRIMARY KEY("userId")
);

CREATE TABLE IF NOT EXISTS "students" (
	"userId" UUID NOT NULL,
	"studentCode" VARCHAR(10) NOT NULL UNIQUE,
	"majorCode" VARCHAR(10) NOT NULL,
	"semester" SMALLINT NOT NULL DEFAULT 1 CHECK("semester" BETWEEN 1 AND 10),
	"startAt" INTEGER NOT NULL,
	"endAt" INTEGER NOT NULL,
	PRIMARY KEY("userId")
);

CREATE TABLE IF NOT EXISTS "roles" (
	"roleId" UUID NOT NULL DEFAULT gen_random_uuid(),
	"roleName" VARCHAR(50) NOT NULL,
	PRIMARY KEY("roleId")
);

CREATE TABLE IF NOT EXISTS "subjects" (
	"subjectCode" VARCHAR(10) NOT NULL,
	"subjectName" TEXT NOT NULL,
	PRIMARY KEY("subjectCode")
);

CREATE TABLE IF NOT EXISTS "exam" (
	"examId" UUID NOT NULL DEFAULT gen_random_uuid(),
	"title" TEXT NOT NULL,
	"maxScore" DECIMAL NOT NULL,
	"startAt" TIMESTAMP NOT NULL,
	"endAt" TIMESTAMP NOT NULL,
	"createdBy" VARCHAR(10) NOT NULL,
	"createdAt" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
	-- QUIZ, EXAM, HOMEWORK
	"type" TEXT NOT NULL,
	-- OPEN, CLOSE, PREPARE
	"status" VARCHAR(10) NOT NULL,
	"passcode" VARCHAR(10) NOT NULL,
	"questionsId" UUID NOT NULL,
	"subjectCode" VARCHAR(10) NOT NULL,
	PRIMARY KEY("examId")
);

COMMENT ON COLUMN "exam"."type" IS 'QUIZ, EXAM, HOMEWORK';
COMMENT ON COLUMN "exam"."status" IS 'OPEN, CLOSE, PREPARE';

CREATE TABLE IF NOT EXISTS "history" (
	"historyId" UUID NOT NULL DEFAULT gen_random_uuid(),
	"studentCode" VARCHAR(10) NOT NULL,
	"feedback" TEXT NULL,
	-- Submission, Not Submission, Grade, Not Grade
	"statusSubmission" VARCHAR(10) NULL,
	"submissionAt" TIMESTAMP NULL,
	"score" DECIMAL NULL,
	"gradeAt" TIMESTAMP NULL,
	"statusGrading" VARCHAR(10) NULL,
	"gradeBy" VARCHAR(10) NULL,
	"statusJoin" VARCHAR(10) NOT NULL,
	"joinAt" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
	"examId" UUID NOT NULL,
	PRIMARY KEY("historyId")
);

COMMENT ON COLUMN "history"."statusSubmission" IS 'Submission, Not Submission, Grade, Not Grade';

CREATE TABLE IF NOT EXISTS "bankQuestions" (
	"bankQuestionld" UUID NOT NULL DEFAULT gen_random_uuid(),
	"content" TEXT NOT NULL,
	"subjectCode" VARCHAR(10) NOT NULL,
	PRIMARY KEY("bankQuestionld")
);

CREATE TABLE IF NOT EXISTS "studentAnswer" (
	"answerId" UUID NOT NULL,
	"content" TEXT NOT NULL,
	"wordCount" INTEGER NOT NULL,
	"reportId" UUID NULL,
	PRIMARY KEY("answerId")
);

CREATE TABLE IF NOT EXISTS "major" (
	"majorCode" VARCHAR(10) NOT NULL,
	"majorName" TEXT NOT NULL,
	PRIMARY KEY("majorCode")
);

CREATE TABLE IF NOT EXISTS "reportAI" (
	"reportId" UUID NOT NULL DEFAULT gen_random_uuid(),
	"stylometryId" UUID NOT NULL,
	"perplexity" TEXT NOT NULL,
	"burstiness" TEXT NOT NULL,
	"statusFlag" VARCHAR(10) NOT NULL,
	PRIMARY KEY("reportId")
);

CREATE TABLE IF NOT EXISTS "subjectMajor" (
	"majorCode" VARCHAR(10) NOT NULL,
	"subjectCode" VARCHAR(10) NOT NULL,
	PRIMARY KEY("majorCode", "subjectCode")
);

COMMENT ON TABLE "subjectMajor" IS 'Bảng phụ';

CREATE TABLE IF NOT EXISTS "stylometry" (
	"stylometryId" UUID NOT NULL DEFAULT gen_random_uuid(),
	"vocabulary" TEXT NOT NULL,
	"grammar" TEXT NOT NULL,
	"mistake" TEXT NOT NULL,
	"express" TEXT NOT NULL,
	PRIMARY KEY("stylometryId")
);

ALTER TABLE "users"
ADD FOREIGN KEY("roleId") REFERENCES "roles"("roleId")
ON UPDATE NO ACTION ON DELETE NO ACTION;
ALTER TABLE "teachers"
ADD FOREIGN KEY("userId") REFERENCES "users"("userId")
ON UPDATE NO ACTION ON DELETE NO ACTION;
ALTER TABLE "students"
ADD FOREIGN KEY("userId") REFERENCES "users"("userId")
ON UPDATE NO ACTION ON DELETE NO ACTION;
ALTER TABLE "exam"
ADD FOREIGN KEY("createdBy") REFERENCES "teachers"("teacherCode")
ON UPDATE CASCADE ON DELETE NO ACTION;
ALTER TABLE "history"
ADD FOREIGN KEY("studentCode") REFERENCES "students"("studentCode")
ON UPDATE CASCADE ON DELETE NO ACTION;
ALTER TABLE "bankQuestions"
ADD FOREIGN KEY("subjectCode") REFERENCES "subjects"("subjectCode")
ON UPDATE CASCADE ON DELETE NO ACTION;
ALTER TABLE "history"
ADD FOREIGN KEY("examId") REFERENCES "exam"("examId")
ON UPDATE NO ACTION ON DELETE NO ACTION;
ALTER TABLE "studentAnswer"
ADD FOREIGN KEY("reportId") REFERENCES "reportAI"("reportId")
ON UPDATE NO ACTION ON DELETE NO ACTION;
ALTER TABLE "studentAnswer"
ADD FOREIGN KEY("answerId") REFERENCES "history"("historyId")
ON UPDATE NO ACTION ON DELETE NO ACTION;
ALTER TABLE "reportAI"
ADD FOREIGN KEY("stylometryId") REFERENCES "stylometry"("stylometryId")
ON UPDATE NO ACTION ON DELETE NO ACTION;
ALTER TABLE "subjectMajor"
ADD FOREIGN KEY("majorCode") REFERENCES "major"("majorCode")
ON UPDATE NO ACTION ON DELETE NO ACTION;
ALTER TABLE "subjectMajor"
ADD FOREIGN KEY("subjectCode") REFERENCES "subjects"("subjectCode")
ON UPDATE NO ACTION ON DELETE NO ACTION;
ALTER TABLE "exam"
ADD FOREIGN KEY("questionsId") REFERENCES "bankQuestions"("bankQuestionld")
ON UPDATE NO ACTION ON DELETE NO ACTION;
ALTER TABLE "exam"
ADD FOREIGN KEY("subjectCode") REFERENCES "subjects"("subjectCode")
ON UPDATE NO ACTION ON DELETE NO ACTION;
ALTER TABLE "history"
ADD FOREIGN KEY("gradeBy") REFERENCES "teachers"("teacherCode")
ON UPDATE CASCADE ON DELETE NO ACTION;
ALTER TABLE "students"
ADD FOREIGN KEY("majorCode") REFERENCES "major"("majorCode")
ON UPDATE NO ACTION ON DELETE NO ACTION;
ALTER TABLE "teachers"
ADD FOREIGN KEY("subjectCode") REFERENCES "subjects"("subjectCode")
ON UPDATE NO ACTION ON DELETE NO ACTION;