import React, {Component} from 'react';
import {Task} from "./../models/Task";


interface Props {
    onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
    onAdd?: (event: React.FormEvent<HTMLFormElement>) => void;
    task?: Task;
  }

class AddTodo<AddTodo> extends React.Component<Props> {

  render() {
    return (
        <div>
            <h1>Dodaj obiekt</h1>
            <input />
            {/* <form onSubmit={onAdd}>
                <input onChange={onChange} value={task.name} />
                <button type="submit">Add a task</button>
            </form> */}
        </div>
        )
  }
}


export default AddTodo;
