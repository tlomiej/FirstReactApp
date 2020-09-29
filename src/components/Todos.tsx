import React, {Component} from 'react';


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
        return <h1>{el.name} - {this.props.login}</h1>
        })

    
     
    );
  }
}


export default Todos;
