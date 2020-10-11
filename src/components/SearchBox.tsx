import React from 'react';
import { SearchResult } from "./SearchResult";


interface Props {
    newSearch?: string;
    result?: string;
}
interface State {
    newSearch?: string;
    result?: string;
}

export class SearchBox<SearchBox> extends React.Component<State, Props> {

    constructor(props:Props) {
        super(props);
        this.state = {
          result: 'Pusto'
        };
      }

    render() {
        return (
            <div>
                <h1>Wyszukaj</h1>
                <input onChange={this.onChangeSearch} value={this.props.newSearch} onKeyPress={this.onKeyPressSearch} />
                <button onClick={this.onClick}>Dane</button>
                <SearchResult result={this.state.result}></SearchResult>
            </div>
        )
    }

    onChangeSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
        console.log(event.target.value)
        this.setState({
            newSearch: `${event.target.value}`
        });
    };

    onKeyPressSearch = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.key === 'Enter') {
            this.getData();
        }
    };

    onClick = () => {
        this.getData();
    }

    getData() {
        const url = `https://nominatim.openstreetmap.org/?addressdetails=1&q=${this.state.newSearch}&format=json&limit=1`;
        fetch(url)
            .then(response => response.json())
            .then(data => {
                console.log(data)
                
                 this.setState({ result: JSON.stringify(data) });
                 console.log(this.state.result)

            }
            );
    }

}




export default SearchBox;
