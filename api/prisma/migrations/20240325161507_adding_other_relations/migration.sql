/*
  Warnings:

  - You are about to drop the column `name` on the `subjects` table. All the data in the column will be lost.
  - Added the required column `date` to the `subjects` table without a default value. This is not possible if the table is not empty.
  - Added the required column `mode` to the `subjects` table without a default value. This is not possible if the table is not empty.
  - Added the required column `nome` to the `subjects` table without a default value. This is not possible if the table is not empty.
  - Added the required column `semester` to the `subjects` table without a default value. This is not possible if the table is not empty.
  - Added the required column `syllabus` to the `subjects` table without a default value. This is not possible if the table is not empty.
  - Added the required column `teacher_id` to the `subjects` table without a default value. This is not possible if the table is not empty.
  - Added the required column `time` to the `subjects` table without a default value. This is not possible if the table is not empty.

*/
-- CreateTable
CREATE TABLE "teachers" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "nome" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "reviews" (
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
    CONSTRAINT "reviews_subject_id_fkey" FOREIGN KEY ("subject_id") REFERENCES "subjects" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "reviews_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_subjects" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "teacher_id" TEXT NOT NULL,
    "nome" TEXT NOT NULL,
    "syllabus" TEXT NOT NULL,
    "mode" TEXT NOT NULL,
    "date" TEXT NOT NULL,
    "time" TEXT NOT NULL,
    "semester" INTEGER NOT NULL,
    CONSTRAINT "subjects_teacher_id_fkey" FOREIGN KEY ("teacher_id") REFERENCES "teachers" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_subjects" ("id") SELECT "id" FROM "subjects";
DROP TABLE "subjects";
ALTER TABLE "new_subjects" RENAME TO "subjects";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
