import React, {Component} from 'react';
import Todos from './components/Todos';
import {Task} from './models/Task';
import AddTodo from './components/AddTodo';


interface State {
  tasks: Task[];
}

class App extends React.Component<{}, State>  {
  state = {
    newTask: {
      id: 1,
      name: ""
    },
    tasks: [{
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
    } ]
  };



  textParam: string = "Administrator" 
  
  private deleteTask = (taskToDelete: Task) => {

    console.log(`App.tsx -> ${taskToDelete.id}`)
    this.setState({tasks: [...this.state.tasks.filter(todo => todo.id !== taskToDelete.id)]})
  };
  
  render() {
    return (
      <div className="App">
      <h1>TEst</h1>
      <header className="App-header">

      <AddTodo/>
  

        <Todos login={this.textParam} tasks={this.state.tasks} onDelete={this.deleteTask}/>


      
      </header>
    </div>
    );
  }
}





export default App;
