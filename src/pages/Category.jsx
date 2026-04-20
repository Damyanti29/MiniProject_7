import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getCategories } from "../services/api";
import StepCard from "../components/StepCard";

const Category = () => {
  const [categories, setCategories] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    getCategories().then(({ data }) => setCategories(data || []));
  }, []);

  return (
    <div className="container">
      <h2>Select Category</h2>

      <div className="grid">
        {categories.map((cat) => (
          <StepCard
            key={cat.id}
            item={cat}
            onClick={() =>
              navigate("/type", { state: { category: cat } })
            }
          />
        ))}
      </div>
    </div>
  );
};

export default Category;