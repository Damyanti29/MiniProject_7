import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { getSolution } from "../services/api";
import "./Result.css"; // We will create this for premium recipe styling

const Result = () => {
  const { state } = useLocation();
  const [result, setResult] = useState(null);

  useEffect(() => {
    if (!state) return;

    getSolution(
      state?.category?.id,
      state?.type?.id,
      state?.issue?.id
    ).then(({ data, error }) => {
      if (error) {
        setResult("NO_DATA");
      } else if (data && data.length > 0) {
        setResult(data[0]);
      } else {
        setResult("NO_DATA");
      }
    });
  }, [state]);

  if (!state) {
    return <p className="loading">No data found</p>;
  }

  if (result === "NO_DATA") {
    return (
      <div className="result-container">
        <h2>Your Personal Recommendation ✨</h2>
        <p className="error">No specific remedy found for this unique combination yet.</p>
      </div>
    );
  }

  if (!result) {
    return <div className="result-loading"><div className="spinner"></div><p>Crafting your personal recipe...</p></div>;
  }

  // Smartly format the raw remedy string into distinct preparation steps
  const recipeSteps = result.remedy.split(/(?:\. |\n)/).filter(step => step.trim().length > 3);

  return (
    <div className="result-container">
      <h2 className="result-title">Your Advisor Plan ✨</h2>

      {/* Premium Recipe Card */}
      <div className="remedy-card">
        <div className="remedy-header">
          <h3>🌿 Natural Home Recipe</h3>
          <span className="badge">100% Organic</span>
        </div>
        
        <div className="remedy-content">
          <div className="ingredients-section">
             <h4>What You'll Need:</h4>
             {/* If the DB is pure text, we simulate structured ingredients extraction by picking words, 
                 or we just display the original text emphasizing key ingredient quantities */}
             <p className="ingredient-text">
               {result.remedy}
             </p>
          </div>
          
          <div className="steps-section">
            <h4>Preparation Guide:</h4>
            <ul className="recipe-steps">
              {recipeSteps.length > 1 ? (
                recipeSteps.map((step, index) => (
                  <li key={index}>
                    <span className="step-number">{index + 1}</span>
                    <p>{step.trim() + (step.endsWith('.') ? '' : '.')}</p>
                  </li>
                ))
              ) : (
                // Fallback structured guide if the text is one short sentence
                <>
                  <li><span className="step-number">1</span><p>Gather the ingredients: exactly as prescribed above (e.g., 1 spoon honey, 2 spoons water).</p></li>
                  <li><span className="step-number">2</span><p>Mix thoroughly in a clean glass bowl.</p></li>
                  <li><span className="step-number">3</span><p>Apply gently and leave on for 15-20 minutes.</p></li>
                  <li><span className="step-number">4</span><p>Rinse cleanly with lukewarm water.</p></li>
                </>
              )}
            </ul>
          </div>
        </div>
      </div>

      <h3 className="products-title">🛍️ Recommended Care Products</h3>
      <div className="product-grid">
        {result.solution_products?.length > 0 ? (
          result.solution_products.map((sp, i) => (
            <div key={i} className="product-card premium">
              <div className="img-wrapper">
                <img src={sp.products?.image_url} alt={sp.products?.name} />
              </div>
              <h4>{sp.products?.name}</h4>
              <p className="price">₹{sp.products?.price}</p>
              <a href={sp.products?.link} target="_blank" rel="noreferrer" className="buy-btn">
                Shop Now
              </a>
            </div>
          ))
        ) : (
          <p className="no-products">No specialized products found for this category.</p>
        )}
      </div>
    </div>
  );
};

export default Result;