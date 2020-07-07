import {
  SET_EMAIL,
  GET_LIBRARY,
  POST_EMAIL,
  SEND_EMAIL,
  POST_CAMPAIGN,
  GET_CAMPAIGNS,
  PUT_EMAIL,
  SET_CAMPAIGN,
  DELETE_CAMPAIGN,
  DELETE_TEMPLATE,
  PUT_LIST,
} from "../types";

export default (state, action) => {
  switch (action.type) {
    case SET_EMAIL:
      return {
        ...state,
        email: action.payload,
      };
    case SET_CAMPAIGN:
      return {
        ...state,
        campaign: action.payload,
      };

    case PUT_EMAIL:
      return {
        ...state,
        campaign: action.payload,
      };

    case DELETE_CAMPAIGN:
      return {
        ...state,
        campaigns: state.campaigns.filter(
          (campaign) => campaign._id !== action.payload
        ),
      };
    case PUT_LIST:
      return {
        ...state,
        campaign: action.payload,
      };
    case GET_LIBRARY:
      return {
        ...state,
        emailLibrary: action.payload,
      };
    case GET_CAMPAIGNS:
      return {
        ...state,
        campaigns: action.payload,
      };
    case SEND_EMAIL:
      return {
        ...state,
        campaign: action.payload,
      };
    case POST_EMAIL:
      return {
        ...state,
        email: action.payload,
      };
    case POST_CAMPAIGN:
      return {
        ...state,
        campaign: action.payload,
      };
    default:
      return state;
  }
};
