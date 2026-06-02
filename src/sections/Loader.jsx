import { useEffect, useState } from "react";
import gsap from 'gsap';
import { useRef } from 'react';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(useGSAP);

export const Loader = () => {

    // Spinner Animation
    const cardSpinner = useRef();

    const cardAmount = 15;

    const cardTypes = [
        { color: "black", icon: "bi-suit-club-fill" },
        { color: "red", icon: "bi-suit-diamond-fill" },
        { color: "red", icon: "bi-suit-heart-fill" },
        { color: "black", icon: "bi-suit-spade-fill" },
    ];

    useGSAP(() => {
        gsap.utils
            .toArray(cardSpinner.current.children)
            .forEach((child, index) => {

                const angle = (index / cardAmount) * 360;
                const tl = gsap.timeline({
                    repeat: -1,
                })
                tl.set(child, {
                    translateY: '-150%',
                })
                tl.to(child, {
                    rotation: angle,
                    transformOrigin: '50% 200%',
                    ease: "back.inOut(1.7)",
                    duration: 1,
                })
                tl.to(child, {
                    rotation: 360,
                    ease: "back.inOut(1.7)",
                    duration: 1,
                })
            });
    }, { scope: cardSpinner });

    // Loader Animation
    const sectionRef = useRef();

    useGSAP(() => {
        document.body.style.overflow = "hidden";
        gsap.to(sectionRef.current, {
            opacity: 0,
            duration: 1,
            delay: 0.1,
            onComplete: () => {
                sectionRef.current.remove();
                document.body.style.overflow = "auto";
            }
        });

    });

    const loaderText = useRef();

    useGSAP(() => {

        const text = "Loading...";
        let current = " ";

        gsap.to({}, {
            duration: 3,

            onUpdate() {

                const progress = this.progress();

                const length =
                    Math.floor(progress * text.length);

                loaderText.current.textContent =
                    text.slice(0, length);
            }
        });

    });

    return (
        <>
        <div ref={sectionRef} className="loader">
            <div className="loader-wrapper">
                <div className="loader-content">
                    <div className="loader-icon">
                        <i className="bi bi-bootstrap-fill"></i>
                    </div>
                    <div ref={cardSpinner} className="spinner">
                        {Array.from({ length: cardAmount }, (_, index) => {
                            const card = cardTypes[index % cardTypes.length];
                            return (
                                <span
                                    key={index}
                                    className={`bi ${card.icon}`}
                                    style={{
                                        color: card.color,
                                        "--i": index
                                    }}
                                />
                            );
                        })}
                    </div>
                    <div ref={loaderText} className="loader-text">
                        Loading...
                    </div>
                </div>
            </div>
        </div>
        </>
    )
}