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
        // console.log("test" + i + this.state.furthestloaded);

        if (i <= this.state.furthestloaded) {
            console.log('test' + i);
            console.log(this.state.markerarglist[i][0]+ ": " + this.state.markerarglist[i][1]);
            return (
                <Marker
                    onClick={this.onMarkerClick}
                    name={'UCLA'}
                    position = {{
                        lat: this.state.markerarglist[i][0],
                        lng: this.state.markerarglist[i][1]
                    }}
                    
                />
            );
        }
    }



    // showMarkers() {
    //     for (var i = 0; i < this.state.markerarglist.length; i++) {
    //         if (i <= this.state.furthestloaded) {

    //         }            
    //         console.log("testing");
    //         this.state.Markerlist.push(this.makemarker(i));
    //     }
    //     return{
    //       {this.state.Markerlist}
    //     }
    // }
    makeinfowindow(i) {
        <InfoWindow
            marker={this.state.activeMarker}
            visible={this.state.showingInfoWindow}
            onClose={this.onClose}
        >
            <div>
                <h4>{this.state.selectedPlace.name}</h4>
            </div>
        </InfoWindow>
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
                        console.log(this.state.locationdatalist);
                    }
                }
                for (var j = 0; j < this.state.locationlist.length; j++) {
                    axios.get(`https://maps.googleapis.com/maps/api/geocode/json?address=${this.state.locationlist[j]}&key=AIzaSyDMwA04uo7ZnSSigDPQ3gjShffoxtdpi4M`)
                        .then(response => {
                            var data = [];
                            data.push(response.data.results[0].geometry.location.lat);
                            data.push(response.data.results[0].geometry.location.lng);
                            var data2 = this.state.markerarglist;
                            data2.push(data);
                            this.setState({markerarglist: data2});
                            this.setState({ isloading: false });
                            this.setState({furthestloaded: (this.state.markerarglist.length - 1)});
                            console.log(this.state.furthestloaded);
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
                zoom={6}
                initialCenter={
                    {
                        lat: 34.0689,
                        lng: -118.4452
                    }
                }
                className="postMap"
            >
                {/* <script>
                    for (var i; i < this.state.markerarglist.length; i++)
                    {this.makemarker(0)}
                </script> */}
                
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



            </Map>
        );
    }
}

export default GoogleApiWrapper(
    (props) => ({
        apiKey: "AIzaSyDMwA04uo7ZnSSigDPQ3gjShffoxtdpi4M"
    }
    ))(MapContainer)



                // {/* <Marker
                //     onClick={this.onMarkerClick}
                //     name={'UCLA'}
                //     position = {{
                //         lat: 34.09,
                //         lng: -118.4452
                //     }}
                // />
                // <InfoWindow
                //     marker={this.state.activeMarker}
                //     visible={this.state.showingInfoWindow}
                //     onClose={this.onClose}
                // >
                //     <div>
                //         <h4>{this.state.selectedPlace.name}</h4>
                //     </div>
                // </InfoWindow> */}



                // {/* {this.state.Markerlist} */}