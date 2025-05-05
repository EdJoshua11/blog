"use client"

import { ArrowLeft, Calendar, ChevronLeft, ChevronRight } from "lucide-react"
import ImageCarousel from "./ImageCarousel"
import { blogData } from "../data/blogData"

const BlogPost = ({ post, onBack }) => {
  // Prepare images for the carousel with descriptions
  const carouselImages = [
    {
      image: post.coverImage,
      imageCaption: post.title,
      description: post.summary,
    },
    ...post.fullContent.sections
      .filter((section) => section.image)
      .map((section) => ({
        image: section.image,
        imageCaption: section.title || post.title,
        description: section.imageCaption || section.content.substring(0, 100) + "...",
      })),
  ]

  // Combine all content into a single continuous text
  const combinedContent = post.fullContent.sections.map((section) => section.content).join("\n\n")

  // Find previous and next posts
  const currentIndex = blogData.findIndex((p) => p.day === post.day)
  const prevPost = currentIndex > 0 ? blogData[currentIndex - 1] : null
  const nextPost = currentIndex < blogData.length - 1 ? blogData[currentIndex + 1] : null

  return (
    <div className="blog-post">
      <div className="container">
        <button className="back-button" onClick={onBack}>
          <ArrowLeft size={18} /> Back to all days
        </button>

        <div className="blog-post-header">
          <div className="blog-post-meta">
            <div className="day-badge">Day {post.day}</div>
            <div className="blog-post-date">
              <Calendar size={16} />
              <span>{post.date}</span>
            </div>
          </div>
          <h1>{post.title}</h1>
        </div>

        {carouselImages.length > 0 && (
          <div className="blog-post-carousel">
            <ImageCarousel images={carouselImages} />
          </div>
        )}

        <div className="blog-post-content">
          <p className="blog-post-intro">{post.fullContent.intro}</p>

          <div className="blog-post-body">
            <p>{combinedContent}</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default BlogPost
