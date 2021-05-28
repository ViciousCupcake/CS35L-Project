import React, { Component } from 'react';
import './styling/SinglePagePost.css';
import '../App.css';
import './styling/homepageButton.css'

import MapContainer from './GoogleMapsLinker';



class GoogleMaps extends Component {


    render() {
        return (
            <div>
                {/* TODO: button doesn't work for some reason, but does if you comment out mapcontainer */}
                <button onClick={() => {window.location = '/'}} className="returnHomeButton">Return to Homepage</button>
                <MapContainer/>
                <p></p>
            </div>
        );
    }
}

export default GoogleMaps;