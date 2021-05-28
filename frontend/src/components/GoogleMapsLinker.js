import React, { Component } from 'react';
import { Map, GoogleApiWrapper, InfoWindow, Marker } from 'google-maps-react';
import axios from 'axios';
import './styling/PostMap.css'

// class MarkerObject extends React.Component{
    // onMarkerClick = (props, marker, e) =>
    //     this.setState({
    //         selectedPlace: props,
    //         activeMarker: marker,
    //         showingInfoWindow: true
    //     });

    // onClose = props => {
    //     if (this.state.showingInfoWindow) {
    //         this.setState({
    //             showingInfoWindow: false,
    //             activeMarker: null
    //         });
    //     }
    // };

//     return (
//             // <Marker
//             //     onClick={this.onMarkerClick}
//             //     name={'props.'}
//             // />
//             // <InfoWindow
//             //     marker={this.state.activeMarker}
//             //     visible={this.state.showingInfoWindow}
//             //     onClose={this.onClose}
//             // >
//             //     <div>
//             //         <h4>{this.props.data.first_name}</h4>
//             //     </div>
//             // </InfoWindow>
//         // </>
//     )
// }

export class MapContainer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: [],
            locationlist: [],
            latlist: [],
            lnglist: [],
            locationdatalist: [],
            showingInfoWindow: false,  // Hides or shows the InfoWindow
            activeMarker: {},          // Shows the active marker upon click
            selectedPlace: {},
            Markerlist: []
        }

    };

    // showMarkers() {
    //     let Markerdisplay = []
    //     for (var i = 0; i < this.state.Markerlist.length; i++) {
    //         Markerlist.push(this.renderMarker());
    //     }
    // }

    // renderMarker() {
    //     for (var i = 0; i < this.state.locationlist.length; i++) {
    //         return (
    //             <MarkerObject

    //                 latlist={this.latlist[i]}
    //                 lnglist={this.lnglist[i]}
    //                 data = {this.data[locationdatalist[i]]}
    //             />
    //         )
    //     }
    // }
    onMarkerClick = (props, marker, e) =>
        this.setState({
            selectedPlace: props,
            activeMarker: marker,
            showingInfoWindow: true
        });

    onClose = props => {
        if (this.state.showingInfoWindow) {
            this.setState({
                showingInfoWindow: false,
                activeMarker: null
            });
        }
    };
    componentDidMount() {
        axios.get(`http://${window.BACKEND_URL}/api/submissions/`)
            .then(response => {
                this.setState({ data: (response.data) })
                for (var i = 0; i < this.state.data.length; i++) {
                    if (this.state.data[i].location !== "") {
                        this.state.locationlist.push(this.state.data[i].location);
                        this.state.locationdatalist.push(i);
                    }
                }
                for (var j = 0; j < this.state.locationlist.length; j++) {
                    axios.get(`https://maps.googleapis.com/maps/api/geocode/json?address=${this.state.locationlist[j]}&key=AIzaSyDMwA04uo7ZnSSigDPQ3gjShffoxtdpi4M`)
                        .then(response => {
                            this.state.latlist.push(response.data.results[0].geometry.location.lat);
                            this.state.lnglist.push(response.data.results[0].geometry.location.lng);
                        })
                        .catch(err => {
                            console.error(err);
                        })
                }
            })
            .catch(err => {
                console.error(err);
            })
    };

    render() {
        return (
            <Map
                google={this.props.google}
                zoom={14}
                initialCenter={
                    {
                        lat: 34.0689,
                        lng: -118.4452
                    }
                }
                className="postMap"
            >
                <Marker
                    onClick={this.onMarkerClick}
                    name={'UCLA'}
                />
                <InfoWindow
                    marker={this.state.activeMarker}
                    visible={this.state.showingInfoWindow}
                    onClose={this.onClose}
                >
                    <div>
                        <h4>{this.state.selectedPlace.name}</h4>
                    </div>
                </InfoWindow>
                {this.state.Markerlist}
            </Map>
        );
    }
}

export default GoogleApiWrapper(
    (props) => ({
        apiKey: "AIzaSyDMwA04uo7ZnSSigDPQ3gjShffoxtdpi4M"
    }
    ))(MapContainer)

