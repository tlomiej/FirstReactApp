import React from 'react';
import { searchModel } from "./../models/SearchModel";
import './SearchResult.css'


interface Props {
    result: Array<searchModel>;
    resultMapQuest: any;
    onClickItem: (item: any) => void;
}

export class SearchResult<SearchBox> extends React.Component<Props> {


    componentDidUpdate() {
        //console.log("zmiana2")
    }

    clickItem = ()=>{

        this.props.onClickItem(this.props.result)
    }

    render() {
        return (
            <div>

                {this.props.result?.map((obj, index) => {

                return <div className='item' key={index} onClick={this.clickItem}>{obj.display_name} </div>;
                })}

                s
                {/*  MapQuest

                <ul>
                    {this.props.resultMapQuest.results[0].locations?.map((obj: any, index: any) => {
                        return <li style={this.resultStyle} key={index}>{obj.adminArea5}</li>;
                    })}
                </ul> */}
            </div>)
    }
}

export default SearchResult;
