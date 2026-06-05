import { createFileRoute } from "@tanstack/react-router"

import { Showcase } from "@/components/showcase"

export const Route = createFileRoute("/")({ component: Home })

function Home() {
  return <Showcase />
}
