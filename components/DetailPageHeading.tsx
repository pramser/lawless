import { Oswald } from "next/font/google"
import BackButton from "./BackButton"

const oswald = Oswald({
  weight: "400",
  subsets: ["latin"],
})

export default function DetailPageHeading({ children }: { children: React.ReactNode }) {
  return (
    <div className="border-b-2 flex flex-row justify-between mx-2 my-4">
      <h1
        className="font-medium text-3xl max-w-64 sm:max-w-fit text-ellipsis truncate uppercase whitespace-nowrap"
        style={oswald.style}
      >
        {children}
      </h1>
      <BackButton />
    </div>
  )
}
