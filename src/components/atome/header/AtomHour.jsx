import React, { useState, useEffect } from "react";

function Reloj() {
  const [hora, setHora] = useState(new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'}));

  useEffect(() => {
    const intervalo = setInterval(() => {
      setHora(new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'}));
    }, 1000);

    return () => {
      clearInterval(intervalo);
    };
  }, []);

  return (
    <div className="mx-6 my-6">
      <p className="text-2xl text-black">{hora}</p>
    </div>
  );
}

export default Reloj;
