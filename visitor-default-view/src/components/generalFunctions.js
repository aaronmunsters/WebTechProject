import {
  hostname,
  port,
  apiLocation,
  componentLocation,
  hostPrefix,
  getPageLocation,
  getLayoutLocation,
  imageLocation,
  commentLocation,
  pathLocation
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
  return hostPrefix + hostname + port + apiLocation + locations[type];
}

export async function getApiObject(type, id, errorf = console.log) {
  const response = await axios.get(getURL(type) + id).catch(errorf);
  if (response && response.data) return response.data;
  return null;
}

export async function postApiObject(type, id, object, errorf = console.log) {
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
