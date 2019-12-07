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
  compsL: [496843235],
  compsM: [496843235],
  compsR: [496843235],
  date: "07-12-2019",
  url: "/",
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
  content:
    "# Hi there\nWelcome to **WoxPace™**, glad you could make it! I'm sure you're wondering how you can start editting this beautiful website, to make it even more beautiful! Go ahead, check out the admin page!\n\nHow you may be wondering? It's easy, just navigate over to [the admin page](./admin) and play around with the settings! Scared to *break* stuff? Try 👇local👇 before you go 🌍global🌍.\n\nBe sure to check out our documentation, you can find it on [our site](https://aaronmunsters.github.io/WebTechProject/).\n\nThis site editor is ideal for people who just want a small scaled website and aren't in for starting to ```code all day long```, so let's start!\n\n![Just do it!](https://i.imgur.com/7524jhl.gif)\n\n## Other tutorials:\n1. Markdown\n2. WoxPace\n3. Setting up your own website\n\n## Authors\n* Corneel Soete\n* Aäron Munsters\n* Wolf De Wulf",
  pages: [123, 456, 798],
  data: "07-12-2019"
};

const examples = { examplePage, exampleLayout, exampleComponent };

export default examples;
