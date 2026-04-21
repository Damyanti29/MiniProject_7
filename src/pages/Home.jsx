import { useNavigate } from "react-router-dom";
import { useAuth } from "../AuthContext";
import "./Home.css";
import videoBg from "../assets/background.mp4";

const Home = () => {

  const navigate = useNavigate();
  const { user } = useAuth();

  return (
    <div className="home">

      {/* Background Video */}
      <video autoPlay loop muted className="video-bg">
        <source src={videoBg} type="video/mp4" />
      </video>

      <div className="overlay"></div>

      {/* Hero Section */}
      <div className="hero-container">

        <h1>Skin & Strand 🌸</h1>
        <p>Personalized Skin & Hair Care Solutions</p>

        <button onClick={() => navigate(user ? "/category" : "/register")}>
          {user ? "Get Started" : "Register to Start"}
        </button>

      </div>

      {/* Why Choose Us */}
      <section className="why">

        <h2>Why Choose Us</h2>

        <div className="why-cards">

          <div className="card">
            <h3>AI Powered</h3>
            <p>Smart recommendations for skin & hair problems.</p>
          </div>

          <div className="card">
            <h3>Natural Remedies</h3>
            <p>Solutions based on safe and natural ingredients.</p>
          </div>

          <div className="card">
            <h3>Personalized</h3>
            <p>Advice tailored to your unique beauty needs.</p>
          </div>


        </div>
        
<div className="why-disclaimer">
          Disclaimer: This app provides general skincare and haircare advice.
          Please consult a professional for medical concerns.
        </div>

      </section>

    </div>
  );
};

export default Home;