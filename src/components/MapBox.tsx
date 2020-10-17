import React from "react";
import mapboxgl from "mapbox-gl";
import { MAPBOX_ACCESS_TOKEN } from "../models/MapBoxToken";
import "./Map.css";

mapboxgl.accessToken = MAPBOX_ACCESS_TOKEN;

type Props = {
    longitude: number;
    latitude: number;
};

type State = {
    lng: number;
    lat: number;
    zoom: number
};
class MapBox extends React.Component<Props, State> {
    private mapContainer: any;
    private map: any;

    constructor(props: any) {
        super(props);
        this.state = {
            lng: 5,
            lat: 34,
            zoom: 2
        };
    }

    componentDidMount(): void {
        this.map = new mapboxgl.Map({
            container: this.mapContainer,
            center: [this.props.longitude, this.props.latitude],
            style: 'mapbox://styles/mapbox/streets-v11',
            zoom: 2
        });

        this.map.on('move', () => {
            this.setState({
                lng: this.map.getCenter().lng.toFixed(4),
                lat: this.map.getCenter().lat.toFixed(4),
                zoom: this.map.getZoom().toFixed(2)
            });
        });


        // Add navigation controls to the top right of the canvas
        this.map.addControl(new mapboxgl.NavigationControl());

        new mapboxgl.Marker()
            .setLngLat([12.550343, 55.665957])
            .addTo(this.map);
    }
    render(): JSX.Element {
        return (
            <div>
                <div className='sidebarStyle'>
                    <div>Longitude: {this.state.lng} | Latitude: {this.state.lat} | Zoom: {this.state.zoom}</div>
                </div>
                <div ref={el => this.mapContainer = el} className='mapContainer' />
            </div>
        );
    }
}

export default MapBox;