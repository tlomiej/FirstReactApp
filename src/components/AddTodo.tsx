import React from 'react';
import {Task} from "./../models/Task";


interface Props {
    onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
    onAdd?: (event: React.FormEvent<HTMLFormElement>) => void;
    task: Task;
  }

class AddTodo<AddTodo> extends React.Component<Props> {

  render() {
    return (
        <div>
            <h1>Dodaj obiekt</h1>
            { <form onSubmit={this.props.onAdd}>
                <input onChange={this.props.onChange} value={this.props.task.name} />
                <button type="submit">Dodaj</button>
            </form> }
        </div>
        )
  }
}


export default AddTodo;
