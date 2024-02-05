-- CreateEnum
CREATE TYPE "Manufacturer" AS ENUM ('NONE', 'AMERTEK', 'GCPD_LOCKUP', 'LEXCORP', 'STAR_LABS', 'WAYNE_TECH');

-- AlterTable
ALTER TABLE "Item" ADD COLUMN     "manufacturer" "Manufacturer" NOT NULL DEFAULT 'NONE';

-- DropEnum
DROP TYPE "FireArmManufacturer";
