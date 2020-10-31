import React from "react";
import mapboxgl from "mapbox-gl";
import { MAPBOX_ACCESS_TOKEN } from "../models/MapBoxToken";
import "./Map.css";
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
            zoom: 0,
            points: []
        };
    }

    componentDidMount(): void {
        this.map = new mapboxgl.Map({
            container: this.mapContainer,
            center: [this.props.longitude, this.props.latitude],
            style: 'mapbox://styles/mapbox/streets-v11',
            zoom: 12,
            pitch: 45
        });

        this.map.on('load', () => {

            this.map.addSource('point', {
                'type': 'geojson',
                'data': {
                    'type': 'FeatureCollection',
                    'features': []
                }
            });
            this.map.addLayer({
                'id': 'points',
                'source': 'point',
                'type': 'circle',
                'paint': {
                    'circle-radius': 20,
                    'circle-color': 'red'
                }
            });
        }
        );

        this.map.on('move', () => {
            this.setState({
                lng: this.map.getCenter().lng.toFixed(4),
                lat: this.map.getCenter().lat.toFixed(4),
                zoom: this.map.getZoom().toFixed(2)
            });
        });

    }

    private getDataFromMapQuest = (event: any) => {
        console.log("getDataFromMapQuest =>", event)
        let objectData: any = event.results[0].locations.map((obj: any) => {
            return {
                'type': 'Feature',
                'geometry': {
                    'type': 'Point',

                    'coordinates': [parseFloat(obj.latLng.lng), parseFloat(obj.latLng.lat)]
                }
            }
        })

        let geoJsonData = {
            'type': 'FeatureCollection',
            'features': []
        }
        geoJsonData.features = objectData;

        if (!this.map.getSource('mapQuestLayer')) {
            this.map.addSource('mapQuestLayer', {
                'type': 'geojson',
                'data': {
                    'type': 'FeatureCollection',
                    'features': []
                }
            });
            this.map.addLayer({
                'id': 'mapQuestLayerId',
                'source': 'mapQuestLayer',
                'type': 'circle',
                'paint': {
                    'circle-radius': 10,
                    'circle-color': 'blue'
                }
            });
        }
        this.map.getSource('mapQuestLayer').setData(geoJsonData);

    }

    private getDataFromSearch = async (event: any) => {
        console.log("getDataFromSearch =>", event)
        let objectData: any = event.map((obj: any) => {
            return {
                'type': 'Feature',
                'geometry': {
                    'type': 'Point',
                    'coordinates': [parseFloat(obj.lon), parseFloat(obj.lat)]
                }
            }
        })
        console.log("GEoJson", objectData)
        this.setState({ points: objectData })

        let geoJsonData = {
            'type': 'FeatureCollection',
            'features': []
        }
        geoJsonData.features = objectData;

        if (!this.map.getSource('point')) {
            this.map.addSource('point', {
                'type': 'geojson',
                'data': {
                    'type': 'FeatureCollection',
                    'features': []
                }
            });
            this.map.addLayer({
                'id': 'points',
                'source': 'point',
                'type': 'circle',
                'paint': {
                    'circle-radius': 20,
                    'circle-color': 'red'
                }
            });
        }
        this.map.getSource('point').setData(geoJsonData);
        await this.map.flyTo({
            center:
                objectData[0].geometry.coordinates
            ,
            essential: true
        });

       //setTimeout(() => {
        //   this.rotateCamera(0);
        //}, 2000);


    }

    rotateCamera = (timestamp: number) => {
        this.map.rotateTo((timestamp / 150) % 360, { duration: 0 });
        requestAnimationFrame(this.rotateCamera);
    }

    render(): JSX.Element {
        return (
            <div>
              {/*   <div className='sidebarStyle'>
                    <div>Longitude: {this.state.lng} | Latitude: {this.state.lat} | Zoom: {this.state.zoom}</div>
                </div> */}
                <div className='searchStyle'>
                    <SearchBox onGetMapQuestData={this.getDataFromMapQuest} onGetData={this.getDataFromSearch}></SearchBox>
                </div>

                <div ref={el => this.mapContainer = el} className='mapContainer' />
            </div>
        );
    }
}

export default MapBox;