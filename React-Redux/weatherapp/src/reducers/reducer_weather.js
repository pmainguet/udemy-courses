import { FETCH_WEATHER } from "../actions/index";
export default function(state = [], action) {
  switch (action.type) {
    case FETCH_WEATHER:
      if (!action.payload.data) {
        return state;
      } else {
        //identical to return [action.payload.data].concat(state);
        return [action.payload.data, ...state];
      }
  }
  return state;
}
