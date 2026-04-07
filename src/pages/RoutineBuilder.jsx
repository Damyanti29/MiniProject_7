import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import './RoutineBuilder.css';

const RoutineBuilder = () => {
  const { state } = useLocation();
  const navigate = useNavigate();

  const [phase, setPhase] = useState('questionnaire'); // 'questionnaire' or 'routine'
  const [lifestyle, setLifestyle] = useState('');
  const [age, setAge] = useState('');

  // Dynamic Data from Result Page
  const issueName = state?.issue?.name || 'your specific concern';
  const categoryName = state?.category?.name || 'Skin';
  const typeName = state?.type?.name || 'Normal';
  
  // Extract real products recommended from the database
  const solutionProducts = state?.resultData?.solution_products || [];
  const rawProducts = solutionProducts.map(sp => sp.products).filter(Boolean);

  const handleGenerate = (e) => {
    e.preventDefault();
    if (!lifestyle || !age) return;
    setPhase('routine');
  };

  // Generate logic based on lifestyle, category, type and REAL products
  const generateSteps = () => {
    let amSteps = [];
    let pmSteps = [];
    
    // We clone the products so we can 'pop' them into the routine
    let availableProducts = [...rawProducts];
    
    // Helper to inject a real product or fallback to default
    const getProduct = (defaultTitle, defaultDesc) => {
      if (availableProducts.length > 0) {
        const p = availableProducts.shift();
        return { 
          title: p.name, 
          desc: p.brand ? `${p.brand} - ${defaultDesc}` : defaultDesc 
        };
      }
      return { title: defaultTitle, desc: defaultDesc };
    };

    const isHair = categoryName.toLowerCase().includes('hair');

    if (isHair) {
      // --- HAIR ROUTINE ---
      amSteps.push({ icon: '💧', type: 'Product', ...getProduct('Hydrating Mist / Detangler', `Prep your ${typeName.toLowerCase()} hair for the day.`) });
      
      // Age specific hair morning routine!
      if (age === 'teen') {
        amSteps.push({ icon: '🎀', title: 'Gentle Styling', type: 'Habit', desc: 'Avoid heavy heat styling. Use a boar bristle brush.' });
      } else if (age === '30plus') {
        amSteps.push({ icon: '🌱', type: 'Product', ...getProduct('Scalp Density Serum', 'Apply to the roots to promote thickness and combat natural thinning.') });
      }

      if (lifestyle === 'working') {
        amSteps.push({ icon: '🛡️', title: 'Heat Protectant', type: 'Product', desc: 'Essential shield before blow-drying for the commute.' });
      } else {
        amSteps.push({ icon: '✨', title: 'Light Hair Serum', type: 'Product', desc: 'Smooth frizz and add shine for your classes.' });
      }

      pmSteps.push({ icon: '💆‍♀️', title: 'Scalp Massage', type: 'Habit', desc: '5 minutes of massage to stimulate blood flow.' });
      
      pmSteps.push({ 
        icon: '🥣', 
        title: `Custom ${issueName} Mask`, 
        type: 'Remedy', 
        desc: `Apply your prescribed DIY remedy to target exactly what your hair needs.` 
      });

      // Age specific hair night routine!
      if (age === '20s') {
        pmSteps.push({ icon: '🧪', type: 'Product', ...getProduct('Protein Treatment', 'Apply a strengthening mask to recover from color or heat damage.') });
      }

      pmSteps.push({ icon: '🧴', type: 'Product', ...getProduct('Healing Hair Oil', 'Leave-in treatment overnight for repair.') });

    } else {
      // --- SKIN ROUTINE ---
      const cleanseDesc = typeName.toLowerCase().includes('oily') 
        ? 'Use a foaming or gel cleanser to remove excess sebum.' 
        : 'Use a gentle, hydrating cleanser to protect your moisture barrier.';

      amSteps.push({ icon: '💧', type: 'Product', ...getProduct('Morning Cleanser', cleanseDesc) });
      
      if (age === 'teen') {
        amSteps.push({ icon: '🌿', title: 'Soothing Toner', type: 'Remedy', desc: 'Apply rose water or witch hazel to balance pH and calm teenage redness.' });
      } else if (age === '20s') {
        amSteps.push({ icon: '✨', type: 'Product', ...getProduct('Antioxidant Serum', 'Preventative Vitamin C for environmental protection.') });
      } else {
        amSteps.push({ icon: '✨', type: 'Product', ...getProduct('Vitamin C + Peptides', 'Vital for free-radical protection, glow, and collagen synthesis.') });
      }

      if (lifestyle === 'student') {
        amSteps.push({ icon: '🧴', type: 'Product', ...getProduct('Moisturizing SPF 30+', 'An all-in-one moisturizer with SPF for quick mornings.') });
      } else {
        amSteps.push({ icon: '🧴', title: 'Light Moisturizer', type: 'Product', desc: 'Hydrate the skin before your makeup routine.' });
        amSteps.push({ icon: '☀️', type: 'Product', ...getProduct('Dedicated SPF 50', 'Maximum protection for the commute across the city.') });
      }

      // PM Routine
      if (lifestyle === 'working' || lifestyle === 'student') {
        pmSteps.push({ icon: '🧼', title: 'Double Cleanse', type: 'Product', desc: 'Micellar water followed by a cleanser to remove all SPF and pollution.' });
      } else {
        pmSteps.push({ icon: '🧼', type: 'Product', ...getProduct('Evening Wash', 'Thoroughly wash away the day.') });
      }

      pmSteps.push({ 
        icon: '🥣', 
        title: `Targeted ${issueName} Treatment`, 
        type: 'Remedy', 
        desc: `Apply your customized ${issueName.toLowerCase()} home remedy for 15 mins.` 
      });

      if (age === '30plus') {
        pmSteps.push({ icon: '🧪', type: 'Product', ...getProduct('Retinol', 'Apply proven anti-aging actives to repair cellular damage & increase cell turnover.') });
        pmSteps.push({ icon: '👀', title: 'Rich Eye Cream', type: 'Product', desc: 'Gently tap underneath the eyes to prevent fine lines.' });
      } else if (age === '20s') {
        pmSteps.push({ icon: '🧪', type: 'Product', ...getProduct('Exfoliant (AHA/BHA)', 'Keep pores clear and prevent adult acne.') });
      } else if (age === 'teen') {
        pmSteps.push({ icon: '🎯', title: 'Spot Treatment', type: 'Product', desc: 'Dab salicylic acid directly onto active breakouts only. Avoid spreading.' });
      }

      pmSteps.push({ icon: '🌙', type: 'Product', ...getProduct('Night Cream', 'Lock in moisture and seal your actives while you rest.') });
    }

    return { amSteps, pmSteps };
  };

  const routine = phase === 'routine' ? generateSteps() : null;

  return (
    <div className="routine-builder-page">
      {phase === 'questionnaire' && (
        <div className="questionnaire-card glass-panel slide-up">
          <h2>Let's Personalize This 🌸</h2>
          <p>Tell us a bit about your lifestyle so we can blend your <strong>{issueName}</strong> remedies into an aesthetic daily routine!</p>
          
          <form onSubmit={handleGenerate} className="routine-form">
            <div className="form-group">
              <label>What describes your lifestyle best?</label>
              <div className="choice-grid">
                {['student', 'working', 'home'].map((choice) => (
                  <div 
                    key={choice} 
                    className={`choice-card ${lifestyle === choice ? 'selected' : ''}`}
                    onClick={() => setLifestyle(choice)}
                  >
                    {choice === 'student' && '🎓 Student'}
                    {choice === 'working' && '💼 Working Woman'}
                    {choice === 'home' && '🏡 Stay at Home'}
                  </div>
                ))}
              </div>
            </div>

            <div className="form-group">
              <label>What's your age bracket?</label>
              <div className="choice-grid">
                {['teen', '20s', '30plus'].map((choice) => (
                  <div 
                    key={choice} 
                    className={`choice-card ${age === choice ? 'selected' : ''}`}
                    onClick={() => setAge(choice)}
                  >
                    {choice === 'teen' && 'Teen (13-19)'}
                    {choice === '20s' && 'My 20s'}
                    {choice === '30plus' && '30 & Above'}
                  </div>
                ))}
              </div>
            </div>

            <button 
              type="submit" 
              className="generate-magic-btn" 
              disabled={!lifestyle || !age}
            >
              Generate Routine ✨
            </button>
          </form>
        </div>
      )}

      {phase === 'routine' && (
        <div className="routine-display fade-in">
          <h2 className="routine-main-title">Your Custom Plan  ✨</h2>
          <p className="routine-subtitle">Designed for a <strong>{age === '30plus' ? '30+' : age} {lifestyle}</strong> battling <strong>{issueName.toLowerCase()}</strong>.</p>
          
          <div className="timelines-wrapper">
            {/* AM ROUTINE */}
            <div className="timeline-column am-column">
              <div className="timeline-header am-header">
                <h3>☀️ Morning Routine</h3>
                <p>Start your day glowing</p>
              </div>
              <div className="timeline-path">
                {routine.amSteps.map((step, index) => (
                  <div className="timeline-step" key={index}>
                    <div className="step-point"></div>
                    <div className={`step-content glass-step ${step.type === 'Remedy' ? 'remedy-anim-card' : ''}`}>
                      <span className={`step-icon ${step.type === 'Remedy' ? 'cartoon-bounce' : ''}`}>{step.icon}</span>
                      <div className="step-text">
                        <span className="step-badge">{step.type}</span>
                        <h4>{step.title}</h4>
                        <p>{step.desc}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* PM ROUTINE */}
            <div className="timeline-column pm-column">
              <div className="timeline-header pm-header">
                <h3>🌙 Evening Routine</h3>
                <p>Recover and repair</p>
              </div>
              <div className="timeline-path">
                {routine.pmSteps.map((step, index) => (
                  <div className="timeline-step" key={index}>
                    <div className="step-point"></div>
                    <div className={`step-content glass-step ${step.type === 'Remedy' ? 'remedy-anim-card' : ''}`}>
                      <span className={`step-icon ${step.type === 'Remedy' ? 'cartoon-bounce' : ''}`}>{step.icon}</span>
                      <div className="step-text">
                        <span className={`step-badge ${step.type === 'Remedy' ? 'remedy-badge' : ''}`}>{step.type}</span>
                        <h4>{step.title}</h4>
                        <p>{step.desc}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
          
          <div className="bottom-actions">
            <button className="back-btn" onClick={() => setPhase('questionnaire')}>Back to Settings</button>
            <button className="finish-btn" onClick={() => navigate('/profile')}>Save to Profile</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default RoutineBuilder;
