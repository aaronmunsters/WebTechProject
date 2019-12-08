//import axios from "axios";
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
  compsL: [1], // component id's
  compsM: [3], //[2, 5, 6, 4, 3, 7, 8],
  compsR: [9],
  date: "07-12-2019",
  url: "/",
  layout: 123456789
};

const exampleLayout = {
  id: 1,
  title: "Default Layout",
  columnType: "triple", // "single", "small-left", "small-right", "triple"
  backgroundType: "color",
  backgroundColor: "rgb(50 , 50, 50)",
  backgroundPicture: "1351651315584",
  navbar: true,
  brand: "WoxPace",
  navcontent: { Home: "/home", Contact: "/contact" },
  footer: true,
  footcontent: "WoxPace™ - Made possible thanks to Aäron, Wolf and Corneel"
};

const exampleLeftText = {
  id: 1,
  author: "WoxPace",
  title: "Welcome-text",
  tags: ["text", "welcome"],
  type: "text", // "carrousel" / "container" / "text" / "general" / "button" / "clickablePicture" / "pictureFolder"
  content:
    "# Hi there\nHere on the left side is your left column, feel free to go wild!\n\nYou could maybe link some nice websites here? Check these out!\n\n[youtube](https://youtube.com)\n\n[Facebook](https://facebook.com)\n\n[Google](https://google.com)",
  pages: [123, 456, 798],
  data: "07-12-2019"
};

const exampleTextComponent = {
  id: 2,
  author: "WoxPace",
  title: "Welcome-text",
  tags: ["text", "welcome"],
  type: "text", // "carrousel" / "container" / "text" / "general" / "button" / "clickablePicture" / "pictureFolder"
  content:
    "# Hi there\nWelcome to **WoxPace™**, glad you could make it! I'm sure you're wondering how you can start editting this beautiful website, to make it even more beautiful! Go ahead, check out the admin page!\n\nHow you may be wondering? It's easy, just navigate over to [the admin page](./admin) and play around with the settings! Scared to *break* stuff? Try 👇local👇 before you go 🌍global🌍.\n\nBe sure to check out our documentation, you can find it on [our site](https://aaronmunsters.github.io/WebTechProject/).\n\nThis site editor is ideal for people who just want a small scaled website and aren't in for starting to ```code all day long```, so let's start!\n\n![Just do it!](https://i.imgur.com/7524jhl.gif)\n\n## Other tutorials:\n1. Markdown\n2. WoxPace\n3. Setting up your own website\n\n## Authors\n* Corneel Soete\n* Aäron Munsters\n* Wolf De Wulf",
  pages: [123, 456, 798],
  data: "07-12-2019"
};

const exampleCarrouselComponent = {
  id: 3,
  author: "WoxPace",
  title: "Welcome-text",
  tags: ["text", "welcome"],
  type: "carrousel",
  content: {
    singleLocation: false,
    singleCaption: false,
    sources: [
      "https://source.unsplash.com/2ShvY8Lf6l0/800x599",
      "https://source.unsplash.com/Dm-qxdynoEc/800x799"
    ],
    captions: ["A lion", "A mushroom"],
    locations: ["here", "there", "somewhere"]
  },
  pages: [123, 456, 798],
  data: "07-12-2019"
};

const exampleContainerComponent = {
  id: 4,
  author: "WoxPace",
  title: "Welcome-text",
  tags: ["text", "welcome"],
  type: "container",
  content:
    "# Hi there\nWelcome to **WoxPace™**, glad you could make it! I'm sure you're wondering how you can start editting this beautiful website, to make it even more beautiful! Go ahead, check out the admin page!\n\nHow you may be wondering? It's easy, just navigate over to [the admin page](./admin) and play around with the settings! Scared to *break* stuff? Try 👇local👇 before you go 🌍global🌍.\n\nBe sure to check out our documentation, you can find it on [our site](https://aaronmunsters.github.io/WebTechProject/).\n\nThis site editor is ideal for people who just want a small scaled website and aren't in for starting to ```code all day long```, so let's start!\n\n![Just do it!](https://i.imgur.com/7524jhl.gif)\n\n## Other tutorials:\n1. Markdown\n2. WoxPace\n3. Setting up your own website\n\n## Authors\n* Corneel Soete\n* Aäron Munsters\n* Wolf De Wulf",
  pages: [123, 456, 798],
  data: "07-12-2019"
};

const exampleGeneralComponent = {
  id: 5,
  author: "WoxPace",
  title: "Welcome-text",
  tags: ["text", "welcome"],
  type: "general",
  content:
    "# Hi there\nWelcome to **WoxPace™**, glad you could make it! I'm sure you're wondering how you can start editting this beautiful website, to make it even more beautiful! Go ahead, check out the admin page!\n\nHow you may be wondering? It's easy, just navigate over to [the admin page](./admin) and play around with the settings! Scared to *break* stuff? Try 👇local👇 before you go 🌍global🌍.\n\nBe sure to check out our documentation, you can find it on [our site](https://aaronmunsters.github.io/WebTechProject/).\n\nThis site editor is ideal for people who just want a small scaled website and aren't in for starting to ```code all day long```, so let's start!\n\n![Just do it!](https://i.imgur.com/7524jhl.gif)\n\n## Other tutorials:\n1. Markdown\n2. WoxPace\n3. Setting up your own website\n\n## Authors\n* Corneel Soete\n* Aäron Munsters\n* Wolf De Wulf",
  pages: [123, 456, 798],
  data: "07-12-2019"
};

const exampleButtonComponent = {
  id: 6,
  author: "WoxPace",
  title: "Explode-button",
  tags: ["explosion", "button"],
  type: "button",
  content: {
    size: 1 /* value [1..7]*/,
    text: "Click me",
    link: "https://wikipedia.com"
  },
  pages: [123, 456, 798],
  data: "07-12-2019"
};

const exampleClickablePictureComponent = {
  id: 7,
  author: "WoxPace",
  title: "Welcome-text",
  tags: ["text", "welcome"],
  type: "clickablePicture",
  content: {
    online: true,
    source: "https://picsum.photos/id/100/200/200",
    id: 122,
    link: "https://www.facebook.com"
  },
  pages: [123, 456, 798],
  data: "07-12-2019"
};

const examplePictureFolderComponent = {
  id: 8,
  author: "WoxPace",
  title: "Example Photo's",
  tags: ["text", "Foto gallery"],
  type: "pictureFolder",
  content: [
    {
      original: "https://picsum.photos/id/100/200/200",
      thumbnail: "https://picsum.photos/id/100/200/200"
    },
    {
      original: "https://picsum.photos/id/100/200/200",
      thumbnail: "https://picsum.photos/id/100/200/200"
    },
    {
      original: "https://picsum.photos/id/100/200/200",
      thumbnail: "https://picsum.photos/id/100/200/200"
    },
    {
      original: "https://picsum.photos/id/100/200/200",
      thumbnail: "https://picsum.photos/id/100/200/200"
    },
    {
      original: "https://picsum.photos/id/100/200/200",
      thumbnail: "https://picsum.photos/id/100/200/200"
    },
    {
      original: "https://picsum.photos/id/100/200/200",
      thumbnail: "https://picsum.photos/id/100/200/200"
    },
    {
      original: "https://picsum.photos/id/100/200/200",
      thumbnail: "https://picsum.photos/id/100/200/200"
    },
    {
      original: "https://picsum.photos/id/100/200/200",
      thumbnail: "https://picsum.photos/id/100/200/200"
    },
    {
      original: "https://picsum.photos/id/100/200/200",
      thumbnail: "https://picsum.photos/id/100/200/200"
    }
  ],
  pages: [123, 456, 798],
  data: "07-12-2019"
};

const exampleRightText = {
  id: 9,
  author: "WoxPace",
  title: "Welcome-text",
  tags: ["text", "welcome"],
  type: "text",
  content:
    "# A righty?\n## Ohhh so you're a righty we heard?\nGlad you could make it to this side of the website! I'm feeling quite hungry, you too? 🍔🍔🍔",
  pages: [123, 456, 798],
  data: "07-12-2019"
};

const fetchComponent = id => {
  const comps = [
    exampleLeftText,
    exampleTextComponent,
    exampleCarrouselComponent,
    exampleContainerComponent,
    exampleGeneralComponent,
    exampleButtonComponent,
    exampleClickablePictureComponent,
    examplePictureFolderComponent,
    exampleRightText
  ];
  return comps[comps.map(c => c.id).indexOf(id)];
};

const fetchImage = id => {
  return "https://picsum.photos/id/100/200/200";
};

const examples = {
  examplePage,
  exampleLayout,
  fetchComponent,
  fetchImage
};

export default examples;
