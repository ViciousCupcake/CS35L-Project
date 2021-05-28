import React, { Component } from 'react';
import { Map, GoogleApiWrapper, InfoWindow, Marker } from 'google-maps-react';
import axios from 'axios';

import './styling/GoogleMaps.css'

const mapStyles = {
    width: '100%',
    height: '100%'
};

export class MapContainer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: [],
            locationlist: [],
            locationlisted: false,
        }

    };

    state = {
        showingInfoWindow: false,  // Hides or shows the InfoWindow
        activeMarker: {},          // Shows the active marker upon click
        selectedPlace: {}          // Shows the InfoWindow to the selected place upon a marker
    };

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
                    if (this.state.data[i].location != "") {
                        this.state.locationlist.push(this.state.data[i].location);
                    }
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
                style={mapStyles}
                initialCenter={
                    {
                        lat: -1.2884,
                        lng: 36.8233
                    }
                }
            >
                <Marker
                    onClick={this.onMarkerClick}
                    name={'Kenyatta International Convention Centre'}
                />
                <InfoWindow
                    marker={this.state.activeMarker}
                    visible={this.state.showingInfoWindow}
                    onClose={this.onClose}
                >
                    <div>
                        <h4>hello</h4>
                    </div>
                </InfoWindow>
            </Map>
        );
    }
}

export default GoogleApiWrapper(
    (props) => ({
        apiKey: "AIzaSyDMwA04uo7ZnSSigDPQ3gjShffoxtdpi4M"
    }
    ))(MapContainer)



    // initMap() {
    //     var uluru = {lat: -25.344, lng: 131.036 };
    //     var map = new google.maps.Map(document.getElementById("map"), {
    //         center: uluru,
    //         zoom: 4,  
    //     });
    //     var marker = new google.maps.Marker({
    //         position: uluru,
    //     map: map,
    //     });
    // }