import React from 'react';
import { searchModel } from "./../models/SearchModel";


interface Props {
    result: Array<searchModel>;
}

export class SearchResult<SearchBox> extends React.Component<Props> {

    render() {
        return (
            <ul>
                {this.props.result?.map((obj, index) => {
                    console.log(obj.display_name)
                    return <li key={index}>{obj.display_name}</li>;
                })}
            </ul>)
    }
}

export default SearchResult;
