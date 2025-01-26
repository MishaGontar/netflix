import './style.css';
import {useEffect, useRef} from "react";
import {gsap} from "gsap";
import AnimatedTextUp from "../Animations/AnimatedTextUp/AnimatedTextUp.tsx";
import AnimatedScale from "../Animations/AnimatedScale/AnimatedScale.tsx";

export default function Header() {
    const containerRef = useRef<HTMLDivElement>(null);
    const netflixRef = useRef<HTMLImageElement>(null);
    const textRef = useRef<HTMLParagraphElement>(null);
    useEffect(() => {
        gsap.fromTo(netflixRef.current,
            {opacity: 0, x: 100, z: -10},
            {opacity: 1, x: 0, duration: 0.8, ease: "power3.out", stagger: 0.1}
        );
        gsap.fromTo(textRef.current,
            {opacity: 0, x: -100, z: -50},
            {opacity: 1, x: 0, duration: 1, ease: "power3.out", stagger: 0.1}
        );
        gsap.fromTo(
            containerRef.current,
            {opacity: 0, y: -120},
            {opacity: 1, y: 0, duration: 1, ease: "circ.inOut"}
        );

    }, []);
    return (
        <div className="header-container">
            <div className="header-logo-container">
                <AnimatedScale>
                    <img ref={netflixRef} src="/logo/netflix-logo.png" className="header-logo" alt="netflix logo"/>
                </AnimatedScale>
                <img src="/others/select.svg" className="select-logo" alt="select logo"/>
                <p ref={textRef} className="header-date font-kyiv">
                    <AnimatedTextUp text="Friday July 8th"/>
                </p>
            </div>
            <div className="header-avatar-container" ref={containerRef}>
                <AnimatedScale><img src="/buttons/search.png" className="header-search" alt="search"/></AnimatedScale>
                <AnimatedScale><img src="/others/avatar.png" className="header-avatar" alt="avatar"/></AnimatedScale>
            </div>
        </div>
    );
}