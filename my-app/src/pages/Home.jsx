import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();

  return (
    <div className="container">
      <h1>Beauty Advisor 💄</h1>
      <p>Personalized Skin & Hair Care</p>
      <button onClick={() => navigate("/category")}>
        Get Started
      </button>
    </div>
  );
};

export default Home;