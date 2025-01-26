import {ReactNode, useEffect, useRef} from "react";
import {gsap} from "gsap";

interface Props {
    children: ReactNode;
}

export default function AnimatedScale({children}: Props) {
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const element = containerRef.current;
        if (!element) return;

        const handleMouseEnter = () => {
            gsap.to(element, {
                scale: 1.1,
                duration: 0.2,
                ease: "power3.out",
            });
        };

        const handleMouseLeave = () => {
            gsap.to(element, {
                scale: 1,
                duration: 0.2,
                ease: "power3.out",
            });
        };

        element.addEventListener("mouseenter", handleMouseEnter);
        element.addEventListener("mouseleave", handleMouseLeave);

        return () => {
            element.removeEventListener("mouseenter", handleMouseEnter);
            element.removeEventListener("mouseleave", handleMouseLeave);
        };
    }, []);

    return (
        <div ref={containerRef} style={{display: "inline-block"}}>
            {children}
        </div>
    );
}
