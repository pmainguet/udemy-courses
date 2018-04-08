import React, { Component } from "react";

class GoogleMap extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    new google.maps.Map(this.refs.map, {
      zoom: 12,
      center: {
        lat: parseFloat(this.props.data.coord.lat),
        lng: parseFloat(this.props.data.coord.lon)
      }
    });
  }
  render() {
    //in order to use this.refs.map
    return <div ref="map" />;
  }
}

export default GoogleMap;
