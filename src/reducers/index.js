import {
  SET_ARTICLE_DETAILS,
  API_START,
  API_END,
  FETCH_ARTICLE_DETAILS
} from "../constants";

export default function(state = {data:{results:[],info:{} }}, action) {
  switch (action.type) {
    case SET_ARTICLE_DETAILS:
      return { data: action.payload };
    case API_START:
      if (action.payload === FETCH_ARTICLE_DETAILS) {
        return {
          ...state,
          isLoadingData: true
        };
      }
      break;
    case API_END:
      if (action.payload === FETCH_ARTICLE_DETAILS) {
        return {
          ...state,
          isLoadingData: false
        };
      }
      break;
    default:
      return state;
  }
}
