import "./StepCard.css";

const StepCard = ({ item, onClick }) => {
  return (
    <div className="step-card" onClick={onClick}>
      <h3>{item.name}</h3>
    </div>
  );
};

export default StepCard;