import {ContentRecommendation} from "../../../types/content.interface.ts";
import {useEffect, useRef} from "react";
import {gsap} from "gsap";
import './style.css';

interface Props {
    viewContents: ContentRecommendation[];
}

export default function ContentImagesList({viewContents}: Props) {
    const imagesRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (!imagesRef.current) return;

        gsap.fromTo(
            imagesRef.current.children,
            {opacity: 0, y: -50},
            {opacity: 1, y: 0, duration: 0.5, stagger: 0.1}
        );
    }, []);

    useEffect(() => {
        if (!imagesRef.current) return;

        const images = Array.from(imagesRef.current.children) as HTMLElement[];

        const handleMouseEnter = (event: Event) => {
            const target = event.currentTarget as HTMLElement;
            gsap.to(target, {scale: 1.1, duration: 0.2, rotation: 2});
        };

        const handleMouseLeave = (event: Event) => {
            const target = event.currentTarget as HTMLElement;
            gsap.to(target, {scale: 1, duration: 0.2, rotation: 0});
        };

        images.forEach((image) => {
            image.addEventListener("mouseenter", handleMouseEnter);
            image.addEventListener("mouseleave", handleMouseLeave);
        });

        return () => {
            images.forEach((image) => {
                image.removeEventListener("mouseenter", handleMouseEnter);
                image.removeEventListener("mouseleave", handleMouseLeave);
            });
        };
    }, [viewContents]);

    return (
        <div className="content-image-container" ref={imagesRef}>
            {viewContents.map(film =>
                film.id === -1
                    ? (<div key="empty"/>)
                    : (
                        <img
                            src={film.image.src}
                            alt={film.image.name}
                            key={`${film.id}-${film.name}`}
                        />
                    )
            )}
        </div>
    );
}