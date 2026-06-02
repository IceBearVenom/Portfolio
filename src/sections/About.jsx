import { useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from '@gsap/react';
import * as Card from '../components/Card'
import { Button1 } from '../components/Button';

gsap.registerPlugin(useGSAP);
gsap.registerPlugin(ScrollTrigger);

export const About = () => {

    const aboutRef = useRef();

    const cardRef = useRef();
    
    const cardSrc = [
        { name: "HTML", icon: "./src/assets/icons/html.png" },
        { name: "CSS", icon: "./src/assets/icons/css.png" },
        { name: "JS", icon: "./src/assets/icons/js.png" },
        { name: "React", icon: "./src/assets/icons/react.png" },
        { name: "Python", icon: "./src/assets/icons/python.png" },
        { name: "Photoshop", icon: "./src/assets/icons/photoshop.png" },
        { name: "Ilustrator", icon: "./src/assets/icons/illustrator.png" },
    ];

    const [isMobile, setIsMobile] = useState(false);
    const mm = gsap.matchMedia();

    mm.add("(max-width: 768px)", () => {
        setIsMobile(true);
    });
    
    mm.add("(min-width: 769px)", () => {
        setIsMobile(false);
    });
    
    useGSAP(() => {

        const deg = 20;
        const middle = Math.floor(cardSrc.length / 2);

        gsap.utils
            .toArray(cardRef.current.children)
            .forEach((child, index) => {

                const angle = (index - middle) * deg;

                gsap.to(child, {
                    rotation: angle,
                    ease: "back.inOut(1.7)",

                    scrollTrigger: {
                        id: 'card',
                        trigger: aboutRef.current,
                        start: isMobile ? '70% 80%' : 'top 80%',
                        end: isMobile ? 'bottom 80%' : '80% 80%',
                        scrub: true,
                    },
                });

                child.addEventListener('mouseenter', () => {
                    gsap.to(child, {
                        scale: isMobile ? 1.1 : 1.2,
                        ease: "power1.Out",
                        duration: 0.1,
                    });
                });
                
                child.addEventListener('mouseleave', () => {
                    gsap.to(child, {
                        scale: 1,
                        ease: "power1.Out",
                        duration: 0.1,
                    });
                });

            });
            gsap.to(cardRef.current, {
                top: '30%',
                scrollTrigger: {
                    trigger: cardRef.current,
                    start: 'top 80%',
                    end: 'bottom 80%',
                    scrub: true,
                },
        });

        gsap.fromTo('.story p', {
            opacity: 0,
            translateY: 70,
            filter: 'blur(10px)',
        }, {
            opacity: 1,
            duration: 0.6,
            translateY: 0,
            filter: 'blur(0px)',
            ease: "power1.In",

            scrollTrigger: {
                trigger: '.about',
                start: '40% center',
            },
        })

        return () => mm.revert();

    });

    useGSAP(() => {
        const mm = gsap.matchMedia();

        let transformH1 = ''

        mm.add("(max-width: 768px)", () => {
            transformH1 = 'translateY(0%) rotate(0deg) scaleY(2.5) scaleX(1.7)';
        });
        
        mm.add("(min-width: 769px)", () => {
            transformH1 = 'translateY(0%) rotate(180deg) scaleY(2) scaleX(3)';
        })

        gsap
            .to('h1', {
                duration: 1,
                transform: transformH1,
                scrollTrigger: {
                    trigger: aboutRef.current,
                    start: 'top 80%',
                    end: '80% 80%',
                    scrub: true,
                },
            });
    }, { scope: aboutRef });

    return (
        <section className="about" id="about" ref={aboutRef}> 
            <div className="container about-container">
                <div className="about-content"> 
                    <h1>ABOUT ME</h1>
                    <div className="story">
                        <h2>HI, I'M TRISTAN</h2>
                        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptas, voluptate. lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptas, voluptate. Lorem ipsum dolor sit amet consectetur adipisicing elit. Perferendis doloremque numquam tempore ducimus exercitationem aperiam perspiciatis excepturi nemo placeat blanditiis. Sapiente nihil dolore, doloribus tempora cupiditate quas recusandae? Reprehenderit, doloremque.</p>
                        <Button1 text="Open CV" icon="bi-file-earmark-text-fill" />
                    </div>
                </div>
                <div className="about-image">
                    <div ref={cardRef} className="about-cards">
                        {cardSrc.map((card, index) => (
                            <Card.Type1 key={index} name={card.name} icon={card.icon} />
                        ))}
                    </div>
                    <img className="about-img" src="./src/assets/about.png" alt="about" />
                </div>  
            </div>
        </section>
    )
}