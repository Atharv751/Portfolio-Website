"use client"

import { useState, useRef } from "react"
import { motion, useInView } from "framer-motion"
import Image from "next/image"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ExternalLink } from "lucide-react"

// Sample portfolio projects
const projects = [
  {
    id: 1,
    title: "KrishiMart",
    category: "Web Development",
    image: "Krishimart.jpg",
    description: "An e-commerce platform aimed at empowering farmers by connecting them directly with buyers for fresh and affordable produce.",
    tags: ["Web Development", "UI/UX", "E-commerce"],
    link: "#",
  },
  {
    id: 2,
    title: "Marketing",
    category: "Marketing",
    image: "https://muj-sigai-acm.vercel.app/_next/static/media/logo.fb364548.png",
    description:
      "Served as a member of the marketing team at ACM SIGAI during the 2024–2025 tenure, contributing to outreach, branding, and engagement strategies.",
    tags: ["Marketing", "Strategy", "Creative Direction"],
    link: "#",
  },
  {
    id: 3,
    title: "PoolMate",
    category: "Web Development",
    image: "logo.png",
    description: "A smart carpooling platform designed to connect daily commuters with safe, eco-friendly, and cost-effective shared rides.",
    tags: ["Web Development", "Corporate", "Responsive"],
    link: "#",
  },
]

export default function Portfolio() {
  const [selectedProject, setSelectedProject] = useState(null)
  const [filter, setFilter] = useState("All")
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.1 })

  const categories = ["All", ...new Set(projects.map((project) => project.category))]

  const filteredProjects = filter === "All" ? projects : projects.filter((project) => project.category === filter)

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
    <section id="portfolio" className="py-20 md:py-32 bg-background">
      <div className="container px-4">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            My <span className="text-primary">Portfolio</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Dive into a curated collection of my recent projects that highlight both my technical expertise and innovative design thinking.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="flex flex-wrap justify-center gap-2 mb-12"
        >
          {categories.map((category, index) => (
            <Button
              key={index}
              variant={filter === category ? "default" : "outline"}
              size="sm"
              onClick={() => setFilter(category)}
              className="mb-2"
            >
              {category}
            </Button>
          ))}
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {filteredProjects.map((project) => (
            <Dialog key={project.id}>
              <DialogTrigger asChild>
                <motion.div
                  variants={itemVariants}
                  whileHover={{ y: -10, transition: { duration: 0.3 } }}
                  className="group relative overflow-hidden rounded-xl border border-border/50 bg-card shadow-lg cursor-pointer"
                >
                  <div className="aspect-[4/3] overflow-hidden">
                    <Image
                      src={project.image || "/placeholder.svg"}
                      alt={project.title}
                      width={800}
                      height={600}
                      className="object-cover w-full h-full transition-transform duration-500 group-hover:scale-110"
                    />
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-6">
                    <h3 className="text-xl font-bold text-white mb-2">{project.title}</h3>
                    <p className="text-white/80 text-sm">{project.category}</p>
                  </div>
                </motion.div>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[700px]">
                <DialogHeader>
                  <DialogTitle className="text-2xl">{project.title}</DialogTitle>
                  <DialogDescription className="text-muted-foreground">{project.category}</DialogDescription>
                </DialogHeader>
                <div className="mt-4">
                  <div className="rounded-lg overflow-hidden mb-6">
                    <Image
                      src={project.image || "/placeholder.svg"}
                      alt={project.title}
                      width={800}
                      height={600}
                      className="w-full object-cover"
                    />
                  </div>
                  <p className="mb-4">{project.description}</p>
                  <div className="flex flex-wrap gap-2 mb-6">
                    {project.tags.map((tag, index) => (
                      <Badge key={index} variant="secondary">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                  <Button asChild>
                    <a href={project.link} target="_blank" rel="noopener noreferrer" className="flex items-center">
                      View Project <ExternalLink className="ml-2 h-4 w-4" />
                    </a>
                  </Button>
                </div>
              </DialogContent>
            </Dialog>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
