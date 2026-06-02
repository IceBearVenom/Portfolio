import { useEffect, useState, useRef } from "react";
import gsap from 'gsap';
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from '@gsap/react';

export const Navbar = () => {

    const [isTop, setIsTop] = useState(true);

    useEffect(() => {
        const handleScroll = () => {
        setIsTop(window.scrollY <= 0);
        };

        window.addEventListener("scroll", handleScroll);

        return () => {
        window.removeEventListener("scroll", handleScroll);
        };
    }, []);

    // Responsive
    const [isMobile, setIsMobile] = useState(false);

    const icons = {
        home: <i className="bi bi-house-door-fill"></i>,
        about: <i className="bi bi-person-fill"></i>,
        project: <i className="bi bi-briefcase-fill"></i>,
        contact: <i className="bi bi-envelope-fill"></i>,
    }

    let mm = gsap.matchMedia();

    useGSAP(() => {
        const mm = gsap.matchMedia();

        mm.add("(max-width: 768px)", () => {
            setIsMobile(true);
        });

        mm.add("(min-width: 769px)", () => {
            setIsMobile(false);
        });

        return () => mm.revert();
    });

    return (
        <>
        <nav className={isTop ? "navbar" : "navbar scrolled"}>
            <div className="menu left">
                <a href="#home">
                    <span className="base">{isMobile ? icons.home : "Home"}</span>
                    <span className="fill">{isMobile ? icons.home : "Home"}</span>
                </a>
                <a href="#about">
                    <span className="base">{isMobile ? icons.about : "About"}</span>
                    <span className="fill">{isMobile ? icons.about : "About"}</span>
                </a>
            </div>
            <div className="logo">
                <i className="bi bi-bootstrap-fill"></i>
            </div>
            <div className="menu right">
                <a href="#project">
                    <span className="base">{isMobile ? icons.project : "Project"}</span>
                    <span className="fill">{isMobile ? icons.project : "Project"}</span>
                </a>
                <a href="#contact">
                    <span className="base">{isMobile ? icons.contact : "Contact"}</span>
                    <span className="fill">{isMobile ? icons.contact : "Contact"}</span>
                </a>
            </div>
        </nav>
        </>
    )
}