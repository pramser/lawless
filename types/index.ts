import { Item } from "@prisma/client"

export const SORT_METHODS = [
  {
    name: "item_a_to_z",
    method: (a: Item, b: Item) => {
      return a.name > b.name ? 1 : -1
    },
  },
  {
    name: "item_by_rarity",
    method: (a: Item, b: Item) => {
      return a.rarity.localeCompare(b.rarity) || a.name.localeCompare(b.name)
    },
  },
  {
    name: "item_by_type",
    method: (a: Item, b: Item) => {
      return a.itemType.localeCompare(b.itemType) || a.itemSubType.localeCompare(b.itemSubType)
    },
  },
  {
    name: "created_old_to_new",
    method: (a: Item, b: Item) => {
      return a.createdAt > b.createdAt ? 1 : -1
    },
  },
  {
    name: "created_new_to_old",
    method: (a: Item, b: Item) => {
      return a.createdAt < b.createdAt ? 1 : -1
    },
  },
]
