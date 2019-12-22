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
  defaultUrl,
  updateInterval
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

if (development)
  console.warn("RUNNING IN DEVELOPMENT MODE; LIVEUPDATE IS POSSIBLE");
function getURL(type) {
  // eg.: http://localhost:3001/api/layout/123456789
  if (development)
    return hostPrefix + hostname + port + apiLocation + locations[type];
  return new URL(document.URL).origin + apiLocation + locations[type];
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

/* ###############################
   ### SELFUPDATING COMPONENTS ###
   ############################### */

// To assign unique ID per object // https://stackoverflow.com/a/9957331
let __next_objid = 1;
function objectId(obj) {
  if (obj == null) return null;
  if (obj.__obj_id == null) obj.__obj_id = __next_objid++;
  return obj.__obj_id;
}

/*
As every component requires details from the backend
to know how they will be rendered, it's possible to
fetch changes every n (mili-)seconds. As these changes
will affect the components, these will be set in their
state. The way React handles states, this means these
components will update reactive. Because these changes
require an update-callback specific per component, but
further no changes, we can generarlise this here in this
document.

These next functions provide the general update approach
*/

const components = {};

export function requestUpdate(component, updateCallback) {
  // if not developing, return early
  if (!development) return;
  // prepare async update function
  async function update() {
    const tools = components[objectId(component)];
    if (tools.prevDone) {
      tools.prevDone = false;
      await tools.callback();
      tools.prevDone = true;
    }
  }

  // add callback and updatefunction to datastructure
  components[objectId(component)] = {
    callback: updateCallback,
    prevDone: true,
    interval: setInterval(update, updateInterval)
  };
}

export function stopRequestUpdate(component) {
  // if not developing, return early
  if (!development) return;
  // remove and stop calling update function
  clearInterval(components[objectId(component)].interval);
  delete components[objectId(component)]; // to save memory
}
