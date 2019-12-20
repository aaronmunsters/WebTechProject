import {
  development,
  hostname,
  port,
  apiLocation,
  componentLocation,
  hostPrefix,
  getPageLocation,
  getLayoutLocation,
  imageLocation,
  commentLocation,
  pathLocation,
  logConnectionErrors,
  defaultUrl
} from "../defaults.json";
import axios from "axios";

/* #############################
   ### FURTHER FIELD PARSING ###
   ############################# */
export function parseProps(obj, props) {
  props.forEach(p => {
    const prop = obj[p]; // if the prop exists, parse it
    if (prop) obj[p] = JSON.parse(obj[p]);
  });
}

/* #################
   ### API CALLs ###
   ################# */
const locations = {
  component: componentLocation,
  page: getPageLocation,
  layout: getLayoutLocation,
  image: imageLocation,
  comment: commentLocation,
  path: pathLocation
};

function getURL(type) {
  // eg.: http://localhost:3001/api/layout/123456789
  if (development)
    return new URL(document.URL).origin + apiLocation + locations[type];
  return hostPrefix + hostname + port + apiLocation + locations[type];
}

const defErrF = logConnectionErrors ? console.log : n => {};

export async function getApiObject(type, id, errorf = defErrF) {
  let response;
  switch (type) {
    case "path":
      id = id.slice(1);
      if (!id) id = defaultUrl;
      response = await axios.get(getURL("page") + id, {
        params: { field: "url" }
      });
      break;
    default:
      // default behaviour is simple get-request
      response = await axios.get(getURL(type) + id).catch(errorf);
      break;
  }
  if (response && response.data) return response.data;
  return null;
}

export async function postApiObject(type, id, object, errorf = defErrF) {
  const response = await axios.post(getURL(type) + id, object).catch(errorf);
  if (response && response.data) return response.data;
  return null;
}

/* #############################
   ### COMPLEMENT COLOR CALC ###
   ############################# */
export function complementColor(rgb) {
  return "rgba(255,255,255,0.5)";
}
