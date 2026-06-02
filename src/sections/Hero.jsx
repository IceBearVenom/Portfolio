import { useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(useGSAP);
gsap.registerPlugin(ScrollTrigger);

export const Hero = ({HeroImage}) => {

    const trackRef = useRef();

    useGSAP(() => {
    gsap.fromTo("h1", {
            xPercent: 150,
        }, {
            xPercent: -220,
            repeat: -1,
            duration: 10,
            ease: "none",
        });
    }, { scope: trackRef });

    return (
        <section className="hero" id="home">
            <div className="container hero-container">
                <div className="hero-image">
                    <img src={HeroImage} alt="hero" />
                    <span></span>
                </div>
                <div className="hero-title">
                    <div ref={trackRef} className="track">
                        <h1 className='back'>COMPUTER SCIENCE</h1>
                        <h1 className='front'>COMPUTER SCIENCE</h1>
                    </div>
                    <h2>Student</h2>
                </div>
                <div className="hero-content">
                    <div className="text">
                        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptas, voluptate. Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptas, voluptate.</p>
                    </div>
                    <div className="cta">
                        <i className="bi bi-instagram">
                            <span className="tooltip">Instagram</span>
                        </i>
                        <i className="bi bi-github">
                            <span className="tooltip">Github</span>
                        </i>
                        <i className="bi bi-linkedin">
                            <span className="tooltip">Linkedin</span>
                        </i>
                        <i className="bi bi-envelope-fill">
                            <span className="tooltip">Email</span>
                        </i>
                    </div>
                </div>
            </div>
        </section>
    )
}