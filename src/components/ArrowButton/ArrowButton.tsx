import {HTMLAttributes} from "react";
import AnimatedScale from "../Animations/AnimatedScale/AnimatedScale.tsx";

interface Props extends HTMLAttributes<HTMLImageElement> {
    type: "left" | "right";
    condition: boolean;
}

export default function ArrowButton({type, condition, ...props}: Props) {

    return <AnimatedScale>
        <img src={`/buttons/button-${type}-${condition ? "white" : "gray"}.svg`}
             className={condition ? "cursor-pointer" : ""}
             alt={`arrow-${type}`}
             {...props}/>
    </AnimatedScale>;
}