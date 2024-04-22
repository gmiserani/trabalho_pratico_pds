-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_teachers" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "picture" TEXT NOT NULL DEFAULT '${name}.png'
);
INSERT INTO "new_teachers" ("id", "name", "picture") SELECT "id", "name", coalesce("picture", '${name}.png') AS "picture" FROM "teachers";
DROP TABLE "teachers";
ALTER TABLE "new_teachers" RENAME TO "teachers";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
