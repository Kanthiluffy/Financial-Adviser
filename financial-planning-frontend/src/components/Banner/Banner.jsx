import React from 'react';
import "./banner.css";

const Banner = () => {
    return (
        <div className="landing-page">
            <div className="text-section">
                <h1 className="heading">Your Financial <span>Future</span> Starts Today</h1>
                <p className="description">Plan your retirement with confidence and ease, guided by our expert advice tailored just for you.</p>
                <a href="/survey" className="cta-btn">Get Started</a>
            </div>
            <div className="image-section">
                <img src={require("../../assets/images/figma_pig-removebg-preview.png")} alt="Financial planning illustration" className="image" />
            </div>
        </div>
    );
};

export default Banner;
