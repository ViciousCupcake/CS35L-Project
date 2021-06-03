import React, { Component } from 'react';
import { Map, GoogleApiWrapper, InfoWindow, Marker } from 'google-maps-react';
import axios from 'axios';
import './styling/PostMap.css'


var googleMapsAPIKey = "INSERT GOOGLE MAPS API KEY HERE";

export class MapContainer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: [],
            locationlist: [],
            latlist: [],
            lnglist: [],
            locationdatalist: [],
            markerarglist: [],
            showingInfoWindow: false,  // Hides or shows the InfoWindow
            activeMarker: {},          // Shows the active marker upon click
            selectedPlace: {},
            Markerlist: [],
            isloading: true,
            furthestloaded: -1
        }

    };

    makemarker(i) {
        if (i <= this.state.furthestloaded) {
            console.log(this.state.data[this.state.locationdatalist[i]]);
            return (
                <Marker
                    onClick={this.onMarkerClick}
                    name={this.state.data[this.state.locationdatalist[i]].first_name}
                    link={this.state.data[this.state.locationdatalist[i]]._id}
                    title={this.state.data[this.state.locationdatalist[i]].title}
                    content={this.state.data[this.state.locationdatalist[i]].content}
                    likes={this.state.data[this.state.locationdatalist[i]].likes.length}
                    position={{
                        lat: this.state.markerarglist[i][0],
                        lng: this.state.markerarglist[i][1]
                    }}

                />
            );
        }
    }

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

                var waitarray = [];
                for (var j = 0; j < this.state.locationlist.length; j++) {
                    waitarray.push(axios.get(`https://maps.googleapis.com/maps/api/geocode/json?address=${this.state.locationlist[j]}&key=${googleMapsAPIKey}`));
                }
                Promise.all(waitarray)
                    .then(responses => responses.forEach(response => {
                        var data = [];
                        data.push(response.data.results[0].geometry.location.lat);
                        data.push(response.data.results[0].geometry.location.lng);
                        var data2 = this.state.markerarglist;
                        data2.push(data);
                        this.setState({ markerarglist: data2 });
                        this.setState({ isloading: false });
                        this.setState({ furthestloaded: (this.state.markerarglist.length - 1) });
                    }))
                    .catch(err => {
                        console.error(err);
                    })
            })
            .catch(err => {
                console.error(err);
            })

    };

    render() {

        return (
            <Map
                google={this.props.google}
                zoom={6}
                initialCenter={
                    {
                        lat: 34.0689,
                        lng: -118.4452
                    }
                }
                className="postMap"
            >

                {this.makemarker(0)}
                {this.makemarker(1)}
                {this.makemarker(2)}
                {this.makemarker(3)}
                {this.makemarker(4)}
                {/* can hardcode beyond number of locations with no issues */}
                {this.makemarker(5)}
                {this.makemarker(6)}
                {this.makemarker(7)}
                {this.makemarker(8)}
                {this.makemarker(9)}
                {this.makemarker(10)}
                {this.makemarker(11)}
                {this.makemarker(12)}
                {this.makemarker(13)}
                {this.makemarker(14)}

                <InfoWindow
                    marker={this.state.activeMarker}
                    visible={this.state.showingInfoWindow}
                    onClose={this.onClose}
                >
                    <div>
                        <h2>{this.state.selectedPlace.title}</h2>
                        <h3>{this.state.selectedPlace.content}</h3>
                        <h5>{"Post by: " + this.state.selectedPlace.name}</h5>
                        <h6>{"Likes: " + this.state.selectedPlace.likes}</h6>
                        <a href={`/post/${this.state.selectedPlace.link}`}> See more info</a>
                    </div>
                </InfoWindow>


            </Map>
        );
    }
}

export default GoogleApiWrapper(
    (props) => ({
        apiKey: googleMapsAPIKey
    }
    ))(MapContainer)
