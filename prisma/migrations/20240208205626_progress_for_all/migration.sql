-- AlterEnum
ALTER TYPE "ItemProgress" ADD VALUE 'REQUESTED';

-- AlterTable
ALTER TABLE "Loadout" ADD COLUMN     "itemProgress" "ItemProgress" NOT NULL DEFAULT 'IDENTIFIED';

-- AlterTable
ALTER TABLE "Set" ADD COLUMN     "itemProgress" "ItemProgress" NOT NULL DEFAULT 'IDENTIFIED';
