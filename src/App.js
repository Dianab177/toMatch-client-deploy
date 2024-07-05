import React from 'react';
import './App.css';
import 'tailwindcss/tailwind.css';
import  Routes from './router/Routes';
// import { ApiProvider } from './context/ApiContext';

function App() {
  return (
    <div className="App">
       {/* <ApiProvider backendUrl={process.env.REACT_APP_BACKEND_URL}> */}
       <Routes/>
       {/* </ApiProvider> */}
    </div>
  );
}

export default App;
