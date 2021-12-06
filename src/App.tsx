import React from 'react';
import logo from './logo.svg';
import './App.css';
import SingleAnswer from './components/SingleAnswer';
import MultipleAnswers from './components/MultipleAnswers';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <SingleAnswer></SingleAnswer>
        <p>-------------</p>
        <MultipleAnswers></MultipleAnswers>
      </header>
    </div>
  );
}

export default App;
