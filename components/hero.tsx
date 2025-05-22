"use client"

import { useState, useEffect, useRef } from "react"
import { motion } from "framer-motion"
import { ArrowDown } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export default function Hero() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const heroRef = useRef(null)

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY })
    }

    // Create cursor trail elements
    const cursorDot = document.createElement("div")
    cursorDot.className = "cursor-dot"
    document.body.appendChild(cursorDot)

    const cursorTrail = document.createElement("div")
    cursorTrail.className = "cursor-trail"
    document.body.appendChild(cursorTrail)

    // Update cursor trail position
    const updateCursorPosition = (e: MouseEvent) => {
      cursorDot.style.left = `${e.clientX}px`
      cursorDot.style.top = `${e.clientY}px`

      setTimeout(() => {
        cursorTrail.style.left = `${e.clientX}px`
        cursorTrail.style.top = `${e.clientY}px`
      }, 80)
    }

    window.addEventListener("mousemove", handleMouseMove)
    window.addEventListener("mousemove", updateCursorPosition)

    return () => {
      window.removeEventListener("mousemove", handleMouseMove)
      window.removeEventListener("mousemove", updateCursorPosition)
      document.body.removeChild(cursorDot)
      document.body.removeChild(cursorTrail)
    }
  }, [])

  // Parallax effect
  useEffect(() => {
    const handleParallax = (e: MouseEvent) => {
      if (!heroRef.current) return

      const parallaxElements = document.querySelectorAll(".parallax-layer")
      const centerX = window.innerWidth / 2
      const centerY = window.innerHeight / 2
      const deltaX = (e.clientX - centerX) / 50
      const deltaY = (e.clientY - centerY) / 50

      parallaxElements.forEach((element) => {
        const depth = element.classList.contains("parallax-deep")
          ? 0.1
          : element.classList.contains("parallax-medium")
            ? 0.05
            : 0.02

        const x = deltaX * depth
        const y = deltaY * depth

        element.setAttribute("style", `transform: translate(${x}px, ${y}px)`)
      })
    }

    window.addEventListener("mousemove", handleParallax)

    return () => {
      window.removeEventListener("mousemove", handleParallax)
    }
  }, [])

  return (
    <section
      ref={heroRef}
      className="relative h-screen flex flex-col items-center justify-center overflow-hidden parallax"
    >
      {/* Animated background */}
      <div
        className="absolute inset-0 opacity-20 z-0"
        style={{
          background: `radial-gradient(circle at ${mousePosition.x}px ${mousePosition.y}px, hsl(var(--primary)) 0%, transparent 60%)`,
        }}
      />

      {/* Animated gradient orbs */}
      <div className="absolute top-1/4 -left-20 w-80 h-80 bg-primary/20 rounded-full blur-3xl animate-blob parallax-layer parallax-deep" />
      <div className="absolute bottom-1/4 -right-20 w-80 h-80 bg-secondary/20 rounded-full blur-3xl animate-blob animation-delay-2000 parallax-layer parallax-medium" />
      <div className="absolute bottom-1/3 left-1/3 w-80 h-80 bg-accent/20 rounded-full blur-3xl animate-blob animation-delay-4000 parallax-layer parallax-shallow" />

      <div className="container px-4 z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center"
        >
          <motion.h1
            className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight mb-4 bg-clip-text text-transparent bg-gradient-to-r from-primary via-secondary to-accent"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            Code. Create. Connect.
          </motion.h1>

          <motion.p
            className="text-xl md:text-2xl text-muted-foreground mb-8 max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            Turning curiosity into code and creativity into experience.
          </motion.p>

          <motion.div
            className="flex flex-col sm:flex-row gap-4 justify-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            <Button size="lg" asChild>
              <Link href="#portfolio">View Work</Link>
            </Button>
            <Button size="lg" variant="outline" asChild>
              <Link href="#contact">Reach Out</Link>
            </Button>
          </motion.div>
        </motion.div>
      </div>

      <motion.div
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{
          duration: 0.8,
          delay: 1.2,
          repeat: Number.POSITIVE_INFINITY,
          repeatType: "reverse",
          repeatDelay: 0.5,
        }}
      >
        <ArrowDown className="h-8 w-8 text-primary" />
      </motion.div>
    </section>
  )
}
