import { useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { getTypes } from "../services/api";
import StepCard from "../components/StepCard";

const Type = () => {
  const { state } = useLocation();
  const navigate = useNavigate();
  const [types, setTypes] = useState([]);

  useEffect(() => {
    getTypes(state.category.id).then(({ data }) => setTypes(data));
  }, []);

  return (
    <div className="container">
      <h2>Select Type</h2>

      <div className="grid">
        {types.map((type) => (
          <StepCard
            key={type.id}
            item={type}
            onClick={() =>
              navigate("/issue", {
                state: { category: state.category, type }
              })
            }
          />
        ))}
      </div>
    </div>
  );
};

export default Type;