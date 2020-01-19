import { SET_ARTICLE_DETAILS, API, FETCH_ARTICLE_DETAILS } from "../constants";

export function fetchArticleDetails() {
  return apiAction({
    url: "https://rickandmortyapi.com/api/character/",
    onSuccess: setArticleDetails,
    onFailure: () => console.log("Error occured loading articles"),
    label: FETCH_ARTICLE_DETAILS
  });
}
export function fetchArticleByName(data) {
  return apiAction({
    url: "https://rickandmortyapi.com/api/character/",
    data:data,
    onSuccess: setArticleDetails,
    onFailure: () => console.log("Error occured loading articles"),
    label: FETCH_ARTICLE_DETAILS
  });
}
function setArticleDetails(data) {
  return {
    type: SET_ARTICLE_DETAILS,
    payload: data
  };
}

function apiAction({
  url = "",
  method = "GET",
  data = null,
  accessToken = null,
  onSuccess = () => {},
  onFailure = () => {},
  label = "",
  headersOverride = null
}) {
  return {
    type: API,
    payload: {
      url,
      method,
      data,
      accessToken,
      onSuccess,
      onFailure,
      label,
      headersOverride
    }
  };
}
