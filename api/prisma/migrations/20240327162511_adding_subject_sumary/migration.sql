/*
  Warnings:

  - Added the required column `sumary` to the `subjects` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_reviews" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "subject_id" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,
    "test_rating" TEXT NOT NULL,
    "project_rating" TEXT NOT NULL,
    "teacher_rating" TEXT NOT NULL,
    "effort_rating" TEXT NOT NULL,
    "presence_rating" TEXT NOT NULL,
    "overall_rating" INTEGER NOT NULL,
    "comment" TEXT,
    CONSTRAINT "reviews_subject_id_fkey" FOREIGN KEY ("subject_id") REFERENCES "subjects" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "reviews_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_reviews" ("comment", "effort_rating", "id", "overall_rating", "presence_rating", "project_rating", "subject_id", "teacher_rating", "test_rating", "user_id") SELECT "comment", "effort_rating", "id", "overall_rating", "presence_rating", "project_rating", "subject_id", "teacher_rating", "test_rating", "user_id" FROM "reviews";
DROP TABLE "reviews";
ALTER TABLE "new_reviews" RENAME TO "reviews";
CREATE TABLE "new_subjects" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "teacher_id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "syllabus" TEXT NOT NULL,
    "mode" TEXT NOT NULL,
    "date" TEXT NOT NULL,
    "time" TEXT NOT NULL,
    "semester" INTEGER NOT NULL,
    "workload" INTEGER NOT NULL,
    "sumary" TEXT NOT NULL,
    CONSTRAINT "subjects_teacher_id_fkey" FOREIGN KEY ("teacher_id") REFERENCES "teachers" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_subjects" ("date", "id", "mode", "name", "semester", "syllabus", "teacher_id", "time", "workload") SELECT "date", "id", "mode", "name", "semester", "syllabus", "teacher_id", "time", "workload" FROM "subjects";
DROP TABLE "subjects";
ALTER TABLE "new_subjects" RENAME TO "subjects";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
