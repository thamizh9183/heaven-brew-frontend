import React, { useState, useEffect } from "react";

function HomePage() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const slides = [
    "/CoffeeImages/hearten beans.jpg",
    "/CoffeeImages/espresso.jpg",
    "/CoffeeImages/Mocha coffee.jpg",
    "/CoffeeImages/macchiatos coffee.jpg"
  ];

  // Change slide every 4 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % slides.length);
    }, 4000);
    return () => clearInterval(interval);
  }, [slides.length]);

  return (
    <div
      style={{
        fontFamily: "'Poppins', sans-serif",
        textAlign: "center",
        color: "#4d2336",
        background: "linear-gradient(135deg, #fff4f9, #c59b7f, #e58518)",
        height: "100vh",
        overflow: "hidden",
        position: "relative",
      }}
    >
      {/* Heading */}
      <header
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          zIndex: 3,
          textShadow: "0 3px 10px rgba(177, 119, 135, 0.6)",
          animation: "float 4s ease-in-out infinite",
        
        }}
      >
       <h1
  style={{
    fontSize: "3rem",
    color: "#8d6744",
    marginBottom: "10px",
  }}
>
  Welcome to Coffee World
</h1>

        <p
          style={{
            fontSize: "1.3rem",
            color: "#cd871d",
            fontStyle: "italic",
            
          }}
        >
          Sweet dreams & Tasty sip.
        </p>
      </header>

      {/* Slideshow Background */}
      <div
        style={{
          position: "absolute",
          width: "100%",
          height: "100%",
          overflow: "hidden",
          top: 0,
          left: 0,
        }}
      >
        {slides.map((src, index) => (
          <img
            key={index}
            src={src}
            alt={`Slide ${index + 1}`}
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              width: "100%",
              height: "100%",
              objectFit: "cover",
              opacity: index === currentIndex ? 1 : 0,
              transition: "opacity 2s ease-in-out",
              filter: "brightness(0.9)",
            }}
          />
        ))}
      </div>

      {/* Soft Overlay */}
      <div
        style={{
          position: "absolute",
          width: "100%",
          height: "100%",
          background:
            "linear-gradient(to bottom right, rgba(228, 215, 224, 0.4), rgba(239, 224, 232, 0.6))",
          zIndex: 1,
        }}
      ></div>
    </div>
  );
}

export default HomePage;
