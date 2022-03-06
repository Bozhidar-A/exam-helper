import React from 'react';
import logo from './logo.svg';
import './App.css';
import TestManager from './components/BEL_TestManager';
import Selector from './components/Selector';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <Selector></Selector>
      </header>
    </div>
  );
}

export default App;
