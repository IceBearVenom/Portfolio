import gsap from 'gsap';
import { useRef, useState, useEffect } from 'react';
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from '@gsap/react';

import * as Card from '../components/Card';

import { projects } from '../data/projects.json';

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
                            Array.from(previewRef.current.children).map((child, index) => (
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
                        {projects.map(project => (
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
                        projects.map(project => {
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