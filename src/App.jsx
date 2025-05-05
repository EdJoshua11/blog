"use client"

import { useState, useEffect } from "react"
import { Sun, Moon, MapPin, ChevronRight } from "lucide-react"
import "./App.css"
import BlogCard from "./components/BlogCard"
import BlogPost from "./components/BlogPost"
import { blogData } from "./data/blogData"

function App() {
  const [darkMode, setDarkMode] = useState(false)
  const [selectedDay, setSelectedDay] = useState(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Check if user prefers dark mode
    const prefersDarkMode = window.matchMedia("(prefers-color-scheme: dark)").matches
    setDarkMode(prefersDarkMode)

    // Simulate loading state
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 1000)

    return () => clearTimeout(timer)
  }, [])

  const toggleDarkMode = () => {
    setDarkMode(!darkMode)
    document.documentElement.classList.toggle("dark-mode")
  }

  const handleCardClick = (day) => {
    setIsLoading(true)
    setSelectedDay(day)
    window.scrollTo({ top: 0, behavior: "smooth" })

    // Simulate loading state
    setTimeout(() => {
      setIsLoading(false)
    }, 500)
  }

  const handleBackClick = () => {
    setIsLoading(true)
    setSelectedDay(null)
    window.scrollTo({ top: 0, behavior: "smooth" })

    // Simulate loading state
    setTimeout(() => {
      setIsLoading(false)
    }, 500)
  }

  return (
    <div className={`app ${darkMode ? "dark-mode" : ""}`}>
      <header className="header">
        <div className="container">
          <div className="logo">
            <div className="logo-icon">
              <MapPin size={20} />
            </div>
            <h1>Educational Tour</h1>
          </div>
        </div>
      </header>

      {isLoading ? (
        <div className="loader-container">
          <div className="loader"></div>
        </div>
      ) : (
        <main className="main-content">
          {selectedDay ? (
            <BlogPost post={blogData.find((post) => post.day === selectedDay)} onBack={handleBackClick} />
          ) : (
            <>
              <section className="hero">
                <div className="container">
                  <div className="hero-content">
                    <h1>My Educational Tour Journey</h1>
                    <p>
                      Follow my 7-day adventure through learning and exploration across historical sites, cultural
                      experiences, and natural wonders.
                    </p>
                    <div className="hero-cta">
                      <button className="cta-button" onClick={() => handleCardClick(1)}>
                        Start Reading <ChevronRight size={16} />
                      </button>
                    </div>
                  </div>
                </div>
                <div className="hero-decoration"></div>
              </section>

              <section className="blog-section">
                <div className="container">
                  <div className="section-header">
                    <h2>Daily Experiences</h2>
                    <p>Explore my day-by-day journey through this educational tour</p>
                  </div>
                  <div className="blog-grid">
                    {blogData.map((post) => (
                      <BlogCard key={post.day} post={post} onClick={() => handleCardClick(post.day)} />
                    ))}
                  </div>
                </div>
              </section>
            </>
          )}
        </main>
      )}

      <footer className="footer">
        <div className="container">
          <div className="footer-content">
            <div className="footer-logo">
              <div className="logo-icon">
                <MapPin size={20} />
              </div>
              <span>Educational Tour</span>
            </div>
            <p>&copy; {new Date().getFullYear()} Ed Ladores - cdEducational Tour Blog</p>
            <div className="footer-links">
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default App
