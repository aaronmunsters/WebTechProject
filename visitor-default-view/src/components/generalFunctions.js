import {
  hostname,
  port,
  apiLocation,
  componentLocation,
  hostPrefix,
  getPageLocation,
  getLayoutLocation
} from "../defaults.json";
import axios from "axios";

export function parseProps(obj, props) {
  props.forEach(p => {
    console.log(
      "now about to parse",
      p,
      "of object",
      obj,
      "which is",
      obj[p],
      "and of type",
      typeof obj[p]
    );
    return (obj[p] = JSON.parse(obj[p]));
  });
}

const locations = {
  component: componentLocation,
  page: getPageLocation,
  layout: getLayoutLocation
};

export async function getApiObject(type, id) {
  const getURL = // eg.: http://localhost:3001/api/layout/123456789
    hostPrefix + hostname + port + apiLocation + locations[type] + id;
  return (await axios.get(getURL)).data;
}
