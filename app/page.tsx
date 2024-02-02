import Image from "next/image"

export default function Home() {
  return (
    <main className="flex flex-col min-h-screen sm:flex-row items-center place-content-evenly m-8">
      <div className="bg-brand-purple home-link-box">
        <h1 className="font-bold text-xl">Loot</h1>
      </div>
      <div className="bg-brand-yellow home-link-box">
        <h1 className="font-bold text-xl">Loadouts</h1>
      </div>
      <div className="bg-brand-azure home-link-box">
        <h1 className="font-bold text-xl">Activities</h1>
      </div>
    </main>
  )
}
