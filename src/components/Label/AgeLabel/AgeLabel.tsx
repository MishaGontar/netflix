import './style.css';
import {useEffect, useRef} from "react";
import {gsap} from "gsap";

export default function AgeLabel() {
    const containerRef = useRef<HTMLDivElement>(null);
    useEffect(() => {
        gsap.fromTo(
            containerRef.current,
            {opacity: 0, x: 120},
            {opacity: 1, x: 0, duration: 2, ease: "power3.out"}
        );
    }, []);
    return (
        <div className="age-label-container" ref={containerRef}>
            <div className="age-label-red-block"/>
            <p className="age-label-text">16+</p>
        </div>
    );
}