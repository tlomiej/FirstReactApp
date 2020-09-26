import React from 'react';
import Todos from './components/Todos'

function App() {
//string test = '';


  interface Task {
    name: string;
    id: number;
  }



  let state: Task = {
    name: "test2",
    id: 12
  } 


  return (
    <div className="App">
      <h1>TEst</h1>
      <header className="App-header">
       

        <p>
         TESTzwa 
        </p>
        <Todos />

      </header>
    </div>
  );
}

export default App;
