"use client"

// react
import { useState, useEffect } from "react"
import Link from "next/link"

// components
import Item from "./Item"
import SortBar from "./SortBar"

// types
import { ITEM_SORT_METHODS } from "types"

interface ItemListProps {}

export default function ItemList({}: ItemListProps) {
  const [items, setItems] = useState([])
  const [isRequested, setIsRequested] = useState(false)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    fetch(`/api/items?isRequested=${isRequested}`)
      .then((res) => res.json())
      .then((data) => {
        setItems(data)
        setIsLoading(false)
      })
  }, [isRequested])

  const [selectedSortIndex, setSelectedSortIndex] = useState(0)
  let selectedSortMethod = ITEM_SORT_METHODS[selectedSortIndex].method

  const selectNextSortMethod = () => {
    var next = selectedSortIndex + 1
    setSelectedSortIndex(next === ITEM_SORT_METHODS.length ? 0 : next)
  }

  if (isLoading) {
    return <div>Loading...</div>
  }

  return (
    <section className="m-4">
      <SortBar selectedSortName={ITEM_SORT_METHODS[selectedSortIndex].name} sortButtonOnClick={selectNextSortMethod}>
        <button onClick={() => setIsRequested(!isRequested)}>Show Requests</button>
        <Link href="/items/new">New Item</Link>
      </SortBar>
      <div className="flex flex-row flex-wrap">
        {items.sort(selectedSortMethod).map((item: any) => (
          <Item key={item.id} item={item} />
        ))}
      </div>
    </section>
  )
}
