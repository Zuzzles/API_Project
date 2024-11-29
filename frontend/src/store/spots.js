import { csrfFetch } from './csrf';

const GET_SPOTS = "spots/getSpots";
const POST_SPOT = "spots/postSpot";
const EDIT_SPOT = "spots/editSpot";
const REMOVE_SPOT = "spots/removeSpot";

const getSpots = (spots) => {
    return {
        type: GET_SPOTS,
        payload: spots
    };
};

const postSpot = (spot) => {
  return {
    type: POST_SPOT,
    payload: spot
  };
};

const editSpot = (spot) => {
  return {
    type: EDIT_SPOT,
    payload: spot
  };
};

const removeSpot = () => {
  return {
    type: REMOVE_SPOT
  };
};

export const getAllSpots = () => async (dispatch) => {
  const response = await csrfFetch("/api/spots");
  console.log(response);
  const data = await response.json();
  console.log(data)
  dispatch(getSpots(data.Spots));
  return response;
};

export const signup = (user) => async (dispatch) => {
  const { username, firstName, lastName, email, password } = user;
  const response = await csrfFetch("/api/users", {
    method: "POST",
    body: JSON.stringify({
      username,
      firstName,
      lastName,
      email,
      password
    })
  });
  const data = await response.json();
  dispatch(setUser(data.user));
  return response;
};


const initialState = { spots: null };

const spotsReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_SPOTS:
      return { ...state, spots: action.payload };
    default:
      return state;
  }
};

export default spotsReducer;