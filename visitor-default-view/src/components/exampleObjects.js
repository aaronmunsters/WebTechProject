/*
function listToObj(lst) {
  let res = {};
  lst.forEach((v, i) => {
    res[i.toString()] = v;
  });
  return res;
}

function objToList(obj) {
  let res = [];
  Object.keys(obj).forEach(v => {
    res.push(obj[v]);
  });
  return res;
}
*/

const examplePage = {
  id: 1,
  title: "Facebook - Home",
  author: "WoxPace",
  published: true,
  compsL: [],
  compsM: [496843235],
  compsR: [],
  date: "07-12-2019",
  url: "/home",
  layout: 123456789
};

// This is a string!
const exampleNavContent = JSON.stringify({
  brand: "WoxPace",
  links: { Home: "/home", Contact: "/contact" }
});

const exampleLayout = {
  id: 1,
  columnType: "single", // "single", "small-left", "small-right", "triple"
  backgroundType: "blue",
  backgroundColor: "rgb(132, 255, 21)",
  backgroundPicture: 1351651315584,
  navbar: true,
  navcontent: exampleNavContent,
  footer: true,
  footcontent: "WoxPace™ - Made possible thanks to Aäron, Wolf and Corneel"
};

const exampleComponent = {
  id: 496843235,
  author: "WoxPace",
  title: "Welcome-text",
  tags: ["text", "welcome"],
  type: "text", // "carrousel" / "container" / "text" / "general" / "button" / "clickablePicture" / "pictureFolder"
  content: "#Hello world!\nThis is working yall :)",
  pages: [123, 456, 798],
  data: "07-12-2019"
};

const examples = { examplePage, exampleLayout, exampleComponent };

export default examples;
