"use client"

import { motion } from "framer-motion"
import { useInView } from "framer-motion"
import { useRef } from "react"
import Image from "next/image"
import { Badge } from "@/components/ui/badge"
import { Code, BarChart, BrainCircuit, Music, RatIcon as Racquet } from "lucide-react"

// Updated skills with the requested ones
const skills = [
  {
    name: "Web Development",
    icon: <Code className="h-4 w-4 mr-1" />,
    level: 50,
  },
  {
    name: "Marketing",
    icon: <BarChart className="h-4 w-4 mr-1" />,
    level: 50,
  },
  {
    name: "Python",
    icon: <Code className="h-4 w-4 mr-1" />,
    level: 50,
  },
  {
    name: "Data Structures & Algorithms",
    icon: <BrainCircuit className="h-4 w-4 mr-1" />,
    level: 40,
  },
  {
    name: "Piano",
    icon: <Music className="h-4 w-4 mr-1" />,
    level: 60,
  },
  {
    name: "Badminton",
    icon: <Racquet className="h-4 w-4 mr-1" />,
    level: 70,
  },
]

export default function About() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.3 })

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6 },
    },
  }

  return (
    <section id="about" className="py-20 md:py-32 bg-background/50 backdrop-blur-sm">
      <div className="container px-4">
        <motion.div
          ref={ref}
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="grid md:grid-cols-2 gap-12 items-center"
        >
          <motion.div variants={itemVariants} className="relative">
            <div className="absolute -top-4 -left-4 w-24 h-24 bg-primary/10 rounded-full blur-xl" />
            <div className="absolute -bottom-4 -right-4 w-32 h-32 bg-secondary/10 rounded-full blur-xl" />

            <div className="relative aspect-square overflow-hidden rounded-2xl border border-border/50 shadow-xl">
              <Image
                src="Atharv.jpg"
                alt="Profile"
                width={600}
                height={600}
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent"></div>
            </div>
          </motion.div>

          <div>
            <motion.h2 variants={itemVariants} className="text-3xl md:text-4xl font-bold mb-6">
              About <span className="text-primary">Me</span>
            </motion.h2>

            <motion.p variants={itemVariants} className="text-muted-foreground mb-6">
            Hey! I’m Atharv Kumar, a first-year student at Manipal University Jaipur with a passion for web development and programming. I love building clean, responsive websites and enjoy exploring both frontend and backend technologies. I’m always curious about how things work and constantly learning through projects, coding challenges, and new tech stacks.
            </motion.p>

            <motion.p variants={itemVariants} className="text-muted-foreground mb-8">
            Outside of tech, I find balance in playing badminton and expressing creativity through the piano. I thrive on blending logic with imagination and am always excited to connect, collaborate, and take on challenges that push my skills forward.
            </motion.p>

            <motion.h3 variants={itemVariants} className="text-xl font-semibold mb-4">
              Skills & Expertise
            </motion.h3>

            <motion.div variants={containerVariants} className="space-y-4">
              {skills.map((skill, index) => (
                <motion.div key={index} variants={itemVariants} className="space-y-1">
                  <div className="flex justify-between items-center">
                    <Badge variant="secondary" className="px-3 py-1 text-sm flex items-center">
                      {skill.icon}
                      {skill.name}
                    </Badge>
                    <span className="text-sm text-muted-foreground">{skill.level}%</span>
                  </div>
                  <div className="w-full bg-muted rounded-full h-2">
                    <motion.div
                      className="skill-bar"
                      initial={{ width: 0 }}
                      animate={isInView ? { width: `${skill.level}%` } : { width: 0 }}
                      transition={{ duration: 1, delay: 0.2 + index * 0.1 }}
                    />
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
