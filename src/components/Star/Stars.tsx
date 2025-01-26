export interface Props {
    starsCount: number;
    maxStars?: number;
}

export default function Stars({starsCount, maxStars = 5}: Props) {
    return <>
        {Array.from({length: maxStars}, (_, index) => (
            <img key={`${index}-${starsCount}-star`}
                 className="h-[20px] 2xl:h-[30px]"
                 src={index < starsCount ? "/star/star-filled.svg" : "/star/star-line.svg"}
                 alt={index < starsCount ? "star-full" : "star-empty"}/>
        ))}
    </>;
}