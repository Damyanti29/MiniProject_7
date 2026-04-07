import React, { createContext, useState, useEffect, useContext } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Load mock user from localStorage on app start
  useEffect(() => {
    const savedUser = localStorage.getItem('mockUser');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
    setLoading(false);
  }, []);

  const login = (email) => {
    const existingUsers = JSON.parse(localStorage.getItem('mockUsersDb')) || {};
    let matchedUser = existingUsers[email];

    // Auto-create dummy account if they don't exist
    if (!matchedUser) {
      const defaultName = email.split('@')[0];
      const capitalized = defaultName.charAt(0).toUpperCase() + defaultName.slice(1);
      
      matchedUser = {
        email: email,
        user_metadata: {
          full_name: capitalized,
          age: '',
          dob: '',
          avatar_url: '',
          history: []
        }
      };
      existingUsers[email] = matchedUser;
      localStorage.setItem('mockUsersDb', JSON.stringify(existingUsers));
    }

    setUser(matchedUser);
    localStorage.setItem('mockUser', JSON.stringify(matchedUser));
  };

  const register = (name, email) => {
    const existingUsers = JSON.parse(localStorage.getItem('mockUsersDb')) || {};
    
    const newUser = {
      email,
      user_metadata: {
        full_name: name,
        age: '',
        dob: '',
        avatar_url: '',
        history: []
      }
    };

    existingUsers[email] = newUser;
    localStorage.setItem('mockUsersDb', JSON.stringify(existingUsers));
    
    setUser(newUser);
    localStorage.setItem('mockUser', JSON.stringify(newUser));
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('mockUser');
  };

  const updateUserProfile = (newData) => {
    if (!user) return;
    
    const updatedUser = {
      ...user,
      user_metadata: {
        ...user.user_metadata,
        ...newData
      }
    };
    
    setUser(updatedUser);
    localStorage.setItem('mockUser', JSON.stringify(updatedUser)); // Keep active session alive
    
    const existingUsers = JSON.parse(localStorage.getItem('mockUsersDb')) || {};
    existingUsers[user.email] = updatedUser; // Update the dummy database
    localStorage.setItem('mockUsersDb', JSON.stringify(existingUsers));
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, register, logout, updateUserProfile }}>
      {!loading && children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
