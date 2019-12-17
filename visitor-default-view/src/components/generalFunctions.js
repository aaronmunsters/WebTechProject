import {
  hostname,
  port,
  apiLocation,
  componentLocation,
  hostPrefix,
  getPageLocation,
  getLayoutLocation,
  imageLocation,
  commentLocation
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
  comment: commentLocation
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

export async function postApiObject(type, object, errorf = console.log) {
  const response = await axios.post(getURL(type), object).catch(errorf);
  if (response && response.data) return response.data;
  return null;
}

/* #############################
   ### COMPLEMENT COLOR CALC ###
   ############################# */
const complFactor = 80;
const rbgThreshold = 125;

export function oldComplColor(rgb) {
  const colorArr = rgb
    .split("(")[1]
    .split(")")[0]
    .split(",")
    .map(n => parseInt(n));

  const avgRgbVal = colorArr.reduce((a, n) => a + n) / 3;
  const colorShift = avgRgbVal > rbgThreshold ? -complFactor : +complFactor;
  const complArr = colorArr.map(n => n + colorShift);
  return "rgb(" + complArr[0] + "," + complArr[1] + "," + complArr[2] + ")";
}

export function complementColor(rgb) {
  return "rgba(255,255,255,0.5)";
}
