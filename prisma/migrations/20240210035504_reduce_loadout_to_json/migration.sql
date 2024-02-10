/*
  Warnings:

  - You are about to drop the column `augments` on the `Loadout` table. All the data in the column will be lost.
  - You are about to drop the column `firearm_1` on the `Loadout` table. All the data in the column will be lost.
  - You are about to drop the column `firearm_2` on the `Loadout` table. All the data in the column will be lost.
  - You are about to drop the column `grenade` on the `Loadout` table. All the data in the column will be lost.
  - You are about to drop the column `lucky_charm` on the `Loadout` table. All the data in the column will be lost.
  - You are about to drop the column `melee` on the `Loadout` table. All the data in the column will be lost.
  - You are about to drop the column `neck_bomb_mod` on the `Loadout` table. All the data in the column will be lost.
  - You are about to drop the column `shield_mod` on the `Loadout` table. All the data in the column will be lost.
  - You are about to drop the column `traversal_mod` on the `Loadout` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Loadout" DROP COLUMN "augments",
DROP COLUMN "firearm_1",
DROP COLUMN "firearm_2",
DROP COLUMN "grenade",
DROP COLUMN "lucky_charm",
DROP COLUMN "melee",
DROP COLUMN "neck_bomb_mod",
DROP COLUMN "shield_mod",
DROP COLUMN "traversal_mod",
ADD COLUMN     "loadout" JSONB,
ADD COLUMN     "version" INTEGER NOT NULL DEFAULT 1;
