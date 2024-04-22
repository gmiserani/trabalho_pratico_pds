-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_teachers" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "picture" TEXT
);
INSERT INTO "new_teachers" ("id", "name", "picture") SELECT "id", "name", "picture" FROM "teachers";
DROP TABLE "teachers";
ALTER TABLE "new_teachers" RENAME TO "teachers";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
