import { useEffect, useState, useRef } from "react";
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from "gsap/ScrollTrigger";

import './App.css'
import './styles/components.css'
import './styles/responsive.css'
import { Loader } from './sections/Loader'
import { Navbar } from './sections/Navbar'
import { Hero } from './sections/Hero'
import { About } from './sections/About'
import { Project } from './sections/Project'
import { Contact } from './sections/Contact'

function App() {

  const footerRef = useRef();

  useGSAP(() => {
    gsap.fromTo(
      footerRef.current,
      { yPercent: 20 },
      {
        yPercent: 0,
        ease: "none",
        scrollTrigger: {
          trigger: document.body,
          start: "bottom bottom",
          end: "max",
          scrub: true,
        },
      }
    );
  });

  return (
    <>
    <Loader />
    <main>
      <Navbar />
      <Hero HeroImage={"./assets/hero.png"} />
      <About />
      <Project />
    </main>
    <footer ref={footerRef}>
      <Contact />
    </footer>
    </>
  )
}

export default App
