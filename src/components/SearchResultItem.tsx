import { eventNames } from 'process';
import React from 'react';
import './SearchResult.css'


interface Props {
    item: any;
    onClickItem: (item: any) => void;
}

export class SearchResultItem<SearchBox> extends React.Component<Props> {

    clickItem = ()=>{

        this.props.onClickItem(this.props.item)
    }

    render() {
        return (
            <div>

               
                return <div className='item' onClick={this.clickItem}>{this.props.item.display_name} </div>;
             

               
            </div>)
    }
}

export default SearchResultItem;
