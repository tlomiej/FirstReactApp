import React from 'react';


interface Props {
    result?: string;
}

export class SearchResult<SearchBox> extends React.Component<Props> {

    render() {

        return (
            <div>
                <h1>Wynik</h1>
                {this.props.result}
            </div>
        )
    }
}

export default SearchResult;
