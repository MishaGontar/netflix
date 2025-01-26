import {HTMLAttributes, useEffect, useRef} from "react";
import {gsap} from "gsap";
import "./style.css";

interface Props extends HTMLAttributes<HTMLSpanElement> {
    text: string;
    divClassName?: string;
}

export default function AnimatedTextUp({text, divClassName, ...props}: Props) {
    const textRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (!textRef.current) return;

        const letters = Array.from(textRef.current.children) as HTMLElement[];

        letters.forEach((letter) => {
            letter.addEventListener("mouseenter", () => {
                gsap.to(letter, {
                    y: -5,
                    fontWeight: "bold",
                    duration: 0.2,
                    ease: "power3.out",
                });
            });

            letter.addEventListener("mouseleave", () => {
                gsap.to(letter, {
                    y: 0,
                    fontWeight: "normal",
                    duration: 0.2,
                    ease: "power3.out",
                });
            });
        });

        return () => {
            letters.forEach((letter) => {
                letter.removeEventListener("mouseenter", () => {
                });
                letter.removeEventListener("mouseleave", () => {
                });
            });
        };
    }, []);

    return (
        <div className={`animated-text ${divClassName ?? ""}`} ref={textRef}>
            {text.split("").map((char, index) => (
                <span key={index} style={{display: "inline-block"}} {...props}>
                    {char === " " ? "\u00A0" : char}
                </span>
            ))}
        </div>
    );
}
