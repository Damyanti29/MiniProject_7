import { useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { getTypes, getIssues } from "../services/api";
import StepCard from "../components/StepCard";
import FaceAnalyzer from "../components/FaceAnalyzer";
import HairPorosityGuide from "../components/HairPorosityGuide";
import "../pages/Issue.css"; // Reuse the css with or-divider

const Type = () => {
  const { state } = useLocation();
  const navigate = useNavigate();
  const [types, setTypes] = useState([]);
  const [issues, setIssues] = useState([]);

  useEffect(() => {
    // Fetch both types and issues so the AI can map to both immediately
    getTypes(state.category.id).then(({ data }) => setTypes(data || []));
    getIssues(state.category.id).then(({ data }) => setIssues(data || []));
  }, []);

  const handleFaceScanComplete = ({ skinType, issue }) => {
    if (types.length > 0 && issues.length > 0) {
      
      // Match the mathematical Skin Type output
      let matchedType = types.find((t) =>
        t.name.toLowerCase().includes(skinType.toLowerCase())
      );
      if (!matchedType) matchedType = types[0];

      // Match the mathematical Issue output
      let matchedIssue = issues.find((i) =>
        i.name.toLowerCase().includes(issue.toLowerCase())
      );
      if (!matchedIssue) matchedIssue = issues[0]; 

      // Warp directly to result!
      navigate("/result", {
        state: {
          category: state.category,
          type: matchedType,
          issue: matchedIssue
        }
      });
    }
  };

  const isHair = state.category.name?.toLowerCase() === "hair";

  return (
    <div className="container">
      
      {isHair ? (
        <HairPorosityGuide />
      ) : (
        <FaceAnalyzer 
           onScanComplete={handleFaceScanComplete} 
        />
      )}
      
      <div className="or-divider">
        <h2>Or Select Type Manually</h2>
      </div>

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