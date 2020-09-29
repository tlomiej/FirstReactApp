import React, {Component} from 'react';


type Task = {
  name: string;
  id: number;
};



export interface task {
  task?: Task
}
class Todos<todos> extends React.Component<task> {

  markComplet = (e?: any) =>{
    console.log("MarkComplet", e ,this.props);
  }
  render() {
    return (
      <div>
        <p><input type="checkbox" onChange={this.markComplet}/> 
        {this.props.task?.name}</p>
      </div>  

    
     
    );
  }
}


export default Todos;
