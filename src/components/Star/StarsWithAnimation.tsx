import Stars, {Props} from './Stars';
import {useEffect, useRef} from "react";
import './style.css';
import {gsap} from "gsap";

export default function StarsWithAnimation(props: Props) {
    const starsRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (!starsRef.current) return;

        gsap.fromTo(
            starsRef.current.children,
            {opacity: 0, x: -150},
            {opacity: 1, x: 0, duration: 0.5, stagger: 0.1}
        );
        Array.from(starsRef.current.children).forEach((star) => {
            const starElement = star as HTMLElement;
            starElement.addEventListener("mouseenter", () => {
                gsap.to(starElement, {scale: 1.2, duration: 0.2, rotation: 5});
            });

            starElement.addEventListener("mouseleave", () => {
                gsap.to(starElement, {scale: 1, duration: 0.2, rotation: 0});
            });
        });
    }, []);
    return (
        <div className="stars-container" ref={starsRef}>
            <Stars {...props}/>
        </div>
    );
}