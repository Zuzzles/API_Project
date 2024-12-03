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

const removeSpot = () => {
  return {
    type: REMOVE_SPOT
  };
};

export const getAllSpots = () => async (dispatch) => {
  const response = await csrfFetch("/api/spots");
  const data = await response.json();
  dispatch(getSpots(data.Spots));
  return response;
};

export const getSpotById = (spotId) => async (dispatch) => {
  const response = await csrfFetch(`/api/spots/${spotId}`);
  const data = await response.json();
  dispatch(postSpot(data));
  return response;
}

export const createNewSpot = (spot) => async (dispatch) => {
  const { address, city, state, country, lat, lng, name, description, price } = spot;
  const response = await csrfFetch("/api/spots", {
    method: "POST",
    body: JSON.stringify({
      address, 
      city, 
      state, 
      country, 
      lat, 
      lng, 
      name, 
      description, 
      price
    })
  });
  const data = await response.json();
  dispatch(postSpot(data.spot));
  return response;
};

const initialState = { spots: null };

const spotsReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_SPOTS:
      return { ...state, spots: action.payload };
    case POST_SPOT:
      return { ...state, spot: action.payload };
    default:
      return state;
  }
};

export default spotsReducer;