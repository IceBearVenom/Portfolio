import { useRef, useState, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from '@gsap/react';
import { Button1 } from '../components/Button';

export const Contact = () => {

    const nameRef = useRef();
    const emailRef = useRef();
    const messageRef = useRef();

    const handleSubmit = (e) => {
        e.preventDefault();
    };

    useGSAP(() => {
        const mm = gsap.matchMedia();
        mm.add("(max-width: 768px)", () => {
            const parent = document.querySelector(".contact-info");
            parent.querySelectorAll("p").forEach((p) => {
                p.remove();
            })
        });
    }, {});

    return (
        <section className="contact" id="contact" >
            <div className="container contact-container">
                <div className="title">
                    <h2>GET IN TOUCH</h2>
                </div>    
                <div className="contact-content">
                    <h3>Have a question, idea, or opportunity? Feel free to reach out.</h3>
                    <p>As a student, I'm continuously learning and improving my skills through projects and new challenges. Feel free to get in touch for discussions, feedback, or potential collaborations.</p>
                    <div className="contact-info">
                        <div className="info">
                            <i className="bi bi-envelope-fill"></i>
                            <p>4oIYv@example.com</p>
                        </div>
                        <div className="info">
                            <i className="bi bi-geo-alt-fill"></i>
                            <p>123 Main Street, City, State 12345</p>
                        </div>
                        <div className="info">
                            <i className="bi bi-instagram"></i>
                            <p>@your_instagram_handle</p>
                        </div>
                    </div>
                </div>
                <div className="get-in-touch">
                    <form onSubmit={handleSubmit}>
                        <input ref={nameRef} type="text" placeholder="Name" required />
                        <input ref={emailRef} type="email" placeholder="Email" required />
                        <textarea ref={messageRef} placeholder="Message" required />

                        <Button1 text="Send Message" icon="bi-send-fill" />
                    </form>
                </div>
            </div>
        </section>
    )
}