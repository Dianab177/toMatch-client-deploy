import React, { createContext, useState, useEffect } from "react";


export const ApiContext = createContext();

export const Provider = ({ children }) => {
  const [apiData, setApiData] = useState(null) // Data original

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch(
          "http://127.0.0.1:8000/api/recruiters"
        );
        if (response.status === 200) {
          const data = await response.json();
          setApiData(data);
        } else {
          alert("Hubo un problema de conexion.");
        }
      } catch {
        alert("No pudimos hacer la solicitud.");
      }
    }
    fetchData();

  }, []);

  return (
    <ApiContext.Provider
      value={{
        apiData,
        setApiData,
      }}
    >
      {children}
    </ApiContext.Provider>
  );
};
