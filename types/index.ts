import { Item, ItemType, Loadout, Set } from "@prisma/client"

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

export const LOADOUT_SECTIONS = [
  { name: "firearm_1", itemType: ItemType.FIREARM },
  { name: "firearm_2", itemType: ItemType.FIREARM },
  { name: "melee", itemType: ItemType.MELEE },
  { name: "grenade", itemType: ItemType.GRENADE },
  { name: "shield_mod", itemType: ItemType.SHIELD_MOD },
  { name: "traversal_mod", itemType: ItemType.TRAVERSAL_MOD },
  { name: "neck_bomb_mod", itemType: ItemType.NECKBOMB_MOD },
  { name: "lucky_charm", itemType: ItemType.LUCKY_CHARM },
]
