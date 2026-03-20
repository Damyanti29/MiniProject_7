import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { getSolution } from "../services/api";

const Result = () => {
  const { state } = useLocation();
  const [result, setResult] = useState(null);

  useEffect(() => {
    if (!state) return;

    console.log("Category ID:", state?.category?.id);
    console.log("Type ID:", state?.type?.id);
    console.log("Issue ID:", state?.issue?.id);

    getSolution(
      state?.category?.id,
      state?.type?.id,
      state?.issue?.id
    ).then(({ data, error }) => {
      console.log("DATA:", data);
      console.log("ERROR:", error);

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
        <h2>Your Recommendation</h2>
        <p className="error">No remedy found for this selection.</p>
      </div>
    );
  }

  if (!result) {
    return <p className="loading">Loading...</p>;
  }

  return (
    <div className="result-container">
      <h2>Your Recommendation</h2>

      <div className="remedy-box">
        <h3>Home Remedy</h3>
        <p>{result.remedy}</p>
      </div>

      <div className="product-grid">
        {result.solution_products?.length > 0 ? (
          result.solution_products.map((sp, i) => (
            <div key={i} className="product-card">
              <img src={sp.products?.image_url} alt="" />
              <h4>{sp.products?.name}</h4>
              <p>₹{sp.products?.price}</p>
              <a href={sp.products?.link} target="_blank" rel="noreferrer">
                Buy Now
              </a>
            </div>
          ))
        ) : (
          <p>No products found</p>
        )}
      </div>
    </div>
  );
};

export default Result;