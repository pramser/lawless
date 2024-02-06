"use client"

// react
import { useState, useEffect } from "react"

// components
import Item from "./Item"

// types
import { SORT_METHODS } from "types"
import SortBar from "./SortBar"

interface ItemListProps {}

export default function ItemList({}: ItemListProps) {
  const [items, setItems] = useState([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    fetch("/api/items")
      .then((res) => res.json())
      .then((data) => {
        setItems(data)
        setIsLoading(false)
      })
  }, [])

  const [selectedSortIndex, setSelectedSortIndex] = useState(0)
  let selectedSortMethod = SORT_METHODS[selectedSortIndex].method

  const selectNextSortMethod = () => {
    var next = selectedSortIndex + 1
    setSelectedSortIndex(next === SORT_METHODS.length ? 0 : next)
  }

  if (isLoading) {
    return <div>Loading...</div>
  }

  return (
    <section>
      <SortBar selectedSortName={SORT_METHODS[selectedSortIndex].name} sortButtonOnClick={selectNextSortMethod} />
      <div className="flex flex-row flex-wrap">
        {items.sort(selectedSortMethod).map((item: any) => (
          <Item key={item.id} item={item} />
        ))}
      </div>
    </section>
  )
}
