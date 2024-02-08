-- CreateTable
CREATE TABLE "Loadout" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "name" TEXT NOT NULL,
    "claps" INTEGER NOT NULL DEFAULT 0,
    "firearm_1" INTEGER,
    "firearm_2" INTEGER,
    "melee" INTEGER,
    "grenade" INTEGER,
    "shield_mod" INTEGER,
    "traversal_mod" INTEGER,
    "neck_bomb_mod" INTEGER,
    "lucky_charm" INTEGER,

    CONSTRAINT "Loadout_pkey" PRIMARY KEY ("id")
);
