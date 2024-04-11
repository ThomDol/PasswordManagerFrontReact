import React from "react";
import { createContext } from "react";
import { useState } from "react";

const TokenContext = createContext();

const TokenProvider = ({ children }) => {
  const [token, setToken] = useState(null);

  return (
    <TokenContext.Provider value={{ token, setToken }}>
      {children}
    </TokenContext.Provider>
  );
};

export default TokenProvider; // Export par défaut

export { TokenContext }; // Export nommé
