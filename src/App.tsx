import React from 'react';
import Todos from './components/Todos';
import { Task } from './models/Task';
import AddTodo from './components/AddTodo';
import { SearchBox } from "./components/SearchBox";
import Map from './components/Map';


interface State {
  tasks: Task[];
  newTask: Task;
  geoNames: string
  newSearch: string;
  onChangeSearch?: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

class App extends React.Component<{}, State>  {
  state = {
    newSearch: '',
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

  render() {
    return (
      <div className="App">
        <h1>TEst</h1>
        <header className="App-header">

          <AddTodo task={this.state.newTask} onAdd={this.addTask} onChange={this.onChangeTask} />


          <Todos login={this.textParam} tasks={this.state.tasks} onDelete={this.deleteTask} />



          <SearchBox></SearchBox>
          <Map></Map>



        </header>
      </div>
    );
  }
}





export default App;
