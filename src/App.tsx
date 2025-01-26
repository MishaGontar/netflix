import './App.css';
import Background from "./components/Background/Background.tsx";
import Header from "./components/Header/Header.tsx";
import AgeLabel from "./components/Label/AgeLabel/AgeLabel.tsx";
import PopularContentSlider from "./components/Slider/PopularContentSlider/PopularContentSlider.tsx";
import {CONTENTS_RECOMMENDATIONS} from "./data/contents.ts";
import SerialDetails from "./components/Content/SerialDetails/SerialDetails.tsx";
import {serial} from "./data/serial.ts";


export default function App() {
    return (
        <div className="main-container">
            <Background/>
            <div className="main-container-content">
                <div className="content-margin">
                    <Header/>
                    <SerialDetails serial={serial}/>
                </div>
                <PopularContentSlider contents={CONTENTS_RECOMMENDATIONS}/>
                <AgeLabel/>
            </div>
        </div>
    );
};