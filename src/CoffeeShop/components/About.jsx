import React from "react";
import "./about.css";

function About() {
  return (
    <div className="about-page">
      {/* Header Section */}
      <header className="about-header">
        <h1>CoffeeCup</h1>
        <p className="about-tagline">Where every sip tastes like a dream </p>
      </header>

      {/* About Story */}
      <section className="about-story">
        <div className="story-text">
          <h2>Our Story</h2>
          <p>
            Brew Heaven cafe began as a tiny kitchen dream — a taste of coffee,sweet 
            laughter, and a love for pastel perfection. We handcraft 
            every flavor using pure ingredients and a dash of imagination. 
            From  sweet to rich aroma beans, our creations 
            bring smiles to every sip!
          </p>
        </div>
      </section>

      {/* Parallax Image Sections */}
      <div className="parallax img1"></div>
      <div className="parallax img2"></div>
      <div className="parallax img3"></div>
      <div className="parallax img4"></div>
      <div className="parallax img5"></div>
      <div className="parallax img6"></div>

      {/* Our Promise */}
      <section className="about-promise">
        <h2>Our Promise</h2>
        <p>
          Every sip tells a story — crafted with love, joy, and lovely taste. 
          Whether you’re tasting our signature Caramel mocha Delight or 
          classic vanilla iced coffee, you’ll experience happiness in every cup.
        </p>
      </section>

      {/* Footer */}
      <footer className="about-footer">
        © 2026 Brew Heaven cafe — Made with sugar & smiles,Rich aroma.
      </footer>
    </div>
  );
}

export default About;
