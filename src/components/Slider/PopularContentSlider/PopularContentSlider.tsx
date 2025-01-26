import {ContentRecommendation} from "../../../types/content.interface.ts";
import ArrowButton from "../../ArrowButton/ArrowButton.tsx";
import './style.css';
import {useEffect, useRef, useState} from "react";
import {gsap} from "gsap";
import ContentImagesList from "../../Content/ContantImagesList/ContentImagesList.tsx";
import AnimatedTextUp from "../../Animations/AnimatedTextUp/AnimatedTextUp.tsx";

interface Props {
    contents: ContentRecommendation[];
}

const clampToZero = (num: number) => num < 0 ? 0 : num;

export default function PopularContentSlider({contents}: Props) {
    const textRef = useRef<HTMLParagraphElement>(null);
    const buttonsRef = useRef<HTMLDivElement>(null);
    const [visibleCount] = useState(window.innerWidth <= 768 ? 1 : 6);
    const [viewContents, setViewContents] = useState<ContentRecommendation[]>(
        contents.slice(clampToZero(contents.length - visibleCount), contents.length)
    );
    const [state, setState] = useState({
        currentIndex: 0,
        isNextExist: contents.length > visibleCount + (visibleCount === 1 ? 1 : 0),
        isPrevExist: false,
    });

    useEffect(() => {
        gsap.fromTo(
            textRef.current,
            {opacity: 0, y: 120},
            {opacity: 1, y: 0, duration: 0.8, ease: "power3.out"}
        );
        if (buttonsRef.current) {
            gsap.fromTo(
                buttonsRef.current.children,
                {opacity: 0, x: 120},
                {opacity: 1, x: 0, duration: 0.8, ease: "elastic.out(1, 0.5)", stagger: 0.1}
            );
        }
    }, []);

    function handleArrowClick(type: "left" | "right", isActive: boolean) {
        if (contents.length < visibleCount || !isActive) return;

        const delta = type === "left" ? -1 : 1;
        const newIndex = state.currentIndex + delta;
        const startIndex = clampToZero(contents.length - (visibleCount + newIndex));

        setState({
            currentIndex: newIndex,
            isPrevExist: newIndex > 0,
            isNextExist: newIndex < contents.length - visibleCount - (visibleCount === 1 ? 1 : 0),
        });
        setViewContents(contents.slice(startIndex, contents.length - newIndex));
    }

    if (!contents || contents.length === 0) {
        return null;
    }

    return (
        <section className="select-none mr-4 sm:mr-0">
            <div className="content-margin popular-content-header-container">
                <p ref={textRef}><AnimatedTextUp text="POPULAR THIS WEEK"/></p>
                <div className="actions-container" ref={buttonsRef}>
                    <ArrowButton onClick={() => handleArrowClick("left", state.isPrevExist)}
                                 type="left"
                                 condition={state.isPrevExist}/>
                    <ArrowButton onClick={() => handleArrowClick("right", state.isNextExist)}
                                 type="right"
                                 condition={state.isNextExist}/>
                </div>
            </div>
            <ContentImagesList viewContents={viewContents}/>
        </section>
    );
}