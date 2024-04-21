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
    "presence_rating" TEXT NOT NULL DEFAULT '0',
    "teacher_rating" TEXT NOT NULL DEFAULT '0',
    "project_rating" TEXT NOT NULL DEFAULT '0',
    "test_rating" TEXT NOT NULL DEFAULT '0',
    "effort_rating" TEXT NOT NULL DEFAULT '0',
    "overall_rating" INTEGER NOT NULL DEFAULT 0,
    CONSTRAINT "subjects_teacher_id_fkey" FOREIGN KEY ("teacher_id") REFERENCES "teachers" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_subjects" ("date", "id", "mode", "name", "overall_rating", "semester", "syllabus", "teacher_id", "time", "workload") SELECT "date", "id", "mode", "name", "overall_rating", "semester", "syllabus", "teacher_id", "time", "workload" FROM "subjects";
DROP TABLE "subjects";
ALTER TABLE "new_subjects" RENAME TO "subjects";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
