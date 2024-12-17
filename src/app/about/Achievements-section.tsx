"use client"

import * as React from "react"
import { ChevronLeft, ChevronRight, Star } from 'lucide-react'
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

interface Achievement {
  title: string
  description: string
}

const achievements: Achievement[] = [
  {
    title: "Great Manager Awards 2022",
    description: "Companies with Great Manager 2022",
  },
  {
    title: "Economic Times",
    description: "Future Ready Organization Award - 2022",
  },
  {
    title: "Most Inclusive Companies Index (MICI) study",
    description: "100 best companies For Women – 2022, won 7th time consecutively.",
  },
  {
    title: "ET Human Capital Awards.",
    description: "Most Inclusive Companies Index Exemplar 2022",
  },
  {
    title: "Best Workplace for Women 2022",
    description: "Recognized as one of the best workplaces for women in 2022",
  },
  {
    title: "Innovation in HR Technology",
    description: "Award for implementing cutting-edge HR tech solutions",
  },
  {
    title: "Customer Excellence Award",
    description: "Recognized for outstanding customer service in the travel industry",
  },
  {
    title: "Sustainability Initiative of the Year",
    description: "Award for our eco-friendly travel programs and initiatives",
  },
]

export default function AchievementsSection() {
  const [currentIndex, setCurrentIndex] = React.useState(0)
  const [isAnimating, setIsAnimating] = React.useState(false)

  const totalSlides = Math.ceil(achievements.length / 4)

  const nextSlide = () => {
    if (isAnimating) return
    setIsAnimating(true)
    setCurrentIndex((prevIndex) => (prevIndex + 1) % totalSlides)
    setTimeout(() => setIsAnimating(false), 500)
  }

  const previousSlide = () => {
    if (isAnimating) return
    setIsAnimating(true)
    setCurrentIndex((prevIndex) => (prevIndex - 1 + totalSlides) % totalSlides)
    setTimeout(() => setIsAnimating(false), 500)
  }

  return (
    <section className="max-w-7xl mx-auto px-4 py-16 sm:px-6 lg:px-8 bg-transparent">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h2 className="text-4xl font-bold text-gray-900 mb-4">Our Achievements</h2>
          <p className="text-xl text-gray-600">
            The accolades we have received across categories.
          </p>
        </div>
        <div className="flex gap-2">
          <Button
            variant="outline"
            size="icon"
            onClick={previousSlide}
            disabled={isAnimating}
            aria-label="Previous slide"
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <Button
            variant="outline"
            size="icon"
            onClick={nextSlide}
            disabled={isAnimating}
            aria-label="Next slide"
          >
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      </div>

      <div className="relative overflow-hidden">
        <div 
          className="flex transition-transform duration-500 ease-in-out"
          style={{ transform: `translateX(-${currentIndex * 100}%)` }}
        >
          {Array.from({ length: totalSlides }).map((_, slideIndex) => (
            <div key={slideIndex} className="w-full flex-shrink-0">
              <div className="grid grid-cols-2 gap-6 p-0">
                {achievements.slice(slideIndex * 4, slideIndex * 4 + 4).map((achievement, index) => (
                  <Card key={index} className="overflow-hidden">
                    <CardContent className="p-6">
                      <div className="flex items-start gap-4">
                        <div className="w-12 h-12 rounded-full bg-purple-600 flex items-center justify-center flex-shrink-0">
                          <Star className="w-6 h-6 text-white" />
                        </div>
                        <div className="flex-1">
                          <h3 className="text-xl font-semibold text-gray-900 mb-2">
                            {achievement.title}
                          </h3>
                          <p className="text-gray-600 mb-4">
                            {achievement.description}
                          </p>
                          <Button variant="link" className="text-blue-500 p-0">
                            READ MORE
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

