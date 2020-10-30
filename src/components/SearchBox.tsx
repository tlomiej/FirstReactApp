import React from 'react';
import ReactDOM from 'react-dom';
import { SearchResult } from "./SearchResult";
import { searchModel } from "./../models/SearchModel";
import { MAPQUEST_ACCESS_TOKEN } from "./../models/MapquestToken";
import InputBase from '@material-ui/core/InputBase/InputBase';
import { IconButton } from '@material-ui/core';
import SearchIcon from '@material-ui/icons/Search';
import LinearProgress from '@material-ui/core/LinearProgress';


interface Props {
    newSearch?: string;
    resultString?: string;
    result: Array<searchModel>;
    onGetData: (res: any) => void;
    onGetMapQuestData: (res: any) => void;
    mapQuestResult: any;
    searchOnProgres?: boolean
}
interface State {
    newSearch?: string;
    resultString?: string;
    result?: Array<searchModel>;
    onGetData: (res: any) => void;
    onGetMapQuestData: (res: any) => void;
    mapQuestResult?: any;
    searchOnProgres?: boolean;

}

export class SearchBox<SearchBox> extends React.Component<State, Props> {

    constructor(props: Props) {
        super(props);
        this.state = {
            resultString: 'Pusto',
            result: [],
            mapQuestResult: { results: [{ locations: [] }] },
            onGetData: () => { },
            onGetMapQuestData: () => { },
            searchOnProgres: false
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

                    {(() => {
                        switch (this.state.searchOnProgres) {
                            case true: return <LinearProgress />;

                        }
                    })()}

                    <InputBase onChange={this.onChangeSearch} value={this.props.newSearch} onKeyPress={this.onKeyPressSearch}
                        placeholder="Wyszukaj"
                        inputProps={{ 'aria-label': 'search' }}
                    />
                    <IconButton type="submit" onClick={this.onClick} className='iconButton' aria-label="search">
                        <SearchIcon />
                    </IconButton>
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
        this.setState({searchOnProgres: true})
        const url = `https://nominatim.openstreetmap.org/?addressdetails=1&q=${this.state.newSearch}&format=json&limit=3`;
        fetch(url)
            .then(response => response.json())
            .then(data => {
                this.setState({ resultString: JSON.stringify(data) });
                this.setState({ result: data });
                this.setState({searchOnProgres: false})

            }
            ).catch((error) => {
                console.error('Error:', error);
                this.setState({ resultString: JSON.stringify([]) });
                this.setState({ result: [] });
                this.setState({searchOnProgres: false})
            });;
    }

    getMapQuestData() {
          const url = `https://overpass-api.de/api/interpreter`;
         fetch(url, {
            method: 'POST', // *GET, POST, PUT, DELETE, etc.
            mode: 'cors', // no-cors, *cors, same-origin
            cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
            credentials: 'same-origin', // include, *same-origin, omit
            headers: {
              'Content-Type': 'application/json'
              // 'Content-Type': 'application/x-www-form-urlencoded',
            },
            redirect: 'follow', // manual, *follow, error
            referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
            body: 'node [amenity=drinking_water](41.88266210339971,12.486519813537598,41.89732595571203,12.497506141662598);out;'
          })
             .then(response => response)
             .then(data => {
                 console.log("XXXXX",data)
                 //this.setState({ mapQuestResult: data });
 
             }
             ).catch((error) => {
                 console.error('Error:', error);
                 //this.setState({ mapQuestResult: [] });
             });
    }

}




export default SearchBox;
