import React, { createContext, useState, useEffect } from 'react';

// Create Context
export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  // Check localStorage on app load
  useEffect(() => {
    const storedUser = localStorage.getItem('credikhaata_user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  // Mock login function
  const login = (email, password) => {
    const mockUser = { email };
    localStorage.setItem('credikhaata_user', JSON.stringify(mockUser));
    setUser(mockUser);
    return true;
  };

  const logout = () => {
    localStorage.removeItem('credikhaata_user');
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};


















// import React, { createContext, useState, useEffect } from 'react';

// // Create Context
// export const AuthContext = createContext();

// export const AuthProvider = ({ children }) => {
//   const [user, setUser] = useState(null);

//   // Check localStorage on app load
//   useEffect(() => {
//     const storedUser = localStorage.getItem('user');
//     if (storedUser) {
//       setUser(JSON.parse(storedUser));
//     }
//   }, []);

//   // Mock login function
//   const login = (email, password) => {
//     // Replace with real API call if needed
//     const mockUser = { email };
//     localStorage.setItem('user', JSON.stringify(mockUser));
//     setUser(mockUser);
//     return true;
//   };

//   const logout = () => {
//     localStorage.removeItem('user');
//     setUser(null);
//   };

//   return (
//     <AuthContext.Provider value={{ user, login, logout }}>
//       {children}
//     </AuthContext.Provider>
//   );
// };
