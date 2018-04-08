import React, { Component } from "react";
import { connect } from "react-redux";
import Chart from "../components/chart";
import GoogleMap from "../components/google_map";

class WeatherList extends Component {
  renderWeather(cityData) {
    const temps = _.map(
      cityData.list.map(weather => weather.main.temp),
      temp => temp - 273
    );
    const pressure = cityData.list.map(weather => weather.main.pressure);
    const humidity = cityData.list.map(weather => weather.main.humidity);
    return (
      <tr key={cityData.city.name}>
        <td>
          <GoogleMap data={cityData.city} />
        </td>
        <td>
          <Chart data={temps} color="red" units="°C" />
        </td>
        <td>
          <Chart data={pressure} color="blue" units="hPa" />
        </td>
        <td>
          <Chart data={humidity} color="green" units="%" />
        </td>
      </tr>
    );
  }

  render() {
    return (
      <table className="table table-hover">
        <thead>
          <tr>
            <th> City </th>
            <th> Temperature(°C) </th>
            <th> Pressure(hPa) </th>
            <th> Humidity( % ) </th>
          </tr>
        </thead>
        <tbody> {this.props.weather.map(this.renderWeather)} </tbody>
      </table>
    );
  }
}

// Identical to
// function mapStateToProps(state) {
//   return { weather: state.weather };
// }
function mapStateToProps({ weather }) {
  return {
    weather
  };
}

export default connect(mapStateToProps)(WeatherList);
