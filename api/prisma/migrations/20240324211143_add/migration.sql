/*
  Warnings:

  - Added the required column `name` to the `subjects` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_subjects" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL
);
INSERT INTO "new_subjects" ("id") SELECT "id" FROM "subjects";
DROP TABLE "subjects";
ALTER TABLE "new_subjects" RENAME TO "subjects";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
