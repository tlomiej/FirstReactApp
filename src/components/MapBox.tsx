import React from "react";
import mapboxgl from "mapbox-gl";
import { MAPBOX_ACCESS_TOKEN } from "../models/MapBoxToken";
import "./Map.css";
import { pin } from "../graphics/pin"
import { SearchBox } from "./SearchBox"

mapboxgl.accessToken = MAPBOX_ACCESS_TOKEN;

type Props = {
    longitude: number;
    latitude: number;
};

type State = {
    lng: number;
    lat: number;
    zoom: number,
    data?: any
    points: Array<Object>
};
class MapBox extends React.Component<Props, State> {
    private mapContainer: any;
    private map: any;
    private marker: any;

    constructor(props: any) {
        super(props);
        this.state = {
            lng: 5,
            lat: 34,
            zoom: 2,
            points: []
        };
    }

    componentDidMount(): void {
        this.map = new mapboxgl.Map({
            container: this.mapContainer,
            center: [this.props.longitude, this.props.latitude],
            style: 'mapbox://styles/mapbox/streets-v11',
            zoom: 2
        });

        this.map.on('load', () => {
            this.map.loadImage(
                `${pin}`,
                (error: any, image: any) => {
                    if (error) throw error;
                    this.map.addImage('pin', image);
                    this.map.addSource('point', {
                        'type': 'geojson',
                        'data': {
                            'type': 'FeatureCollection',
                            'features': this.state.points
                        }
                    });
                    this.map.addLayer({
                        'id': 'points',
                        'type': 'symbol',
                        'source': 'point',
                        'layout': {
                            'icon-image': 'pin',
                            'icon-size': 0.25
                        }
                    });
                }
            );
        });

        this.map.on('move', () => {
            this.setState({
                lng: this.map.getCenter().lng.toFixed(4),
                lat: this.map.getCenter().lat.toFixed(4),
                zoom: this.map.getZoom().toFixed(2)
            });
        });

    }

    private getDataFromSearch = (event: any) => {
        console.log("SSSSSSSSSSSSSSSSSS1", event)
        let objectData: any = event.map( (obj: any) => {
            return {
                'type': 'Feature',
                'geometry': {
                    'type': 'Point',
                    'coordinates': [parseFloat(obj.lat), parseFloat(obj.lon)]
                }
            }
        })
        console.log("GEoJson",objectData)
        this.setState({points: objectData})
    }

    render(): JSX.Element {
        return (
            <div>
                <div className='sidebarStyle'>
                    <div>Longitude: {this.state.lng} | Latitude: {this.state.lat} | Zoom: {this.state.zoom}</div>
                </div>
                <div className='sidebarStyle'>
                    <SearchBox onGetData={this.getDataFromSearch}></SearchBox>
                </div>

                <div ref={el => this.mapContainer = el} className='mapContainer' />
            </div>
        );
    }
}

export default MapBox;