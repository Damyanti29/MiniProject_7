import React from 'react';
import './RemedyAnimation.css';

const RemedyAnimation = () => {
  return (
    <div className="remedy-animation-container">
      <div className="animation-stage">
        {/* Ingredients falling from top */}
        <div className="ingredient drop-1">
          <span className="ing-icon">🍯</span>
          <span className="ing-label">Honey</span>
        </div>
        <div className="ingredient drop-2">
          <span className="ing-icon">🌿</span>
          <span className="ing-label">Extracts</span>
        </div>
        <div className="ingredient drop-3">
          <span className="ing-icon">💧</span>
          <span className="ing-label">Water</span>
        </div>

        {/* Spoon mixing */}
        <div className="mixing-spoon">🥄</div>

        {/* The Bowl */}
        <div className="the-bowl">🥣</div>

        {/* Final Magic Sparkles & Paste Display */}
        <div className="magic-paste">
          <div className="paste-icons">✨🍵✨</div>
          <div className="paste-label">Paste Ready!</div>
        </div>
      </div>
    </div>
  );
};

export default RemedyAnimation;
