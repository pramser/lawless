import { Item, Loadout, Set } from "@prisma/client"

export const ITEM_SORT_METHODS = [
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
]

export const SET_SORT_METHODS = [
  {
    name: "set_a_to_z",
    method: (a: Set, b: Set) => {
      return a.name > b.name ? 1 : -1
    },
  },
  {
    name: "set_by_tier",
    method: (a: Set, b: Set) => {
      return a.tier.toString().localeCompare(b.tier.toString()) || a.name.localeCompare(b.name)
    },
  },
]

export const LOADOUT_SORT_METHODS = [
  {
    name: "loadout_a_to_z",
    method: (a: Loadout, b: Loadout) => {
      return a.name > b.name ? 1 : -1
    },
  },
]
