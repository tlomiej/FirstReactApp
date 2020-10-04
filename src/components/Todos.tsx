import React, {Component} from 'react';
import Todo from './Todo';
import {Task} from './../models/Task';

export interface loginS {
  login: string,
  tasks: Task[],
  onDelete: (task: Task) => void;
}
class Todos<todos> extends React.Component<loginS> {

  render() {
    return (
        this.props.tasks.map(el => {
        return <Todo key={el.id} task={el} onDelete={this.props.onDelete}></Todo>
        })

    
     
    );
  }
}


export default Todos;
