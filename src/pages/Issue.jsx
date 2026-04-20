import { useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { getIssues } from "../services/api";
import StepCard from "../components/StepCard";
import "./Issue.css";

const Issue = () => {
  const { state } = useLocation();
  const navigate = useNavigate();
  const [issues, setIssues] = useState([]);

  useEffect(() => {
    getIssues(state.category.id).then(({ data }) => setIssues(data || []));
  }, []);

  return (
    <div className="container">
      <h2>Select Issue</h2>

      <div className="grid">
        {issues.map((issue) => (
          <StepCard
            key={issue.id}
            item={issue}
            onClick={() =>
              navigate("/result", {
                state: {
                  category: state.category,
                  type: state.type,
                  issue
                }
              })
            }
          />
        ))}
      </div>
    </div>
  );
};

export default Issue;