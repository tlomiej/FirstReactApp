import React, {Component} from 'react';
import Todo from './Todo'


type Task = {
  name: string;
  id: number;
  handleDeleteTodo: Function;
};

interface Tasks extends Array<Task>{};


export interface attrib {
  tasks: Tasks
}
class TodosItem<todos> extends React.Component<attrib> {

  render() {
    return (
       <div>
         <p>item.todo.name</p>
       </div>

    
     
    );
  }
}


export default TodosItem;
