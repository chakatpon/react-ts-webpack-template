import React from 'react';
import ExampleClass from './ExampleClass';

const App: React.FC = () => {

  const sum = (a: number, b: number): number => {
    return a * b;
  }

  return (
    <React.Fragment>
      <header className="App-header">
        Tode List
      </header>
     
      <ExampleClass/>
    </React.Fragment>
  );
}

export default App;
