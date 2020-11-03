import { eventNames } from 'process';
import React from 'react';
import { searchModel } from "./../models/SearchModel";
import './SearchResult.css'
import SearchResultItem from "./SearchResultItem";
import List from '@material-ui/core/List';


interface Props {
    result: Array<searchModel>;
    resultMapQuest: any;
    onClickItem: (item: any) => void;
}

export class SearchResult<SearchBox> extends React.Component<Props> {


    componentDidUpdate() {
        //console.log("zmiana2")
    }

    clickItem = (event: any) => {
        this.props.onClickItem(event)

    }

    render() {
        return (

            <List className='listBox'>
                {this.props.result?.map((obj, index) => {
                    return <SearchResultItem key={index} item={obj} onClickItem={this.clickItem}></SearchResultItem>
                })}

            </List>

        )
    }
}

export default SearchResult;
