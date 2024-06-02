// GlobalState.js
import React, { createContext, useState } from 'react';

export const GlobalContext = createContext();

export const GlobalProvider = ({ children }) => {
  const [targetWater, setTargetWater] = useState(100);

  return (
    <GlobalContext.Provider value={{ targetWater, setTargetWater }}>
      {children}
    </GlobalContext.Provider>
  );
};
