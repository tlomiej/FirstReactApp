import React from 'react';


type Task = {
  name: string;
  id: number;
};


export interface Props {
  task: Task;
  onDelete: (task: Task) => void;
}


class Todos<todos> extends React.Component<Props> {
  
  
  btnstyle =  {
    background: 'red',
    color: 'orange',
    cursor: 'pointer',
    padding: '5px',
    float: 'right',
    border: 'none',
    borderRadius: '50%',
  } as React.CSSProperties;

  todoStyle ={
    backgroundColor: 'pink',
    border: 'solid',
    borderColor: 'green'


  } as React.CSSProperties;
  markComplet = (e?: any) =>{
    console.log("MarkComplet", e ,this.props);
  }

  onClick = () => {
    this.props.onDelete(this.props.task);
  };

  render() {
    return (
      <div style={this.todoStyle}>
        <p><input type="checkbox" onChange={this.markComplet}/> 
        {this.props.task.name}
        <button onClick={this.onClick} style={this.btnstyle}>X</button>
        </p>
      </div>  

    
     
    );
  }
}


export default Todos;
