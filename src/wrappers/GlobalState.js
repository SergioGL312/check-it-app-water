// GlobalState.js
import React, { createContext, useState } from 'react';

export const GlobalContext = createContext();

export const GlobalProvider = ({ children }) => {
  const [state, setState] = useState({
    targetWater: 100,
    firstName: 'Joaquin',
    lastName: '',
    ip: '192.168.0.2:3000',
    sec: 4
  });

  return (
    <GlobalContext.Provider value={{ state, setState }}>
      {children}
    </GlobalContext.Provider>
  );
};
