"use client"

type SortBarParams = {
  children?: React.ReactNode
  selectedSortName: string
  sortButtonOnClick: any
}

export default function SortBar({ children, selectedSortName, sortButtonOnClick }: SortBarParams) {
  return (
    <div className="bg-white bg-opacity-10 flex flex-row items-center justify-between overflow-hidden px-4 py-2 text-white truncate w-fill">
      <div>
        <span className="cursor-default">{selectedSortName}</span>
        <button className="styled-button" onClick={sortButtonOnClick}>
          Sort
        </button>
      </div>
      {children}
    </div>
  )
}
