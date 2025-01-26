import CustomLine from "../../Line/CustomLine.tsx";
import {gsap} from "gsap";
import {useEffect, useRef} from "react";
import './style.css';
import {Serial} from "../../../types/serial.interface.ts";
import StarsWithAnimation from "../../Star/StarsWithAnimation.tsx";
import AnimatedTextUp from "../../Animations/AnimatedTextUp/AnimatedTextUp.tsx";

interface Props {
    serial: Serial;
}

export default function SerialDetails({serial}: Props) {
    const sectionRef = useRef<HTMLTableSectionElement>(null);

    useEffect(() => {
        if (!sectionRef.current) return;

        const elementsToAnimate = Array.from(sectionRef.current.children).filter(
            (child) => !(child as HTMLElement).classList.contains("stars-container")
        );
        gsap.fromTo(
            elementsToAnimate,
            {opacity: 0, x: -50},
            {opacity: 1, x: 0, duration: 0.5, stagger: 0.1}
        );
    }, []);

    return (
        <section className="mt-[30px] 2xl:mt-[50px]" ref={sectionRef}>
            <AnimatedTextUp divClassName="film-details-genre" text={serial.genre.join(" | ")}/>
            <AnimatedTextUp divClassName="film-details-title" text={serial.title}/>
            <div className="film-details-info">
                <AnimatedTextUp text={serial.year.toString()}/>
                <CustomLine/>
                <div className="flex flex-row space-x-1">
                    <AnimatedTextUp text="DIRECTOR:"/>
                    <AnimatedTextUp text={serial.director} className="text-gray"/>
                </div>
                <CustomLine/>
                <div className="flex flex-row space-x-1">
                    <AnimatedTextUp text="seasons:"/>
                    <AnimatedTextUp text={`${serial.seasons} (${serial.episodesInSeason} Episodes)`}
                                    className="text-gray"/>
                </div>
            </div>
            <AnimatedTextUp divClassName="film-details-description text-gray" text={serial.description}/>
            <StarsWithAnimation starsCount={serial.starsCount}/>
            <div className="film-details-buttons">
                <button className="stream-button">
                    <p className="stream-text">STREAM NOW</p>
                    <img src="/buttons/button.svg" alt="play button"/>
                </button>
                <button className="episodes-button">ALL EPISODES</button>
            </div>
        </section>
    );
}