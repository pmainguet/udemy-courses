//package "similar" to jquery.ajax to solely make ajax request:
//pass a url and return a promise (similar to event listner but can only succeed of fail once and
//correct chain of callbacks
import axios from "axios";

const API_KEY = "073ab63c5d0d11f49b2a5c86173ce500";
const ROOT_URL = `https://api.openweathermap.org/data/2.5/forecast?appid=${API_KEY}`;

//in order to be consistant between action and reducer
export const FETCH_WEATHER = "FETCH_WEATHER";

export function fetchWeather(city) {
  const url = `${ROOT_URL}&q=${city},us`;
  const request = axios.get(url);
  return {
    type: FETCH_WEATHER,
    payload: request
  };
}
