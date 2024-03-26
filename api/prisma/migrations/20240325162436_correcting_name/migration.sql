/*
  Warnings:

  - You are about to drop the column `nome` on the `subjects` table. All the data in the column will be lost.
  - You are about to drop the column `nome` on the `teachers` table. All the data in the column will be lost.
  - Added the required column `name` to the `subjects` table without a default value. This is not possible if the table is not empty.
  - Added the required column `workload` to the `subjects` table without a default value. This is not possible if the table is not empty.
  - Added the required column `name` to the `teachers` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
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
    CONSTRAINT "subjects_teacher_id_fkey" FOREIGN KEY ("teacher_id") REFERENCES "teachers" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_subjects" ("date", "id", "mode", "semester", "syllabus", "teacher_id", "time") SELECT "date", "id", "mode", "semester", "syllabus", "teacher_id", "time" FROM "subjects";
DROP TABLE "subjects";
ALTER TABLE "new_subjects" RENAME TO "subjects";
CREATE TABLE "new_teachers" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL
);
INSERT INTO "new_teachers" ("id") SELECT "id" FROM "teachers";
DROP TABLE "teachers";
ALTER TABLE "new_teachers" RENAME TO "teachers";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
