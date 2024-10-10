import { Link } from "react-router-dom"; 
import StarIcon from "./StarIcon";
import "../styles/LandingPage.css";
import Banner from "./Banner/Banner";
import Footer from "./common/Footer/Footer";
import Header from "./common/Header/Header";
const LandingPage = () => {
    return (
        <>
            {/* Preloading fonts */}
            <link rel="preconnect" href="https://fonts.gstatic.com/" crossOrigin="" />
            <link
                rel="stylesheet"
                href="https://fonts.googleapis.com/css2?family=Lexend:wght@400;500;700;900&family=Noto+Sans:wght@400;500;700;900&display=swap"
            />
            <title>RetireRight</title>
            <link rel="icon" type="image/x-icon" href="data:image/x-icon;base64," />

            <Header />
      

            <div className="landing-container">
                <div className="content-wrapper">
                {/* Hero Section
                <section className="hero" style={{ backgroundImage: `url(${bg_image})` }}>
                    <h1>Plan your retirement with confidence</h1>
                    <h2>We help you build a personalized plan based on your financial situation and goals. Start planning now.</h2>
                    <Link to="/survey" className="cta-btn">Get Started</Link>
                </section> */}
                <Banner />

                {/* Main Content */}
                <div className="main-content">
                    <h2 className="section-title">Invest in Your Future</h2>

                    {/* Cards Section */}
                    <div className="card-section">
                        <div className="card">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 256 256">
    <path d="M232,208a8,8,0,0,1-8,8H32a8,8,0,0,1-8-8V48a8,8,0,0,1,16,0v94.37L90.73,98a8,8,0,0,1,10.07-.38l58.81,44.11L218.73,90a8,8,0,1,1,10.54,12l-64,56a8,8,0,0,1-10.07.38L96.39,114.29,40,163.63V200H224A8,8,0,0,1,232,208Z" />
</svg>

                            <h3>Personalized Plans</h3>
                            <p>Start with a plan that builds wealth over time.</p>
                        </div>
                        <div className="card">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 256 256">
    <path d="M208,80H176V56a48,48,0,0,0-96,0V80H48A16,16,0,0,0,32,96V208a16,16,0,0,0,16,16H208a16,16,0,0,0,16-16V96A16,16,0,0,0,208,80ZM96,56a32,32,0,0,1,64,0V80H96ZM208,208H48V96H208V208Zm-68-56a12,12,0,1,1-12-12A12,12,0,0,1,140,152Z" />
</svg>

                            <h3>Secure &amp; Private</h3>
                            <p>Your data is protected with industry-standard security.</p>
                        </div>
                        <div className="card">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 256 256">
    <path d="M192,116a12,12,0,1,1-12-12A12,12,0,0,1,192,116ZM152,64H112a8,8,0,0,0,0,16h40a8,8,0,0,0,0-16Zm96,48v32a24,24,0,0,1-24,24h-2.36l-16.21,45.38A16,16,0,0,1,190.36,224H177.64a16,16,0,0,1-15.07-10.62L160.65,208h-57.3l-1.92,5.38A16,16,0,0,1,86.36,224H73.64a16,16,0,0,1-15.07-10.62L46,178.22a87.69,87.69,0,0,1-21.44-48.38A16,16,0,0,0,16,144a8,8,0,0,1-16,0,32,32,0,0,1,24.28-31A88.12,88.12,0,0,1,112,32H216a8,8,0,0,1,0,16H194.61a87.93,87.93,0,0,1,30.17,37c.43,1,.85,2,1.25,3A24,24,0,0,1,248,112Zm-16,0a8,8,0,0,0-8-8h-3.66a8,8,0,0,1-7.64-5.6A71.9,71.9,0,0,0,144,48H112A72,72,0,0,0,58.91,168.64a8,8,0,0,1,1.64,2.71L73.64,208H86.36l3.82-10.69A8,8,0,0,1,97.71,192h68.58a8,8,0,0,1,7.53,5.31L177.64,208h12.72l18.11-50.69A8,8,0,0,1,216,152h8a8,8,0,0,0,8-8Z" />
</svg>

                            <h3>Low Fees</h3>
                            <p>Maximize your savings with low fees.</p>
                        </div>
                    </div>

                    {/* How It Works Section */}
                    <h2 className="section-title">How It Works</h2>
                    <div className="steps-section">
                        <div className="step-card">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 256 256">
    <path d="M200,64V168a8,8,0,0,1-16,0V83.31L69.66,197.66a8,8,0,0,1-11.32-11.32L172.69,72H88a8,8,0,0,1,0-16H192A8,8,0,0,1,200,64Z" />
</svg>

                            <h3>Step 1</h3>
                            <p>Connect your accounts and sync your data securely.</p>
                        </div>
                        <div className="step-card">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 256 256">
    <path d="M140,180a12,12,0,1,1-12-12A12,12,0,0,1,140,180ZM128,72c-22.06,0-40,16.15-40,36v4a8,8,0,0,0,16,0v-4c0-11,10.77-20,24-20s24,9,24,20-10.77,20-24,20a8,8,0,0,0-8,8v8a8,8,0,0,0,16,0v-.72c18.24-3.35,32-17.9,32-35.28C168,88.15,150.06,72,128,72Zm104,56A104,104,0,1,1,128,24,104.11,104.11,0,0,1,232,128Zm-16,0a88,88,0,1,0-88,88A88.1,88.1,0,0,0,216,128Z" />
</svg>

                            <h3>Step 2</h3>
                            <p>Answer a few questions to get started with your plan.</p>
                        </div>
                        <div className="step-card">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 256 256">
    <path d="M48,120a8,8,0,0,0,8-8V40h88V88a8,8,0,0,0,8,8h48v16a8,8,0,0,0,16,0V88a8,8,0,0,0-2.34-5.66l-56-56A8,8,0,0,0,152,24H56A16,16,0,0,0,40,40v72A8,8,0,0,0,48,120ZM160,51.31,188.69,80H160Z" />
</svg>

                            <h3>Step 3</h3>
                            <p>Receive your personalized retirement plan instantly.</p>
                        </div>
                        {/* <div className="step-card">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 256 256">
    <path d="M221.66,133.66l-72,72a8,8,0,0,1-11.32-11.32L196.69,136H40a8,8,0,0,1,0-16H196.69L138.34,61.66a8,8,0,0,1,11.32-11.32l72,72A8,8,0,0,1,221.66,133.66Z" />
</svg>

                            <h3>Step 4</h3>
                            <p>Track and manage your progress with ongoing support.</p>
                        </div> */}
                    </div>

                    {/* Add Spacing Between Sections */}
                    <div className="section-spacing"></div>

                    {/* Testimonials Section */}
                    <h2 className="section-title">What Clients Are Saying</h2>
                    <div className="testimonials">
                        <div className="testimonial">
                            <p>Lucas</p>
                            <div className="rating">
                                <StarIcon />
                                <StarIcon />
                                <StarIcon />
                                <StarIcon />
                                <StarIcon />
                            </div>
                            <p>I’ve been using RetireRight for over a year, and it has transformed how I approach saving for the future.</p>
                        </div>
                        <div className="testimonial">
                            <p>Emma</p>
                            <div className="rating">
                                <StarIcon />
                                <StarIcon />
                                <StarIcon />
                                <StarIcon />
                                <StarIcon />
                            </div>
                            <p>The interface is user-friendly and the customer service is top-notch. I feel confident in my retirement plan!</p>
                        </div>
                        <div className="testimonial">
                            <p>Liam</p>
                            <div className="rating">
                                <StarIcon />
                                <StarIcon />
                                <StarIcon />
                                <StarIcon />
                                <StarIcon />
                            </div>
                            <p>The low fees make RetireRight one of the best choices for long-term savings.</p>
                        </div>
                    </div>

                    {/* FAQ Section */}
                    <h2 className="section-title">Frequently Asked Questions</h2>
                    <div className="faq-section">
                        <details className="faq">
                            <summary>How do I get started?</summary>
                            <p>Getting started is easy. Just sign up for an account, and you can begin planning your retirement immediately.</p>
                        </details>
                        <details className="faq">
                            <summary>How is my personal information protected?</summary>
                            <p>Your personal data is encrypted and stored securely with RetireRight’s state-of-the-art security measures.</p>
                        </details>
                        <details className="faq">
                            <summary>What if my financial situation changes?</summary>
                            <p>RetireRight adapts your plan based on any significant changes in your finances, ensuring you stay on track.</p>
                        </details>
                    </div>
                </div>
                </div>
                <Footer />
            </div>
        </>
    );
};

export default LandingPage;
