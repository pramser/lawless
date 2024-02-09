-- CreateEnum
CREATE TYPE "Characters" AS ENUM ('HARLEY_QUINN', 'KING_SHARK', 'CAPTAIN_BOOMERANG', 'DEADSHOT');

-- AlterTable
ALTER TABLE "Loadout" ADD COLUMN     "augments" JSONB,
ADD COLUMN     "character" "Characters" NOT NULL DEFAULT 'HARLEY_QUINN';
