import React, {Component} from 'react';
import Todos from './components/Todos'
import ReactDOM from "react-dom";

type Task = {
  name: string;
  id: number;
};

interface Tasks extends Array<Task>{};


class App extends React.Component {
  state: Tasks = [{
    name: "test4",
    id: 12
  },
  {
    name: "test5",
    id: 15
  },
  {
    name: "test6",
    id: 16
  },
  {
    name: "test7",
    id: 17
  } ];

  textParam: string = "Administrator" 
  
  
  render() {
    return (
      <div className="App">
      <h1>TEst</h1>
      <header className="App-header">
        <Todos  login={this.textParam} tasks={this.state}/>


      
      </header>
    </div>
    );
  }
}





export default App;
