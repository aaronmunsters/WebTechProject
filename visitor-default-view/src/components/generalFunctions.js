import {
  hostname,
  port,
  apiLocation,
  componentLocation,
  hostPrefix,
  getPageLocation,
  getLayoutLocation,
  imageLocation
} from "../defaults.json";
import axios from "axios";

/* #############################
   ### FURTHER FIELD PARSING ###
   ############################# */
export function parseProps(obj, props) {
  props.forEach(p => (obj[p] = JSON.parse(obj[p])));
}

/* #################
   ### API CALLs ###
   ################# */
const locations = {
  component: componentLocation,
  page: getPageLocation,
  layout: getLayoutLocation,
  image: imageLocation
};

export async function getApiObject(type, id) {
  const getURL = // eg.: http://localhost:3001/api/layout/123456789
    hostPrefix + hostname + port + apiLocation + locations[type] + id;
  return (await axios.get(getURL)).data;
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
