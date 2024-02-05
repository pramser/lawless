// components
import ItemList from "@/ItemList"

// revalidate every hour
export const revalidate = 3600

export default async function Home() {
  return <ItemList />
}
