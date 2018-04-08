import _ from "lodash";
import { FETCH_POSTS, FETCH_POST, DELETE_POST } from "../actions";

export default function(state = {}, action) {
  switch (action.type) {
    case FETCH_POSTS:
      //transform an array to an object: easier/faster lookup methods
      return _.mapKeys(action.payload.data, "id");
    case FETCH_POST:
      const post = action.payload.data;
      //ES5 syntax equivalent to the ES6 below
      // const newState = {...state}
      // newState[post.id] = post;
      // return newState;
      // If post already exists in state object, post is overwritten
      return { ...state, [post.id]: post };
    case DELETE_POST:
      //remove the id of the post that is deleted (otherwise it is still in the big list of posts)
      return _.omit(state, action.payload);
    default:
      return state;
  }
}
