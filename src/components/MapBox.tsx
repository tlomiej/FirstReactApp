import React from 'react';
import ReactDOM from 'react-dom';
import mapboxgl from 'mapbox-gl';

import { MAPBOX_ACCESS_TOKEN } from "../models/MapBoxToken";

mapboxgl.accessToken = MAPBOX_ACCESS_TOKEN;

interface mapBox {

}

class Application extends React.Component {
    constructor(props: Readonly<{}>) {
        super(props);
        this.state = {
            lng: 5,
            lat: 34,
            zoom: 2
        };
    }

    componentDidMount() {
        const map = new mapboxgl.Map({
            container: this.mapContainer,
            style: 'mapbox://styles/mapbox/streets-v11',
            center: [this.state.lng, this.props.lat],
            zoom: this.state.zoom
        });
    }

}

ReactDOM.render(<Application />, document.getElementById('app'));