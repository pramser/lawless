"use client"

type SortBarParams = {
  children?: React.ReactNode
  selectedSortName: string
  sortButtonOnClick: any
}

export default function SortBar({ children, selectedSortName, sortButtonOnClick }: SortBarParams) {
  return (
    <div className="bg-white bg-opacity-10 flex flex-row items-center justify-between px-4 py-2 text-white w-fill">
      <div>
        <span className="cursor-default">{selectedSortName}</span>
        <button
          className="bg-indigo-900 hover:bg-blue-700 border border-white rounded-md ml-4 px-2 py-1"
          onClick={sortButtonOnClick}
        >
          sort
        </button>
      </div>
      {children}
    </div>
  )
}
