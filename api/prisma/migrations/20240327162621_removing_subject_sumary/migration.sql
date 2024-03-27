/*
  Warnings:

  - You are about to drop the column `sumary` on the `subjects` table. All the data in the column will be lost.

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
    CONSTRAINT "subjects_teacher_id_fkey" FOREIGN KEY ("teacher_id") REFERENCES "teachers" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_subjects" ("date", "id", "mode", "name", "semester", "syllabus", "teacher_id", "time", "workload") SELECT "date", "id", "mode", "name", "semester", "syllabus", "teacher_id", "time", "workload" FROM "subjects";
DROP TABLE "subjects";
ALTER TABLE "new_subjects" RENAME TO "subjects";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
