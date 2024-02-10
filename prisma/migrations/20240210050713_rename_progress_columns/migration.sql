/*
  Warnings:

  - You are about to drop the column `itemProgress` on the `Item` table. All the data in the column will be lost.
  - You are about to drop the column `itemProgress` on the `Loadout` table. All the data in the column will be lost.
  - You are about to drop the column `loadout` on the `Loadout` table. All the data in the column will be lost.
  - You are about to drop the column `itemProgress` on the `Set` table. All the data in the column will be lost.

*/
-- CreateEnum
CREATE TYPE "Progress" AS ENUM ('REQUESTED', 'IDENTIFIED', 'IN_REVIEW', 'COMPLETE');

-- AlterTable
ALTER TABLE "Item" DROP COLUMN "itemProgress",
ADD COLUMN     "progress" "Progress" NOT NULL DEFAULT 'IDENTIFIED';

-- AlterTable
ALTER TABLE "Loadout" DROP COLUMN "itemProgress",
DROP COLUMN "loadout",
ADD COLUMN     "data" JSONB,
ADD COLUMN     "progress" "Progress" NOT NULL DEFAULT 'IDENTIFIED';

-- AlterTable
ALTER TABLE "Set" DROP COLUMN "itemProgress",
ADD COLUMN     "progress" "Progress" NOT NULL DEFAULT 'IDENTIFIED';

-- DropEnum
DROP TYPE "ItemProgress";
