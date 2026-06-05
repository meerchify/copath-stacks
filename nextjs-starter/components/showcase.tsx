"use client"

import { useEffect, useState } from "react"
import { ArrowRight, Check, Moon, Sparkles, Sun } from "lucide-react"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { Switch } from "@/components/ui/switch"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

/**
 * Starter hero + live component showcase.
 *
 * Every color, font and corner radius below comes from the design tokens in the
 * global stylesheet (the active THEME PRESET). Apply a different preset — or edit
 * the `:root` / `.dark` blocks — and this whole page re-themes instantly. It's
 * here so you can SEE the design system before you start building.
 */
export function Showcase() {
  const [dark, setDark] = useState(false)

  // Sync the toggle with whatever already set the theme (the no-flash boot script
  // / next-themes / a previous visit) so it never starts out of step.
  useEffect(() => {
    setDark(document.documentElement.classList.contains("dark"))
  }, [])

  const toggleDark = (next: boolean) => {
    setDark(next)
    document.documentElement.classList.toggle("dark", next)
    // Persist under the same key the boot script + next-themes read.
    try {
      localStorage.setItem("theme", next ? "dark" : "light")
    } catch {
      /* storage unavailable — toggle still works for this session */
    }
  }

  const swatches: { label: string; className: string }[] = [
    { label: "primary", className: "bg-primary" },
    { label: "accent", className: "bg-accent" },
    { label: "chart-1", className: "bg-chart-1" },
    { label: "chart-2", className: "bg-chart-2" },
    { label: "chart-3", className: "bg-chart-3" },
    { label: "chart-4", className: "bg-chart-4" },
    { label: "chart-5", className: "bg-chart-5" },
    { label: "muted", className: "bg-muted" },
  ]

  return (
    <main className="min-h-svh bg-background text-foreground">
      {/* top bar */}
      <header className="mx-auto flex w-full max-w-5xl items-center justify-between px-6 py-5">
        <div className="flex items-center gap-2">
          <span className="grid size-8 place-items-center rounded-lg bg-primary text-primary-foreground">
            <Sparkles className="size-4" />
          </span>
          <span className="font-display text-lg font-semibold tracking-tight">CoPath</span>
        </div>
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <Sun className="size-4" />
          <Switch checked={dark} onCheckedChange={toggleDark} aria-label="Toggle dark mode" />
          <Moon className="size-4" />
        </div>
      </header>

      {/* hero */}
      <section className="mx-auto w-full max-w-5xl px-6 pt-10 pb-14 sm:pt-16">
        <Badge variant="secondary" className="mb-5 gap-1.5 rounded-full px-3 py-1">
          <span className="size-1.5 rounded-full bg-chart-1" />
          Styled by your theme preset
        </Badge>
        <h1 className="font-display text-balance text-5xl font-semibold leading-[1.05] tracking-tight sm:text-6xl">
          Your design system,
          <br />
          <span className="text-chart-1">ready before you write a line.</span>
        </h1>
        <p className="mt-5 max-w-xl text-pretty text-lg text-muted-foreground">
          Colours, fonts and corners all come from semantic tokens. Switch the preset
          and every shadcn/ui component below re-themes at once.
        </p>
        <div className="mt-8 flex flex-wrap items-center gap-3">
          <Button size="lg" className="gap-2">
            Start building <ArrowRight className="size-4" />
          </Button>
          <Button size="lg" variant="outline">
            Browse components
          </Button>
        </div>

        {/* palette */}
        <div className="mt-12 grid grid-cols-4 gap-3 sm:grid-cols-8">
          {swatches.map((s) => (
            <div key={s.label} className="space-y-1.5">
              <div className={`h-12 rounded-lg border border-border ${s.className}`} />
              <p className="truncate text-center text-xs text-muted-foreground">{s.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* component showcase */}
      <section className="mx-auto grid w-full max-w-5xl gap-6 px-6 pb-20 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle className="font-display">Sign in</CardTitle>
            <CardDescription>Inputs, labels and buttons — all token-themed.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-1.5">
              <Label htmlFor="email">Email</Label>
              <Input id="email" type="email" placeholder="you@example.com" />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="password">Password</Label>
              <Input id="password" type="password" placeholder="••••••••" />
            </div>
          </CardContent>
          <CardFooter className="flex-col items-stretch gap-2">
            <Button className="w-full">Continue</Button>
            <Button variant="ghost" className="w-full">
              Create an account
            </Button>
          </CardFooter>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="font-display">Building blocks</CardTitle>
            <CardDescription>Variants, badges and tabs from one palette.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-5">
            <div className="flex flex-wrap gap-2">
              <Button size="sm">Primary</Button>
              <Button size="sm" variant="secondary">
                Secondary
              </Button>
              <Button size="sm" variant="outline">
                Outline
              </Button>
              <Button size="sm" variant="ghost">
                Ghost
              </Button>
              <Button size="sm" variant="destructive">
                Destructive
              </Button>
            </div>
            <div className="flex flex-wrap gap-2">
              <Badge>New</Badge>
              <Badge variant="secondary">Beta</Badge>
              <Badge variant="outline">Docs</Badge>
              <Badge variant="destructive">Live</Badge>
            </div>
            <Separator />
            <Tabs defaultValue="overview">
              <TabsList>
                <TabsTrigger value="overview">Overview</TabsTrigger>
                <TabsTrigger value="activity">Activity</TabsTrigger>
                <TabsTrigger value="settings">Settings</TabsTrigger>
              </TabsList>
              <TabsContent value="overview" className="pt-3 text-sm text-muted-foreground">
                Compose pages from these primitives — they inherit the active preset.
              </TabsContent>
              <TabsContent value="activity" className="pt-3 text-sm text-muted-foreground">
                <ul className="space-y-1.5">
                  <li className="flex items-center gap-2">
                    <Check className="size-4 text-chart-1" /> Tokens wired into Tailwind
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="size-4 text-chart-1" /> Light + dark out of the box
                  </li>
                </ul>
              </TabsContent>
              <TabsContent value="settings" className="pt-3 text-sm text-muted-foreground">
                Swap the preset in App Details — no component edits required.
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </section>
    </main>
  )
}

export default Showcase
