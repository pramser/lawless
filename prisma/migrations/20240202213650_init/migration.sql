-- CreateEnum
CREATE TYPE "Rarity" AS ENUM ('COMMON', 'UNCOMMON', 'RARE', 'EPIC', 'LEGENDARY', 'NOTORIOUS', 'INFAMOUS');

-- CreateEnum
CREATE TYPE "ItemType" AS ENUM ('FIREARM', 'MELEE', 'GRENADE', 'SHIELD_MOD', 'TRAVERSAL_MOD', 'NECKBOMB_MOD', 'LUCKY_CHARM');

-- CreateEnum
CREATE TYPE "FireArmArchetype" AS ENUM ('ASSAULT_RIFLE', 'HEAVY_WEAPON', 'PISTOL', 'SHOTGUN', 'SMG', 'SNIPER_RIFLE');

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
    "itemType" "ItemType" NOT NULL DEFAULT 'FIREARM',
    "rarity" "Rarity" NOT NULL DEFAULT 'COMMON',
    "intrinsicPerk" TEXT,
    "flavorText" TEXT,
    "setId" INTEGER,

    CONSTRAINT "Item_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "FireArm" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "name" TEXT NOT NULL,
    "manufacturer" "FireArmManufacturer" NOT NULL DEFAULT 'NONE',
    "fireArmArch" "FireArmArchetype" NOT NULL DEFAULT 'ASSAULT_RIFLE',
    "reloadTime" DOUBLE PRECISION,
    "damagePerHit" DOUBLE PRECISION,
    "criticalHitDamage" DOUBLE PRECISION,
    "magSize" INTEGER,
    "rateOfFire" DOUBLE PRECISION,
    "itemId" INTEGER NOT NULL,

    CONSTRAINT "FireArm_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Melee" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "name" TEXT NOT NULL,
    "itemId" INTEGER NOT NULL,

    CONSTRAINT "Melee_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Grenade" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "name" TEXT NOT NULL,
    "itemId" INTEGER NOT NULL,

    CONSTRAINT "Grenade_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ShieldMod" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "name" TEXT NOT NULL,
    "itemId" INTEGER NOT NULL,

    CONSTRAINT "ShieldMod_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "TraversalMod" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "name" TEXT NOT NULL,
    "itemId" INTEGER NOT NULL,

    CONSTRAINT "TraversalMod_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "NeckBombMod" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "name" TEXT NOT NULL,
    "itemId" INTEGER NOT NULL,

    CONSTRAINT "NeckBombMod_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "LuckyCharm" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "name" TEXT NOT NULL,
    "itemId" INTEGER NOT NULL,

    CONSTRAINT "LuckyCharm_pkey" PRIMARY KEY ("id")
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
    "setPerk" TEXT,

    CONSTRAINT "Set_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Augment" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "description" TEXT NOT NULL,
    "augmentColor" "AugmentColor" NOT NULL DEFAULT 'GREEN',
    "itemType" "ItemType" NOT NULL DEFAULT 'FIREARM',

    CONSTRAINT "Augment_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_ItemAugments" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_ItemAugments_AB_unique" ON "_ItemAugments"("A", "B");

-- CreateIndex
CREATE INDEX "_ItemAugments_B_index" ON "_ItemAugments"("B");

-- AddForeignKey
ALTER TABLE "Item" ADD CONSTRAINT "Item_setId_fkey" FOREIGN KEY ("setId") REFERENCES "Set"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "FireArm" ADD CONSTRAINT "FireArm_itemId_fkey" FOREIGN KEY ("itemId") REFERENCES "Item"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Melee" ADD CONSTRAINT "Melee_itemId_fkey" FOREIGN KEY ("itemId") REFERENCES "Item"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Grenade" ADD CONSTRAINT "Grenade_itemId_fkey" FOREIGN KEY ("itemId") REFERENCES "Item"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ShieldMod" ADD CONSTRAINT "ShieldMod_itemId_fkey" FOREIGN KEY ("itemId") REFERENCES "Item"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TraversalMod" ADD CONSTRAINT "TraversalMod_itemId_fkey" FOREIGN KEY ("itemId") REFERENCES "Item"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "NeckBombMod" ADD CONSTRAINT "NeckBombMod_itemId_fkey" FOREIGN KEY ("itemId") REFERENCES "Item"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "LuckyCharm" ADD CONSTRAINT "LuckyCharm_itemId_fkey" FOREIGN KEY ("itemId") REFERENCES "Item"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ItemAugments" ADD CONSTRAINT "_ItemAugments_A_fkey" FOREIGN KEY ("A") REFERENCES "Augment"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ItemAugments" ADD CONSTRAINT "_ItemAugments_B_fkey" FOREIGN KEY ("B") REFERENCES "Item"("id") ON DELETE CASCADE ON UPDATE CASCADE;
