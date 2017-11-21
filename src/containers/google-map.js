import React, { Component } from 'react';
import { connect } from 'react-redux';

  const DEFAULT_POSITION = {
    lat: 25.8136,
    lng: 8.1339
  };
  const EUROPE_POSITION = {
      lat: 46.6365,
      lng: 14.3122
  }
  const UNITED_STATES_POSITION = {
    lat: 37.7098,
    lng: -95.6975
}
const ASIA_POSITION = {
    lat: 25.9288,
    lng: 92.9476
}
const OCEANIA_POSITION = {
    lat: -25.29539574,
    lng: 133.13310289
}
const AFRICA_POSITION = {
    lat: 4.3947,
    lng: 18.5582
}
const MIDDLE_EAST_POSITION = {
    lat: 29.5647968,
    lng: 53.8671868
}
const SOUTH_AMERICA_POSITION = {
    lat: -22.6820,
    lng: -64
}
const CANADA_ALASKA_POSITION = {
    lat: 25.9288,
    lng: 92.9476
}
var allMarkers = [];
  class Map extends Component {
    constructor(props) {
      super(props);
    }
    
    componentDidMount() {
        this.googleMap = new google.maps.Map(this.refs.googleMap, {
            center: DEFAULT_POSITION,
            zoom: 1
          });
    }
    componentDidUpdate(){
        this.clearMarkers()
        this.props.weather.map((indivCity) => {
            console.log('The individual city is printing: ', indivCity)
            var eachValue = this.renderMarkers(indivCity)
            // console.log(eachValue)
            allMarkers.push(eachValue)
            console.log(allMarkers.length)
            console.log(allMarkers)
            return allMarkers
        })
    }
    clearMarkers() {
        for (var i = 0; i < allMarkers.length; i++) {
         console.log(allMarkers)
          allMarkers[i].setMap(null);
        }
        allMarkers = [];
    }
    panToLocation(location, num) {
        console.log(this)
        this.googleMap.setZoom(num)
        this.googleMap.panTo(location)
      }
    
    renderMarkers(city) {
        console.log('These are the cities that renderMarkers is using: ', city)
        console.log(this.googleMap)
        // var uluru = {lat: -25.363, lng: 131.044};
        
        var position = {
            lat: parseFloat(city.myData.latitude),
            lng: parseFloat(city.myData.longitude)
        }
        var contentString = `${city.myData.city_name} in ${city.myData.month_name} is often ${city.cloud_cover.cond} with a ${parseInt(city.chance_of.chanceofsnowday.percentage) + parseInt(city.chance_of.chanceofrainday.percentage)}% chance of Rain or Snow.`

        var infowindow = new google.maps.InfoWindow({
          content: contentString,
          maxWidth: 200
        });

        var marker = new google.maps.Marker({
          position: position,
          map: this.googleMap,
          title: city.myData.city_name
        });

        marker.addListener('click', function() {
          infowindow.open(this.googleMap, marker);
        });
        
        return marker
      }

    render() {
      const mapStyle = {
        width: 500,
        height: 300,
        border: '1px solid black'
      };
      
      return (
          <div>
        <div id="maping-buttons">
            <button onClick={ () => this.panToLocation(DEFAULT_POSITION, 1)}>World View</button>
          <button onClick={ () => this.panToLocation(EUROPE_POSITION, 4)}>Europe</button>
          <button onClick={ () => this.panToLocation(UNITED_STATES_POSITION, 4)}>US</button>
          <button onClick={ () => this.panToLocation(ASIA_POSITION, 3)}>Asia</button>
          <button onClick={ () => this.panToLocation(AFRICA_POSITION, 3)}>Africa</button>
          <button onClick={ () => this.panToLocation(OCEANIA_POSITION, 3)}>Oceania</button>
          <button onClick={ () => this.panToLocation(SOUTH_AMERICA_POSITION, 3)}>South America</button>
          <button onClick={ () => this.panToLocation(MIDDLE_EAST_POSITION, 4)}>Middle East</button>
          </div>
          <div ref="googleMap" id="map">I should be a map!</div>
        </div>
      );
    }
  }

  function mapStateToProps({ weather }) {
    return {
        weather
    }
}

export default connect(mapStateToProps)(Map);
  