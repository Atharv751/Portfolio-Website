"use client"

import { useRef } from "react"
import { motion, useInView } from "framer-motion"
import { Code, Palette, BarChart, BrainCircuit } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

// Updated services to match the requested skill set
const services = [
  {
    title: "Web Development",
    description:
      "Diving into web development with curiosity—building full-stack projects to bridge ideas and real-world functionality.",
    icon: <Code className="h-10 w-10" />,
    gradient: "from-primary to-secondary",
  },
  {
    title: "Python",
    description:
      "Constantly exploring Python to build efficient solutions, automate tasks, and deepen my understanding of programming logic.",
    icon: <Palette className="h-10 w-10" />,
    gradient: "from-secondary to-accent",
  },
  {
    title: "Marketing",
    description:
      "Exploring the art and science of marketing with curiosity, creativity, and a learner’s mindset.",
    icon: <BarChart className="h-10 w-10" />,
    gradient: "from-accent to-primary",
  },
  {
    title: "Competitive Programming",
    description: "Exploring competitive programming to strengthen logic, improve efficiency, and think algorithmically.",
    icon: <BrainCircuit className="h-10 w-10" />,
    gradient: "from-primary to-accent",
  },
]

export default function Services() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.1 })

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
    <section id="services" className="py-20 md:py-32 bg-muted/50">
      <div className="container px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            My <span className="text-primary">Services</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Specialized services tailored to help your projects succeed and stand out
          </p>
        </motion.div>

        <motion.div
          ref={ref}
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="grid grid-cols-1 md:grid-cols-2 gap-6"
        >
          {services.map((service, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              whileHover={{
                y: -10,
                transition: { duration: 0.3 },
              }}
              className="group"
            >
              <Card className="h-full border border-border/50 bg-card/50 backdrop-blur-sm transition-all duration-300 overflow-hidden relative">
                <div
                  className={`absolute inset-0 bg-gradient-to-br ${service.gradient} opacity-0 group-hover:opacity-10 transition-opacity duration-500`}
                ></div>
                <CardHeader className="relative z-10">
                  <div className="mb-4 text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary">
                    {service.icon}
                  </div>
                  <CardTitle className="text-xl md:text-2xl">{service.title}</CardTitle>
                </CardHeader>
                <CardContent className="relative z-10">
                  <CardDescription className="text-muted-foreground text-sm">{service.description}</CardDescription>
                </CardContent>
                <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-transparent to-transparent group-hover:bg-gradient-to-r group-hover:from-primary group-hover:to-secondary transition-all duration-300"></div>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
