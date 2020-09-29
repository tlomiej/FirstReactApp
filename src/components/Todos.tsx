import React, {Component} from 'react';
import Todo from './Todo'


type Task = {
  name: string;
  id: number;
};

interface Tasks extends Array<Task>{};


export interface loginS {
  login: string,
  tasks?: Tasks
}
class Todos<todos> extends React.Component<loginS> {

  render() {
    return (
        this.props.tasks?.map(el => {
        return <Todo task={el}></Todo>
        })

    
     
    );
  }
}


export default Todos;
