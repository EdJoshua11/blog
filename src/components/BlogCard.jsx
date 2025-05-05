"use client"

import { useState } from "react"
import { ArrowRight, Calendar } from "lucide-react"

const BlogCard = ({ post, onClick }) => {
  const [isHovered, setIsHovered] = useState(false)

  return (
    <div
      className="blog-card"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={onClick}
    >
      <div className="blog-card-image">
        <img src={post.coverImage || "/placeholder.svg"} alt={`Day ${post.day}`} />
        <div className="blog-card-overlay"></div>
        <div className="day-badge">Day {post.day}</div>
      </div>
      <div className="blog-card-content">
        <h3>{post.title}</h3>
        <div className="blog-card-date">
          <Calendar size={14} />
          <span>{post.date}</span>
        </div>
        <p>{post.summary}</p>
        <div className={`read-more ${isHovered ? "visible" : ""}`}>
          <span>Read More</span>
          <ArrowRight size={16} />
        </div>
      </div>
    </div>
  )
}

export default BlogCard
