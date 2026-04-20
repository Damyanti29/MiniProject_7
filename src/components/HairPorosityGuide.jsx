import React from 'react';
import './HairPorosityGuide.css';

const HairPorosityGuide = () => {
  return (
    <div className="porosity-guide-wrapper">
      <div className="guide-header">
        <h3>Discover Your Hair Porosity</h3>
        <p>Not sure what to select below? Try one of these quick 2-minute DIY tests at home!</p>
      </div>

      <div className="guide-cards-container">
        {/* Float Test Card */}
        <div className="guide-card">
          <div className="card-top-accent water-accent"></div>
          <h4>💧 The Float Test</h4>
          <p className="card-subtitle">The most accurate visual method.</p>
          
          <div className="instructions">
            <strong>Preparation:</strong> Use a couple of strands of clean, product-free hair.
            <br/><br/>
            <strong>The Process:</strong> Drop the hair into a glass of room-temperature water and wait 2–4 minutes.
          </div>

          <ul className="results-list">
            <li>
              <span className="dot high"></span>
              <div>
                <strong>High Porosity:</strong> Sinks to the bottom quickly.
                <small>Cuticles are open, water enters fast.</small>
              </div>
            </li>
            <li>
              <span className="dot normal"></span>
              <div>
                <strong>Normal Porosity:</strong> Floats in the middle.
                <small>Perfectly balanced moisture retention.</small>
              </div>
            </li>
            <li>
              <span className="dot low"></span>
              <div>
                <strong>Low Porosity:</strong> Stays on the surface.
                <small>Cuticles are tightly closed, resisting water.</small>
              </div>
            </li>
          </ul>
        </div>

        {/* Tactile Test Card */}
        <div className="guide-card">
          <div className="card-top-accent tactile-accent"></div>
          <h4>✌️ The Slip & Slide Test</h4>
          <p className="card-subtitle">Instant tactile feedback.</p>
          
          <div className="instructions">
            <strong>The Process:</strong> Take a single dry strand of hair between your thumb and index finger. Slide your fingers firmly *up* the strand toward your scalp.
          </div>

          <ul className="results-list tactile-results">
            <li>
              <div className="icon-box">🧱</div>
              <div>
                <strong>Rough / Bumpy</strong>
                <small>You have High Porosity (open cuticles).</small>
              </div>
            </li>
            <li>
              <div className="icon-box">🧼</div>
              <div>
                <strong>Perfectly Smooth</strong>
                <small>You have Low Porosity (closed cuticles).</small>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default HairPorosityGuide;
