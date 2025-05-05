"use client"

import { useState, useEffect } from "react"
import { ChevronLeft, ChevronRight, X, Maximize2 } from "lucide-react"

const ImageCarousel = ({ images }) => {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isTransitioning, setIsTransitioning] = useState(false)
  const [showModal, setShowModal] = useState(false)

  // Filter out any invalid images to prevent blank slides
  const validImages = images.filter((img) => img && img.image)

  const goToPrevious = () => {
    if (isTransitioning || validImages.length <= 1) return

    setIsTransitioning(true)
    const isFirstImage = currentIndex === 0
    const newIndex = isFirstImage ? validImages.length - 1 : currentIndex - 1
    setCurrentIndex(newIndex)

    setTimeout(() => {
      setIsTransitioning(false)
    }, 500)
  }

  const goToNext = () => {
    if (isTransitioning || validImages.length <= 1) return

    setIsTransitioning(true)
    const isLastImage = currentIndex === validImages.length - 1
    const newIndex = isLastImage ? 0 : currentIndex + 1
    setCurrentIndex(newIndex)

    setTimeout(() => {
      setIsTransitioning(false)
    }, 500)
  }

  // Open image in modal
  const openModal = (e) => {
    e.stopPropagation()
    setShowModal(true)
    document.body.style.overflow = "hidden"
  }

  // Close modal
  const closeModal = () => {
    setShowModal(false)
    document.body.style.overflow = "auto"
  }

  // Auto-advance carousel
  useEffect(() => {
    const interval = setInterval(() => {
      if (!isTransitioning && !showModal && validImages.length > 1) {
        goToNext()
      }
    }, 5000)

    return () => clearInterval(interval)
  }, [currentIndex, isTransitioning, showModal, validImages.length])

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (showModal) {
        if (e.key === "Escape") closeModal()
        if (e.key === "ArrowLeft") goToPrevious()
        if (e.key === "ArrowRight") goToNext()
      }
    }

    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [currentIndex, isTransitioning, showModal])

  if (!validImages || validImages.length === 0) {
    return null
  }

  return (
    <>
      <div className="carousel">
        <div className="carousel-container">
          {validImages.map((image, index) => (
            <div
              key={index}
              className={`carousel-slide ${index === currentIndex ? "active" : ""}`}
              style={{
                transform: `translateX(${(index - currentIndex) * 100}%)`,
                display: Math.abs(index - currentIndex) > 1 ? "none" : "block", // Only render nearby slides
              }}
              onClick={openModal}
            >
              <img
                src={image.image || "/placeholder.svg"}
                alt={image.imageCaption || "Tour image"}
                className="carousel-image"
              />
              <div className="carousel-content">
                <h4>{image.imageCaption || "Tour Highlight"}</h4>
                <p>{image.description || "A moment from our educational tour journey."}</p>
                <button className="expand-button" onClick={openModal} aria-label="View larger image">
                  <Maximize2 size={20} />
                </button>
              </div>
            </div>
          ))}

          {validImages.length > 1 && (
            <>
              <button className="carousel-button prev" onClick={goToPrevious} aria-label="Previous image">
                <ChevronLeft size={24} />
              </button>

              <button className="carousel-button next" onClick={goToNext} aria-label="Next image">
                <ChevronRight size={24} />
              </button>
            </>
          )}
        </div>

        {validImages.length > 1 && (
          <div className="carousel-indicators">
            {validImages.map((_, index) => (
              <button
                key={index}
                className={`carousel-indicator ${index === currentIndex ? "active" : ""}`}
                onClick={() => setCurrentIndex(index)}
                aria-label={`Go to image ${index + 1}`}
              />
            ))}
          </div>
        )}
      </div>

      {/* Image Modal */}
      {showModal && (
        <div className="image-modal" onClick={closeModal}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <button className="modal-close" onClick={closeModal}>
              <X size={24} />
            </button>

            <div className="modal-image-container">
              <img
                src={validImages[currentIndex].image || "/placeholder.svg"}
                alt={validImages[currentIndex].imageCaption || "Tour image"}
                className="modal-image"
              />
            </div>

            <div className="modal-caption">
              <h3>{validImages[currentIndex].imageCaption || "Tour Highlight"}</h3>
              <p>{validImages[currentIndex].description || "A moment from our educational tour journey."}</p>
            </div>

            {validImages.length > 1 && (
              <div className="modal-navigation">
                <button className="modal-nav-button prev" onClick={goToPrevious}>
                  <ChevronLeft size={24} />
                </button>
                <button className="modal-nav-button next" onClick={goToNext}>
                  <ChevronRight size={24} />
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  )
}

export default ImageCarousel
