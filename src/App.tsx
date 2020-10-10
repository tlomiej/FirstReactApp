import React, { Component } from 'react';
import Todos from './components/Todos';
import { Task } from './models/Task';
import AddTodo from './components/AddTodo';


interface State {
  tasks: Task[];
  newTask: Task;
  geoNames: string
}

class App extends React.Component<{}, State>  {
  state = {
    geoNames: "",
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
    }]
  };



  textParam: string = "Administrator"

  private deleteTask = (taskToDelete: Task) => {

    console.log(`App.tsx -> ${taskToDelete.id}`)
    this.setState({ tasks: [...this.state.tasks.filter(todo => todo.id !== taskToDelete.id)] })
  };


  private addTask = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    console.log('Dodaj')
    this.setState(previousState => ({
      newTask: {
        id: previousState.newTask.id + 1,
        name: ""
      },
      tasks: [...previousState.tasks, previousState.newTask]
    }));
  };


  private onChangeTask = (event: React.ChangeEvent<HTMLInputElement>) => {
    console.log(event.target.value)
    this.setState({
      newTask: {
        ...this.state.newTask,
        name: event.target.value
      }
    });
  };

  getData() {
    const url = 'http://api.geonames.org/searchJSON?q=london&maxRows=10&username=demo';
    fetch(url)
      .then(response => response.json())
      .then(data => {
        console.log(data)

        this.setState({ geoNames: JSON.stringify(data) });

      }
      );
  }

  onClick = () => {
    this.getData();
  }


  render() {
    return (
      <div className="App">
        <h1>TEst</h1>
        <header className="App-header">

          <AddTodo task={this.state.newTask} onAdd={this.addTask} onChange={this.onChangeTask} />


          <Todos login={this.textParam} tasks={this.state.tasks} onDelete={this.deleteTask} />

          <button onClick={this.onClick}>Dane</button>

          <h2>Wynik</h2>
          {this.state.geoNames}



        </header>
      </div>
    );
  }
}





export default App;
