// components
import LoadoutList from "@/LoadoutList"

// revalidate every hour
export const revalidate = 3600

export default async function Loadouts() {
  return <LoadoutList />
}
