-- CreateEnum
CREATE TYPE "Rarity" AS ENUM ('COMMON', 'UNCOMMON', 'RARE', 'EPIC', 'LEGENDARY', 'NOTORIOUS', 'INFAMOUS');

-- CreateEnum
CREATE TYPE "ItemType" AS ENUM ('UNKNOWN', 'FIREARM', 'MELEE', 'GRENADE', 'SHIELD_MOD', 'TRAVERSAL_MOD', 'NECKBOMB_MOD', 'LUCKY_CHARM');

-- CreateEnum
CREATE TYPE "ItemSubType" AS ENUM ('NONE', 'ASSAULT_RIFLE', 'HEAVY_WEAPON', 'PISTOL', 'SHOTGUN', 'SMG', 'SNIPER_RIFLE', 'BLUDGEON', 'BLADE', 'WRIST_CANNONS', 'BOOMERANG', 'HARLEY_QUINN_MOD', 'KING_SHARK_MOD', 'CAPTAIN_BOOMERANG_MOD', 'DEADSHOT_MOD');

-- CreateEnum
CREATE TYPE "ItemProgress" AS ENUM ('IDENTIFIED', 'IN_REVIEW', 'COMPLETE');

-- CreateEnum
CREATE TYPE "FireArmManufacturer" AS ENUM ('NONE', 'AMERTEK', 'GCPD_LOCKUP', 'LEXCORP', 'STAR_LABS', 'WAYNE_TECH');

-- CreateEnum
CREATE TYPE "AugmentColor" AS ENUM ('GREEN', 'BLUE', 'PURPLE');

-- CreateTable
CREATE TABLE "Item" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "name" TEXT NOT NULL,
    "itemProgress" "ItemProgress" NOT NULL DEFAULT 'IDENTIFIED',
    "itemType" "ItemType" NOT NULL DEFAULT 'UNKNOWN',
    "itemSubType" "ItemSubType" NOT NULL DEFAULT 'NONE',
    "rarity" "Rarity" NOT NULL DEFAULT 'COMMON',
    "claps" INTEGER NOT NULL DEFAULT 0,
    "intrinsicPerk" TEXT,
    "flavorText" TEXT,
    "stats" JSONB,
    "setId" INTEGER,

    CONSTRAINT "Item_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Set" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "character" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "flavorText" TEXT,
    "requiredItems" INTEGER NOT NULL DEFAULT 1,
    "tier" INTEGER NOT NULL DEFAULT 1,
    "perk" TEXT,

    CONSTRAINT "Set_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Augment" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "description" TEXT NOT NULL,
    "augmentColor" "AugmentColor" NOT NULL DEFAULT 'GREEN',
    "itemType" "ItemType" NOT NULL DEFAULT 'UNKNOWN',

    CONSTRAINT "Augment_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Item" ADD CONSTRAINT "Item_setId_fkey" FOREIGN KEY ("setId") REFERENCES "Set"("id") ON DELETE SET NULL ON UPDATE CASCADE;
