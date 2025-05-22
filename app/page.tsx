import Hero from "@/components/hero"
import About from "@/components/about"
import Portfolio from "@/components/portfolio"
import Services from "@/components/services"
import Contact from "@/components/contact"
import CursorEffects from "@/app/cursor-effects"

export default function Home() {
  return (
    <main className="min-h-screen bg-background text-foreground">
      <CursorEffects />
      <Hero />
      <About />
      <Portfolio />
      <Services />
      <Contact />
    </main>
  )
}
