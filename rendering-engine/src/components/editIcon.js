import { getApiObject } from "./generalFunctions";

// based on https://stackoverflow.com/a/2995536
function changeFavicon(src) {
  let docHead = document.head || document.getElementsByTagName("head")[0];
  var link = document.createElement("link"),
    oldLink = document.getElementById("dynamic-favicon");
  link.id = "dynamic-favicon";
  link.rel = "shortcut icon";
  link.href = src;
  if (oldLink) {
    docHead.removeChild(oldLink);
  }
  docHead.appendChild(link);
}

function setLayoutIcon(iconId) {
  // icon ID is refering to a known image in the back-end:
  const image = getApiObject("image", iconId);
  image.then(
    res => {
      if (res.id) changeFavicon(res.compressed_src);
    },
    err => {
      console.log(err);
    }
  );
}

export default setLayoutIcon;
