import React, { useState, useEffect } from 'react';
import './Profile.css';
import { useAuth } from '../AuthContext';
import { useNavigate } from 'react-router-dom';

const Profile = () => {
  const { user, updateUserProfile } = useAuth();
  const navigate = useNavigate();
  
  const [activeTab, setActiveTab] = useState('personal'); // personal, security, history
  
  // Personal Info State
  const [name, setName] = useState('');
  const [age, setAge] = useState('');
  const [dob, setDob] = useState('');
  const [avatarUrl, setAvatarUrl] = useState('');
  
  // Security State
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  
  // UX State
  const [loading, setLoading] = useState(false);
  const [feedback, setFeedback] = useState({ type: '', msg: '' });

  // Load existing metadata on mount
  useEffect(() => {
    if (!user) {
      navigate('/login');
      return;
    }
    
    if (user.user_metadata) {
      setName(user.user_metadata.full_name || '');
      setAge(user.user_metadata.age || '');
      setDob(user.user_metadata.dob || '');
      setAvatarUrl(user.user_metadata.avatar_url || '');
    }
  }, [user, navigate]);

  const handleUpdateProfile = (e) => {
    e.preventDefault();
    setLoading(true);
    setFeedback({ type: '', msg: '' });

    // Dummy user profile update mechanism
    updateUserProfile({
      full_name: name,
      age: age,
      dob: dob,
      avatar_url: avatarUrl
    });

    setLoading(false);
    setFeedback({ type: 'success', msg: 'Profile updated successfully ✨' });
    setTimeout(() => setFeedback({ type: '', msg: '' }), 4000);
  };

  const handleUpdatePassword = (e) => {
    e.preventDefault();
    setLoading(true);
    setFeedback({ type: '', msg: '' });

    if (newPassword !== confirmPassword) {
      setLoading(false);
      setFeedback({ type: 'error', msg: 'Passwords do not match' });
      return;
    }

    // Dummy password update simulation
    setTimeout(() => {
      setLoading(false);
      setFeedback({ type: 'success', msg: 'Password updated securely 🔒' });
      setNewPassword('');
      setConfirmPassword('');
      setTimeout(() => setFeedback({ type: '', msg: '' }), 4000);
    }, 500);
  };

  // Mock Analysis History (dummy implementation defaults to an existing array if present)
  const userHistory = user?.user_metadata?.history?.length > 0 ? user.user_metadata.history : [
    {
      id: 1,
      date: '2026-03-25',
      skinType: 'Combination',
      hairType: 'Curly / Dry',
      concern: 'Acne & Frizz'
    },
    {
      id: 2,
      date: '2026-02-14',
      skinType: 'Oily',
      hairType: 'Normal',
      concern: 'Pores'
    }
  ];

  if (!user) return null;

  return (
    <div className="profile-container">
      <div className="profile-card">
        
        <div className="profile-header">
          <div className="profile-avatar-wrapper">
            <img 
              src={avatarUrl || 'https://api.dicebear.com/9.x/glass/svg?seed=' + (user.email || 'user')} 
              alt="Avatar" 
              className="profile-avatar" 
            />
          </div>
          <div className="profile-title">
            <h2>{name || 'My Profile'}</h2>
            <p>{user.email}</p>
          </div>
        </div>

        <div className="profile-content">
          <div className="profile-tabs">
            <div 
              className={`profile-tab ${activeTab === 'personal' ? 'active' : ''}`}
              onClick={() => { setActiveTab('personal'); setFeedback({type:'',msg:''}); }}
            >
              Personal Info
            </div>
            <div 
              className={`profile-tab ${activeTab === 'history' ? 'active' : ''}`}
              onClick={() => { setActiveTab('history'); setFeedback({type:'',msg:''}); }}
            >
              Analysis History
            </div>
            <div 
              className={`profile-tab ${activeTab === 'security' ? 'active' : ''}`}
              onClick={() => { setActiveTab('security'); setFeedback({type:'',msg:''}); }}
            >
              Security
            </div>
          </div>

          <div className="profile-panel">
            {/* Personal Info Tab */}
            {activeTab === 'personal' && (
              <form className="profile-form" onSubmit={handleUpdateProfile}>
                
                {feedback.msg && (
                  <div className={`feedback-msg ${feedback.type}`}>{feedback.msg}</div>
                )}

                <div className="input-group">
                  <label>Full Name</label>
                  <input type="text" value={name} onChange={e => setName(e.target.value)} placeholder="Sarah Jenkins" />
                </div>
                
                <div className="input-group">
                  <label>Age</label>
                  <input type="number" value={age} onChange={e => setAge(e.target.value)} placeholder="28" />
                </div>

                <div className="input-group">
                  <label>Date of Birth</label>
                  <input type="date" value={dob} onChange={e => setDob(e.target.value)} />
                </div>

                <div className="input-group">
                  <label>Profile Image URL</label>
                  <input type="url" value={avatarUrl} onChange={e => setAvatarUrl(e.target.value)} placeholder="https://example.com/photo.jpg" />
                </div>

                <div className="btn-container" style={{justifyContent: 'space-between', marginTop: '2rem', borderTop: '1px solid rgba(255,255,255,0.1)', paddingTop: '1.5rem'}}>
                  <button type="submit" className="save-btn" disabled={loading}>
                    {loading ? 'Saving...' : 'Save Changes'}
                  </button>
                  
                  <button type="button" className="save-btn" onClick={() => navigate('/category')} style={{background: 'linear-gradient(135deg, #ff5c8a, #ff7eb3)', border: 'none'}}>
                    Start Advisor Quiz ➔
                  </button>
                </div>
              </form>
            )}

            {/* Analysis History Tab */}
            {activeTab === 'history' && (
              <div className="history-grid">
                {userHistory.length === 0 ? (
                  <p>No past analysis found. Take the advisor quiz!</p>
                ) : (
                  userHistory.map((item) => (
                    <div className="history-card" key={item.id}>
                      <h4>Analysis on {item.date}</h4>
                      <div className="history-details">
                        <p><strong>Skin Type:</strong> {item.skinType}</p>
                        <p><strong>Hair Type:</strong> {item.hairType}</p>
                        <p><strong>Primary Concern:</strong> {item.concern}</p>
                      </div>
                    </div>
                  ))
                )}
              </div>
            )}

            {/* Security Tab */}
            {activeTab === 'security' && (
              <form className="profile-form" onSubmit={handleUpdatePassword}>
                
                {feedback.msg && (
                  <div className={`feedback-msg ${feedback.type}`}>{feedback.msg}</div>
                )}
                
                <div className="input-group full-width">
                  <label>New Password</label>
                  <input 
                    type="password" 
                    value={newPassword} 
                    onChange={e => setNewPassword(e.target.value)} 
                    placeholder="Enter new secure password" 
                    required 
                    minLength={6}
                  />
                </div>
                
                <div className="input-group full-width">
                  <label>Confirm New Password</label>
                  <input 
                    type="password" 
                    value={confirmPassword} 
                    onChange={e => setConfirmPassword(e.target.value)} 
                    placeholder="Re-type new password" 
                    required 
                    minLength={6}
                  />
                </div>

                <div className="btn-container">
                  <button type="submit" className="save-btn" disabled={loading}>
                    {loading ? 'Updating...' : 'Update Password'}
                  </button>
                </div>
              </form>
            )}

          </div>
        </div>

      </div>
    </div>
  );
};

export default Profile;
