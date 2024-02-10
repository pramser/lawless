// db
import { ItemType, ItemSubType, Manufacturer, Rarity, Characters } from "@prisma/client"

// zod
import { z } from "zod"

export const postItem = z.object({
  name: z.string(),
  progress: z.literal("REQUESTED"),
  rarity: z.nativeEnum(Rarity),
  itemType: z.nativeEnum(ItemType),
  itemSubType: z.nativeEnum(ItemSubType),
  manufacturer: z.nativeEnum(Manufacturer),
  setId: z.number().optional(),
  intrinsicPerk: z.string().optional(),
  flavorText: z.string().optional(),
})

export const postLoadout = z.object({
  name: z.string(),
  progress: z.literal("REQUESTED"),
  character: z.nativeEnum(Characters),
  data: z.string().optional(),
  version: z.coerce.number(),
})
