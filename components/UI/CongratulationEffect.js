import React from "react";
import ReactCanvasConfetti from "react-canvas-confetti";

const canvasStyles = {
    position: "fixed",
    pointerEvents: "none",
    width: "100%",
    height: "100%",
    top: 0,
    left: 0,
};

const CongratulationEffect = ({ getInstance }) => {
    return <ReactCanvasConfetti refConfetti={getInstance} style={canvasStyles} />;
};


export default CongratulationEffect;



