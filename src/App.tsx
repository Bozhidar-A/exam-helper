import React from 'react';
import logo from './logo.svg';
import './App.css';
import TestManager from './components/BEL_TestManager';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        {/* <BEL_SingleAnswer></BEL_SingleAnswer> */}
        {/* <p>-------------</p>
        <MultipleAnswers></MultipleAnswers> */}
        {/* <BEL_MultipleSubAnswersSelect></BEL_MultipleSubAnswersSelect> */}
        <TestManager></TestManager>
      </header>
    </div>
  );
}

export default App;
