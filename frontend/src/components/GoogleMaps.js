import React, { Component } from 'react';
import './styling/SinglePagePost.css';
import '../App.css';
import './styling/homepageButton.css'
import './styling/PostMap.css'

import MapContainer from './GoogleMapsLinker';



class GoogleMaps extends Component {


    render() {
        return (
            <div>
                <button onClick={() => {window.location = '/'}} className="returnHomeButton">Return to Homepage</button>
                <MapContainer />
                <p> {/* To make CSS render properly */}
                    &#8203;
                </p>
            </div>
        );
    }
}

export default GoogleMaps;
