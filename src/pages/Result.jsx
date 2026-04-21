// import React, { useEffect, useState } from "react";
// import { useLocation, useNavigate } from "react-router-dom";
// import { getSolution } from "../services/api"; // Ensure this path correctly points to your api.js
// import "./Result.css";
// import RemedyAnimation from "../components/RemedyAnimation";

// const Result = () => {
//   const { state } = useLocation();
//   const navigate = useNavigate();
//   const [result, setResult] = useState(null);

//   useEffect(() => {
//     if (!state) return;

//     getSolution(
//       state?.category?.id,
//       state?.type?.id,
//       state?.issue?.id
//     ).then(({ data, error }) => {
//       if (error) {
//         setResult("NO_DATA");
//       } else if (data && data.length > 0) {
//         setResult(data[0]);
//       } else {
//         setResult("NO_DATA");
//       }
//     });
//   }, [state]);

//   if (!state) {
//     return <p className="loading">No data found. Please go back and make a selection.</p>;
//   }

//   if (result === "NO_DATA") {
//     return (
//       <div className="result-container">
//         <h2>Your Personal Recommendation ✨</h2>
//         <p className="error">No specific remedy found for this unique combination yet.</p>
//       </div>
//     );
//   }

//   if (!result) {
//     return (
//       <div className="result-loading">
//         <div className="spinner"></div>
//         <p>Crafting your personal recipe...</p>
//       </div>
//     );
//   }

//   // Smartly format the raw remedy string into distinct preparation steps
//   const recipeSteps = result.remedy.split(/(?:\. |\n)/).filter(step => step.trim().length > 3);

//   return (
//     <div className="result-container">
//       <h2 className="result-title">Your Advisor Plan ✨</h2>

//       {/* Premium Recipe Card */}
//       <div className="remedy-card">
//         <div className="remedy-header">
//           <h3>🌿 Natural Home Recipe</h3>
//           <span className="badge">100% Organic</span>
//         </div>

//         <div className="remedy-content">
//           <RemedyAnimation />
//           <div className="ingredients-section">
//             <h4>What You'll Need:</h4>
//             <p className="ingredient-text">
//               {result.remedy}
//             </p>
//           </div>

//           <div className="steps-section">
//             <h4>Preparation Guide:</h4>
//             <ul className="recipe-steps">
//               {recipeSteps.length > 1 ? (
//                 recipeSteps.map((step, index) => (
//                   <li key={index}>
//                     <span className="step-number">{index + 1}</span>
//                     <p>{step.trim() + (step.endsWith('.') ? '' : '.')}</p>
//                   </li>
//                 ))
//               ) : (
//                 <>
//                   <li><span className="step-number">1</span><p>Gather the ingredients exactly as prescribed above.</p></li>
//                   <li><span className="step-number">2</span><p>Mix thoroughly in a clean glass bowl.</p></li>
//                   <li><span className="step-number">3</span><p>Apply gently and leave on for 15-20 minutes.</p></li>
//                   <li><span className="step-number">4</span><p>Rinse cleanly with lukewarm water.</p></li>
//                 </>
//               )}
//             </ul>
//           </div>
//         </div>
//       </div>

//       <h3 className="products-title">🛍️ Recommended Care Products</h3>
//       <div className="product-grid">
//         {result.solution_products?.length > 0 ? (
//           result.solution_products.map((sp) => {
//             // Extract the product object for cleaner, safer code
//             const product = sp.products;

//             // Safety check: if the database has a broken mapping, skip this card instead of crashing
//             if (!product) return null;

//             return (
//               <div key={product.id} className="product-card premium">
//                 <div className="img-wrapper">
//                   <img src={product.image_url} alt={product.name} />
//                 </div>

//                 <h4>{product.name}</h4>

//                 {/* Dynamically display the brand if it exists */}
//                 {product.brand && (
//                   <p style={{ margin: "0 0 0.5rem 0", color: "#718096", fontSize: "0.9rem" }}>
//                     By {product.brand}
//                   </p>
//                 )}

//                 <p className="price">₹{product.price}</p>

//                 {/* Fixed routing: target="_blank" opens Amazon in a new tab, rel="noopener noreferrer" secures it */}
//                 <a
//                   href={product.link}
//                   target="_blank"
//                   rel="noopener noreferrer"
//                   className="buy-btn"
//                 >
//                   Shop Now ↗
//                 </a>
//               </div>
//             );
//           })
//         ) : (
//           <p className="no-products">No specialized products found for this category.</p>
//         )}
//       </div>

//       <div className="routine-cta-section" style={{ textAlign: "center", marginTop: "40px", padding: "30px", background: "rgba(255,255,255,0.05)", borderRadius: "20px", border: "1px solid rgba(255,255,255,0.1)" }}>
//         <h3 style={{ color: "white", marginBottom: "15px", fontSize: "1.5rem" }}>Ready to apply this every day? 📅</h3>
//         <button 
//           className="build-routine-btn" 
//           onClick={() => navigate('/build-routine', { state: { ...state, resultData: result } })}
//         >
//           Let's Build Your Routine ✨
//         </button>
//       </div>
//     </div>
//   );
// };

// export default Result;
import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import {
  getSolution,
  getYoutubeVideos,
  processVideos
} from "../services/api";
import "./Result.css";

const Result = () => {
  const { state } = useLocation();

  const [result, setResult] = useState(null);
  const [videos, setVideos] = useState([]);

  useEffect(() => {
    if (!state) return;

    const { category, type, issue } = state;

    // ✅ STEP 1: CREATE QUERY FIRST
    const query = [
      `${type?.name} skin ${issue?.name} treatment dermatologist`,
      `${issue?.name} routine for ${type?.name} skin`,
      `${category?.name} care for ${issue?.name}`
    ].join(" OR ");

    console.log("Generated Query:", query);

    // ✅ STEP 2: FETCH SOLUTION
    getSolution(category?.id, type?.id, issue?.id)
      .then(({ data, error }) => {
        if (error) {
          setResult("NO_DATA");
        } else if (data && data.length > 0) {
          setResult(data[0]);
        } else {
          setResult("NO_DATA");
        }
      });

    // ✅ STEP 3: FETCH YOUTUBE (ONLY ONCE)
    getYoutubeVideos(query).then(({ data, error }) => {
      console.log("YouTube API RESPONSE:", data);

      if (error) {
        console.error("YouTube Error:", error);
        return;
      }

      if (data) {
        setVideos(processVideos(data));
      }
    });

  }, [state]);

  // ❌ No state
  if (!state) {
    return <p className="loading">No data found</p>;
  }

  // ❌ No result
  if (result === "NO_DATA") {
    return (
      <div className="result-container">
        <h2>Your Personal Recommendation ✨</h2>
        <p className="error">
          No specific remedy found for this combination yet.
        </p>
      </div>
    );
  }

  // ⏳ Loading
  if (!result) {
    return (
      <div className="result-loading">
        <div className="spinner"></div>
        <p>Crafting your personal recipe...</p>
      </div>
    );
  }

  // ✅ Format steps
  const recipeSteps = result.remedy
    .split(/(?:\. |\n)/)
    .filter(step => step.trim().length > 3);

  return (
    <div className="result-container">
      <h2 className="result-title">Your Advisor Plan ✨</h2>

      {/* 🌿 Remedy */}
      <div className="remedy-card">
        <div className="remedy-header">
          <h3>🌿 Natural Home Recipe</h3>
          <span className="badge">100% Organic</span>
        </div>

        <div className="remedy-content">
          <div className="ingredients-section">
            <h4>What You'll Need:</h4>
            <p className="ingredient-text">{result.remedy}</p>
          </div>

          <div className="steps-section">
            <h4>Preparation Guide:</h4>
            <ul className="recipe-steps">
              {recipeSteps.length > 1 ? (
                recipeSteps.map((step, index) => (
                  <li key={index}>
                    <span className="step-number">{index + 1}</span>
                    <p>{step.trim() + (step.endsWith(".") ? "" : ".")}</p>
                  </li>
                ))
              ) : (
                <>
                  <li><span className="step-number">1</span><p>Gather ingredients.</p></li>
                  <li><span className="step-number">2</span><p>Mix properly.</p></li>
                  <li><span className="step-number">3</span><p>Apply for 15–20 mins.</p></li>
                  <li><span className="step-number">4</span><p>Rinse with water.</p></li>
                </>
              )}
            </ul>
          </div>
        </div>
      </div>

      {/* 🛍️ Products */}
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
              <a
                href={sp.products?.link}
                target="_blank"
                rel="noreferrer"
                className="buy-btn"
              >
                Shop Now
              </a>
            </div>
          ))
        ) : (
          <p className="no-products">No products found.</p>
        )}
      </div>

      {/* 🎥 YouTube */}
      <h3 className="products-title">🎥 Recommended Videos</h3>

      <div className="video-grid">
        {videos.length > 0 ? (
          videos.map((video) => {
            const videoId = video?.id?.videoId;
            const thumbnail = video?.snippet?.thumbnails?.high?.url;

            if (!videoId || !thumbnail) return null;

            return (
              <div key={videoId} className="video-card">
                <div
                  className="thumbnail-wrapper"
                  onClick={() =>
                    window.open(
                      `https://www.youtube.com/watch?v=${videoId}`,
                      "_blank"
                    )
                  }
                >
                  <img src={thumbnail} alt={video.snippet.title} />
                  <div className="play-button">▶</div>
                </div>

                <p className="video-title">
                  {video.snippet.title}
                </p>
              </div>
            );
          })
        ) : (
          <p className="no-products">
            Loading video recommendations...
          </p>
        )}
      </div>
    </div>
  );
};

export default Result;