import React, { Component } from 'react';
import './styling/SinglePagePost.css';
import '../App.css';
import MapContainer from './GoogleMapsLinker';



class GoogleMaps extends Component {


    render() {
        return (
            <MapContainer/>
        );
    }
}

export default GoogleMaps;