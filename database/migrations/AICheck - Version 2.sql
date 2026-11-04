CREATE TABLE IF NOT EXISTS "user" (
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
	"status" VARCHAR(20) NOT NULL,
	"createdAt" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
	"roleId" UUID NOT NULL,
	PRIMARY KEY("userId")
);

COMMENT ON COLUMN "user"."status" IS 'ACTIVE, LOCKED, INACTIVE';

CREATE TABLE IF NOT EXISTS "teacher" (
	"teacherId" UUID NOT NULL,
	"teacherCode" VARCHAR(10) NOT NULL UNIQUE,
	"subjectId" UUID NOT NULL,
	"experience" INTEGER NOT NULL,
	"startYear" INTEGER NOT NULL,
	"endYear" INTEGER NULL,
	PRIMARY KEY("teacherId")
);

CREATE TABLE IF NOT EXISTS "student" (
	"studentId" UUID NOT NULL,
	"studentCode" VARCHAR(10) NOT NULL UNIQUE,
	"majorId" UUID NOT NULL,
	"semester" SMALLINT NOT NULL,
	"startYear" INTEGER NOT NULL,
	"endYear" INTEGER NOT NULL,
	PRIMARY KEY("studentId")
);

CREATE TABLE IF NOT EXISTS "role" (
	"roleId" UUID NOT NULL DEFAULT gen_random_uuid(),
	"roleName" VARCHAR(50) NOT NULL,
	PRIMARY KEY("roleId")
);

CREATE TABLE IF NOT EXISTS "subject" (
	"subjectId" UUID NOT NULL DEFAULT gen_random_uuid(),
	"subjectCode" VARCHAR(10) NOT NULL UNIQUE,
	"subjectName" TEXT NOT NULL,
	PRIMARY KEY("subjectId")
);

CREATE TABLE IF NOT EXISTS "exam" (
	"examId" UUID NOT NULL DEFAULT gen_random_uuid(),
	"title" TEXT NOT NULL,
	"maxScore" DECIMAL NOT NULL,
	"startAt" TIMESTAMP NOT NULL,
	"endAt" TIMESTAMP NOT NULL,
	"createdBy" UUID NOT NULL,
	"createdAt" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
	-- QUIZ, EXAM, HOMEWORK
	"type" TEXT NOT NULL,
	-- OPEN, CLOSE, PREPARE
	"status" VARCHAR(20) NOT NULL,
	"passcode" VARCHAR(10) NOT NULL,
	"questionId" UUID NOT NULL,
	"subjectId" UUID NOT NULL,
	PRIMARY KEY("examId")
);

COMMENT ON COLUMN "exam"."type" IS 'QUIZ, EXAM, HOMEWORK';
COMMENT ON COLUMN "exam"."status" IS 'OPEN, CLOSE, PREPARE';

CREATE TABLE IF NOT EXISTS "history" (
	"historyId" UUID NOT NULL DEFAULT gen_random_uuid(),
	"studentId" UUID NOT NULL,
	"feedback" TEXT NULL,
	-- Submission, Not Submission, Grade, Not Grade
	"statusSubmission" VARCHAR(20) NULL,
	"submissionAt" TIMESTAMP NULL,
	"score" DECIMAL NULL,
	"gradeAt" TIMESTAMP NULL,
	"statusGrading" VARCHAR(20) NULL,
	"gradeBy" UUID NULL,
	"statusJoin" VARCHAR(20) NOT NULL,
	"joinAt" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
	"examId" UUID NOT NULL,
	PRIMARY KEY("historyId")
);

COMMENT ON COLUMN "history"."statusSubmission" IS 'Submission, Not Submission, Grade, Not Grade';

CREATE TABLE IF NOT EXISTS "bankQuestion" (
	"questionId" UUID NOT NULL DEFAULT gen_random_uuid(),
	"content" TEXT NOT NULL,
	"subjectId" UUID NOT NULL,
	PRIMARY KEY("questionId")
);

CREATE TABLE IF NOT EXISTS "studentAnswer" (
	"historyId" UUID NOT NULL DEFAULT gen_random_uuid(),
	"content" TEXT NOT NULL,
	"wordCount" INTEGER NOT NULL,
	"reportId" UUID UNIQUE NULL,
	PRIMARY KEY("historyId")
);

CREATE TABLE IF NOT EXISTS "major" (
	"majorId" UUID NOT NULL DEFAULT gen_random_uuid(),
	"majorCode" VARCHAR(10) NOT NULL,
	"majorName" TEXT NOT NULL,
	PRIMARY KEY("majorId")
);

CREATE TABLE IF NOT EXISTS "reportAI" (
	"reportId" UUID NOT NULL DEFAULT gen_random_uuid(),
	"stylometryId" UUID NOT NULL UNIQUE,
	"perplexity" TEXT NOT NULL,
	"burstiness" TEXT NOT NULL,
	"statusFlag" VARCHAR(10) NOT NULL,
	PRIMARY KEY("reportId")
);

CREATE TABLE IF NOT EXISTS "subjectMajor" (
	"majorId" UUID NOT NULL,
	"subjectId" UUID NOT NULL,
	PRIMARY KEY("majorId", "subjectId")
);

COMMENT ON TABLE "subjectMajor" IS 'Bảng phụ';

CREATE TABLE IF NOT EXISTS "stylometry" (
	"stylometryId" UUID NOT NULL DEFAULT gen_random_uuid(),
	"vocabulary" JSONB NOT NULL,
	"grammar" JSONB NOT NULL,
	"mistake" JSONB NOT NULL,
	"express" JSONB NOT NULL,
	PRIMARY KEY("stylometryId")
);

ALTER TABLE "user"
ADD FOREIGN KEY("roleId") REFERENCES "role"("roleId")
ON UPDATE NO ACTION ON DELETE NO ACTION;
ALTER TABLE "teacher"
ADD FOREIGN KEY("teacherId") REFERENCES "user"("userId")
ON UPDATE NO ACTION ON DELETE NO ACTION;
ALTER TABLE "student"
ADD FOREIGN KEY("studentId") REFERENCES "user"("userId")
ON UPDATE NO ACTION ON DELETE NO ACTION;
ALTER TABLE "bankQuestion"
ADD FOREIGN KEY("subjectId") REFERENCES "subject"("subjectId")
ON UPDATE CASCADE ON DELETE NO ACTION;
ALTER TABLE "history"
ADD FOREIGN KEY("examId") REFERENCES "exam"("examId")
ON UPDATE NO ACTION ON DELETE NO ACTION;
ALTER TABLE "studentAnswer"
ADD FOREIGN KEY("reportId") REFERENCES "reportAI"("reportId")
ON UPDATE NO ACTION ON DELETE NO ACTION;
ALTER TABLE "reportAI"
ADD FOREIGN KEY("stylometryId") REFERENCES "stylometry"("stylometryId")
ON UPDATE NO ACTION ON DELETE NO ACTION;
ALTER TABLE "subjectMajor"
ADD FOREIGN KEY("majorId") REFERENCES "major"("majorId")
ON UPDATE NO ACTION ON DELETE NO ACTION;
ALTER TABLE "subjectMajor"
ADD FOREIGN KEY("subjectId") REFERENCES "subject"("subjectId")
ON UPDATE NO ACTION ON DELETE NO ACTION;
ALTER TABLE "exam"
ADD FOREIGN KEY("questionId") REFERENCES "bankQuestion"("questionId")
ON UPDATE NO ACTION ON DELETE NO ACTION;
ALTER TABLE "exam"
ADD FOREIGN KEY("subjectId") REFERENCES "subject"("subjectId")
ON UPDATE NO ACTION ON DELETE NO ACTION;
ALTER TABLE "student"
ADD FOREIGN KEY("majorId") REFERENCES "major"("majorId")
ON UPDATE NO ACTION ON DELETE NO ACTION;
ALTER TABLE "teacher"
ADD FOREIGN KEY("subjectId") REFERENCES "subject"("subjectId")
ON UPDATE NO ACTION ON DELETE NO ACTION;
ALTER TABLE "studentAnswer"
ADD FOREIGN KEY("historyId") REFERENCES "history"("historyId")
ON UPDATE NO ACTION ON DELETE NO ACTION;
ALTER TABLE "history"
ADD FOREIGN KEY("gradeBy") REFERENCES "teacher"("teacherId")
ON UPDATE NO ACTION ON DELETE NO ACTION;
ALTER TABLE "exam"
ADD FOREIGN KEY("createdBy") REFERENCES "teacher"("teacherId")
ON UPDATE NO ACTION ON DELETE NO ACTION;
ALTER TABLE "history"
ADD FOREIGN KEY("studentId") REFERENCES "student"("studentId")
ON UPDATE NO ACTION ON DELETE NO ACTION;