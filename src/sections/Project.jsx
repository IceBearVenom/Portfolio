import gsap from 'gsap';
import { useRef, useState, useEffect } from 'react';
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from '@gsap/react';

import * as Card from '../components/Card';

const projectImages = import.meta.glob(
    "../assets/projects/**/*.{png,jpg,jpeg,webp}",
    { eager: true }
);

const getImage = (path) =>
    projectImages[`../assets/projects/${path}`].default;

const data = [
        {
            "id": 1,
            "title": "BMI Calculator",
            "description": "A simple BMI calculator",
            "image": [
                getImage("bmi-calculator/thumbnail.webp"),
                getImage("bmi-calculator/content-1.webp"),
                getImage("bmi-calculator/content-2.webp"),
            ],
            "url": "https://revou-fundamental-course.github.io/20-jan-25-IceBearVenom/",
            "tags": ["JavaScript", "HTML", "CSS"],
            "category": ""
        },
        {
            "id": 2,
            "title": "Home Decor Store",
            "description": "An e-commerce website for a home decor business",
            "image": [
                getImage("home-decor/thumbnail.webp"),
                getImage("home-decor/content-1.webp"),
            ],
            "url": "https://iberstudio.github.io/Home-Decor/",
            "tags": ["JavaScript", "HTML", "CSS"],
            "category": ""
        },
        {
            "id": 3,
            "title": "Wedding Invitation",
            "description": "A wedding invitation website",
            "image": [
                getImage("wedding-invitation/thumbnail.webp"),
                getImage("wedding-invitation/content-1.webp"),
            ],
            "url": "https://iberstudio.github.io/Wedding-Invitation/",
            "tags": ["JavaScript", "HTML", "CSS", "GSAP"],
            "category": "featured"
        },
        {
            "id": 4,
            "title": "Sociology Mini Quiz App",
            "description": "Just a sociology class project assignment",
            "image": [
                getImage("mini-quiz/thumbnail.webp"),
            ],
            "url": "https://icebearvenom.github.io/Quiz-Sosiologi/",
            "tags": ["JavaScript", "HTML", "CSS"],
            "category": ""
        }
    ]

export const Project = () => {

    const iconsRef = useRef([]);
    const indicatorRef = useRef();
    const [active, setActive] = useState(1);

    const moveIndicator = (index) => {
        const icon = iconsRef.current[index];

        gsap
            .to(indicatorRef.current, {
                left: icon.offsetLeft + icon.offsetWidth / 2,
                opacity: 1,
                duration: 0.3,
                ease: "power2.out",
            });
    };

    useEffect(() => {
        if (iconsRef.current[0]) {
            moveIndicator(0);
        }
    }, []);
    
    const checkCategory = (category) => {
        if (active === 1) return true;
        if (active === 2) return category === "featured";
        if (active === 3) return category === "video";
    }

    // Data
    let [selectedProject, setSelectedProject] = useState(null);

    const projectClicked = (project) => {
        setSelectedProject(project);
    }

    // Responsive

    const [currentIndex, setCurrentIndex] = useState(0);
    const previewRef = useRef();

    const handleScroll = () => {
        const container = previewRef.current;

        const index = Math.round(
        container.scrollLeft / container.clientWidth
        );

        setCurrentIndex(index);
    };

    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        const mm = gsap.matchMedia();

        mm.add("(max-width: 768px)", () => {
            setIsMobile(true);

            return () => setIsMobile(false);
        });

        return () => mm.revert();
    }, []);

    return (
        <section className="project" id="project">
            <div className="container project-container">
                {isMobile && (
                    <div className="project-pagination">
                        {previewRef.current &&
                            Array.from(data).map((child, index) => (
                                <span
                                    key={index}
                                    className={index === currentIndex ? "active" : ""}
                                />
                            ))
                        }
                    </div>
                )}
                <div className="project-list">
                    <div className="category">
                        <i
                            ref={el => iconsRef.current[0] = el}
                            className={`bi bi-grid-fill ${active === 1 ? "active" : ""}`}
                            id="all"
                            onClick={() => {moveIndicator(0); setActive(1)}}
                        />
                        <i
                            ref={el => iconsRef.current[1] = el}
                            className={`bi bi-bookmark-star-fill ${active === 2 ? "active" : ""}`}
                            id="featured"
                            onClick={() => {moveIndicator(1); setActive(2)}}
                        />
                        <i
                            ref={el => iconsRef.current[2] = el}
                            className={`bi bi-file-play-fill ${active === 3 ? "active" : ""}`}
                            id="video"
                            onClick={() => {moveIndicator(2); setActive(3)}}
                        />
                        <span ref={indicatorRef} className="indicator" />
                    </div>
                    <div className="projects">
                        {data.map(project => (
                            checkCategory(project.category) && (
                                <Card.Type3 
                                    key={project.id}
                                    name={project.title}
                                    img={project.image[0]}
                                    onSelect={() => projectClicked(project)}
                                />
                            )
                        ))}
                    </div>
                </div>
                <div 
                    ref={previewRef} 
                    className="preview"
                    onScroll={handleScroll}
                >
                    {isMobile ? (
                        data.map(project => {
                            return (
                                <Card.Type2
                                    key={project.title}
                                    name={project.title}
                                    img={project.image}
                                    description={project.description}
                                    preview={project.url}
                                    tags={project.tags}
                                />
                            );
                        })
                    ) : (
                        selectedProject ? (
                            <Card.Type2
                                name={selectedProject.title}
                                img={selectedProject.image}
                                description={selectedProject.description}
                                preview={selectedProject.url}
                                tags={selectedProject.tags}
                            />
                        ) : (
                            <div className="empty-preview">
                                <h2>Select a project to see the preview</h2>
                            </div>
                        )
                    )}
                </div>
                <div className="title">
                    <h1>PROJECT</h1>
                </div>
                
            </div>
        </section>  
    )
}