import React from 'react';
import { SearchResult } from "./SearchResult";
import { searchModel } from "./../models/SearchModel";



interface Props {
    newSearch?: string;
    resultString?: string;
    result: Array<searchModel>;
    onGetData: (res: any) => void;
}
interface State {
    newSearch?: string;
    resultString?: string;
    result?: Array<searchModel>;
    onGetData: (res: any) => void;

}

export class SearchBox<SearchBox> extends React.Component<State, Props> {

    constructor(props: Props) {
        super(props);
        this.state = {
            resultString: 'Pusto',
            result: [],
            onGetData: () => {}
        };
    }

    searchStyle = {
        background: 'white',
    } as React.CSSProperties;
    

    componentDidUpdate(prevProps: any, prevState: any) {
        if (prevState.result !== this.state.result) {
            this.props.onGetData(this.state.result);
        }
    }

   


    render() {
        return (
            <div style={this.searchStyle}>
                <h1>Wyszukaj</h1>
                <input onChange={this.onChangeSearch} value={this.props.newSearch} onKeyPress={this.onKeyPressSearch} />
                <button onClick={this.onClick}>Dane</button>
                <SearchResult result={this.state.result}></SearchResult>
            </div>
        )
    }

    onChangeSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
        //console.log(event.target.value)
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
        const url = `https://nominatim.openstreetmap.org/?addressdetails=1&q=${this.state.newSearch}&format=json&limit=3`;
        fetch(url)
            .then(response => response.json())
            .then(data => {
                //console.log(data)

                this.setState({ resultString: JSON.stringify(data) });
                this.setState({ result: data });
                //console.log(this.state.resultString)

            }
            ).catch((error) => {
                console.error('Error:', error);
                this.setState({ resultString: JSON.stringify([]) });
                this.setState({ result: [] });
            });;
    }

}




export default SearchBox;
