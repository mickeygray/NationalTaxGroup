import {
  SET_RECENT,
  GET_LEADS,
  UPDATE_USER,
  DELETE_REMINDER,
  DELETE_RECENTLEAD,
} from "../types";

export default (state, action) => {
  switch (action.type) {
    case SET_RECENT:
      return {
        ...state,
        recentLeads: action.payload,
      };
    case GET_LEADS:
      return {
        ...state,
        prospects: action.payload,
      };
    case UPDATE_USER:
      return {
        ...state,
        users: state.users.map((user) =>
          user._id === action.payload._id ? action.payload : user
        ),
      };
    case DELETE_REMINDER:
      return {
        ...state,
        reminders: state.reminders.filter(
          (reminder) => reminder._id !== action.payload
        ),
      };
    case DELETE_RECENTLEAD:
      return {
        ...state,
        recentLeads: console.log(state),
      };
    default:
      return state;
  }
};
