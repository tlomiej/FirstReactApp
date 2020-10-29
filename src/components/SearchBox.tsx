import React from 'react';
import ReactDOM from 'react-dom';
import { SearchResult } from "./SearchResult";
import { searchModel } from "./../models/SearchModel";
import { MAPQUEST_ACCESS_TOKEN } from "./../models/MapquestToken";
import InputBase from '@material-ui/core/InputBase/InputBase';
//import InputBase from '@material-ui/core/InputBase';



interface Props {
    newSearch?: string;
    resultString?: string;
    result: Array<searchModel>;
    onGetData: (res: any) => void;
    onGetMapQuestData: (res: any) => void;
    mapQuestResult: any
}
interface State {
    newSearch?: string;
    resultString?: string;
    result?: Array<searchModel>;
    onGetData: (res: any) => void;
    onGetMapQuestData: (res: any) => void;
    mapQuestResult?: any;

}

export class SearchBox<SearchBox> extends React.Component<State, Props> {

    constructor(props: Props) {
        super(props);
        this.state = {
            resultString: 'Pusto',
            result: [],
            mapQuestResult: { results: [{ locations: [] }] },
            onGetData: () => { },
            onGetMapQuestData: () => { }
        };
    }

    searchStyle = {
        background: 'white',
    } as React.CSSProperties;


    componentDidUpdate(prevProps: any, prevState: any) {
        if (prevState.result !== this.state.result) {
            this.props.onGetData(this.state.result);
        }
        if (prevState.mapQuestResult !== this.state.mapQuestResult) {
            this.props.onGetMapQuestData(this.state.mapQuestResult);
        }
    }




    render() {
        return (
            <div style={this.searchStyle}>
                <div className='searchStyleIner'>
                    <InputBase onChange={this.onChangeSearch} value={this.props.newSearch} onKeyPress={this.onKeyPressSearch}
                        placeholder="Wyszukaj"
                        inputProps={{ 'aria-label': 'search' }}
                    />
                    <button onClick={this.onClick}>Dane</button>
                    <SearchResult result={this.state.result} resultMapQuest={this.state.mapQuestResult}></SearchResult>
                </div>
            </div>
        )
    }

    onChangeSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
        this.setState({
            newSearch: `${event.target.value}`
        });
    };

    onKeyPressSearch = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.key === 'Enter') {
            this.getData();
            this.getMapQuestData()
        }
    };

    onClick = () => {
        this.getData();
        this.getMapQuestData()
    }

    getData() {
        const url = `https://nominatim.openstreetmap.org/?addressdetails=1&q=${this.state.newSearch}&format=json&limit=3`;
        fetch(url)
            .then(response => response.json())
            .then(data => {
                this.setState({ resultString: JSON.stringify(data) });
                this.setState({ result: data });

            }
            ).catch((error) => {
                console.error('Error:', error);
                this.setState({ resultString: JSON.stringify([]) });
                this.setState({ result: [] });
            });;
    }

    getMapQuestData() {
       /*  const url = `http://open.mapquestapi.com/geocoding/v1/address?key=${MAPQUEST_ACCESS_TOKEN}&location=${this.state.newSearch}`;
        fetch(url)
            .then(response => response.json())
            .then(data => {
                console.log(data)
                this.setState({ mapQuestResult: data });

            }
            ).catch((error) => {
                console.error('Error:', error);
                this.setState({ mapQuestResult: [] });
            });; */
    }

}




export default SearchBox;
