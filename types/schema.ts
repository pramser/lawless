// db
import { ItemType, ItemSubType, Manufacturer, Rarity } from "@prisma/client"

// zod
import { z } from "zod"

export const postItem = z.object({
  name: z.string(),
  itemProgress: z.literal("REQUESTED"),
  rarity: z.nativeEnum(Rarity),
  itemType: z.nativeEnum(ItemType),
  itemSubType: z.nativeEnum(ItemSubType),
  manufacturer: z.nativeEnum(Manufacturer),
  setId: z.number().optional(),
  intrinsicPerk: z.string().optional(),
  flavorText: z.string().optional(),
})
