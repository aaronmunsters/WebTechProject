"use strict";
const functionCreatorObj = require("./app/model/util/sqlFunctionCreators.js");

module.exports = function() {
  const componentCreator = function(obj) {
    const getter = functionCreatorObj.accessor_id_function("WoxComponents");
    const creator = functionCreatorObj.create_function("WoxComponents");
    getter(obj.id, function(ignore, result) {
      if (!(result && result.length)) creator(obj, createDisplayer(obj.id));
    });
  };

  const pageCreator = function(obj) {
    const getter = functionCreatorObj.accessor_id_function("Pages");
    const creator = functionCreatorObj.create_function("Pages");
    getter(obj.id, function(ignore, result) {
      if (!(result && result.length)) creator(obj, createDisplayer(obj.id));
    });
  };

  const layoutCreator = function(obj) {
    const getter = functionCreatorObj.accessor_id_function("Layouts");
    const creator = functionCreatorObj.create_function("Layouts");
    getter(obj.id, function(ignore, result) {
      if (!(result && result.length)) creator(obj, createDisplayer(obj.id));
    });
  };

  const commentCreator = function(obj) {
    const getter = functionCreatorObj.accessor_id_function("Comments");
    const creator = functionCreatorObj.create_function("Comments");
    getter(obj.id, function(ignore, result) {
      if (!(result && result.length)) creator(obj, createDisplayer(obj.id));
    });
  };

  function createDisplayer(id) {
    function displayer(err, res) {
      if (err) console.log("Entry not added since error ocurred: " + err);
      else console.log("ADDED test db entry with id: ", id);
    }
    return displayer;
  }

  const exampleComment = {
    id: "l1",
    author: "wolf",
    content: JSON.stringify({
      text:
        "tralalala"
    }),
    component: "l1",
    date: "2019-12-07"
  }

  const exampleTextLeft = {
    id: "l1",
    editor: "WoxPace",
    title: "Left Welcome text",
    tags: JSON.stringify(["text", "welcome"]),
    type: "text",
    content: JSON.stringify({
      text:
        "# Left-side!\nHere on the left side is your left column, feel free to go wild!\n\nYou could maybe link some nice websites here? Check these out!\n\n[youtube](https://youtube.com)\n\n[Facebook](https://facebook.com)\n\n[Google](https://google.com)"
    }),
    pages: JSON.stringify(["l1"]),
    date: "2019-12-07",
    description: "this is an exampleComponent",
    commentable: 1,
    comments: JSON.stringify(["l1"])
  };

  const exampleTextMiddle = {
    id: "l2",
    editor: "WoxPace",
    title: "Middle Welcome text",
    tags: JSON.stringify(["text", "welcome"]),
    type: "text",
    content: JSON.stringify({
      text:
        "# Hi there\nWelcome to **WoxPace™**, glad you could make it! I'm sure you're wondering how you can start editting this beautiful website, to make it even more beautiful! Go ahead, check out the admin page!\n\nHow you may be wondering? It's easy, just navigate over to [the admin page](./admin) and play around with the settings! Scared to *break* stuff? Try 👇local👇 before you go 🌍global🌍.\n\nBe sure to check out our documentation, you can find it on [our site](https://aaronmunsters.github.io/WebTechProject/).\n\nThis site editor is ideal for people who just want a small scaled website and aren't in for starting to ```code all day long```, so let's start!\n\n![Just do it!](https://i.imgur.com/7524jhl.gif)\n\n## Other tutorials:\n1. Markdown\n2. WoxPace\n3. Setting up your own website\n\n## Authors\n* Corneel Soete\n* Aäron Munsters\n* Wolf De Wulf"
    }),
    pages: JSON.stringify(["l1"]),
    date: "2019-12-07",
    description: "this is an exampleComponent"
  };

  const exampleRightText = {
    id: "l9",
    editor: "WoxPace",
    title: "Right Welcome text",
    tags: JSON.stringify(["text", "welcome"]),
    type: "text",
    content: JSON.stringify({
      text:
        "# A righty?\n## Ohhh so you're a righty we heard?\nGlad you could make it to this side of the website! I'm feeling quite hungry, you too? 🍔🍔🍔"
    }),
    pages: JSON.stringify(["l1"]),
    date: "2019-12-07",
    description: "this is an exampleComponent"
  };

  const exampleCarrouselComponent = {
    id: "l3",
    editor: "WoxPace",
    title: "Fotos Carrousel",
    tags: JSON.stringify(["text", "welcome"]),
    type: "carrousel",
    content: JSON.stringify({
      singleLocation: false,
      singleCaption: false,
      sources: [
        "https://source.unsplash.com/2ShvY8Lf6l0/800x599",
        "https://source.unsplash.com/Dm-qxdynoEc/800x799"
      ],
      captions: ["A lion", "A mushroom"],
      locations: ["here", "there", "somewhere"]
    }),
    pages: JSON.stringify(["l1"]),
    date: "2019-12-07",
    description: "this is an exampleComponent"
  };

  const exampleButtonComponent = {
    id: "l6",
    editor: "WoxPace",
    title: "Explode-button",
    tags: JSON.stringify(["explosion", "button"]),
    type: "button",
    content: JSON.stringify({
      text: "Click me",
      link: "https://wikipedia.com"
    }),
    pages: JSON.stringify(["l1"]),
    date: "2019-12-07",
    description: "this is an exampleComponent"
  };

  const exampleClickablePictureComponent = {
    id: "l7",
    editor: "WoxPace",
    title: "Facebook redirect",
    tags: JSON.stringify(["text", "welcome"]),
    type: "clickablePicture",
    content: JSON.stringify({
      online: true,
      source: "https://picsum.photos/id/100/200/200",
      id: "l122",
      link: "https://www.facebook.com"
    }),
    pages: JSON.stringify(["l1"]),
    date: "2019-12-07",
    description: "this is an exampleComponent"
  };

  /* Components below: Not tested yet */

  const exampleContainerComponent = {
    id: "l4",
    editor: "WoxPace",
    title: "Example Container",
    tags: JSON.stringify(["text", "welcome"]),
    type: "container",
    content: JSON.stringify({
      ids: ["l1", "l2", "l3", "l4"],
      style: "vertical"
    }),
    pages: JSON.stringify(["l1"]),
    date: "2019-12-07",
    description: "this is an exampleComponent"
  };

  const examplePictureFolderComponent = {
    id: "l8",
    editor: "WoxPace",
    title: "Example Picture Folder",
    tags: JSON.stringify(["text", "Foto gallery"]),
    type: "pictureFolder",
    content: JSON.stringify({ ids: ["l1", "l2", "l3", "l4"] }),
    pages: JSON.stringify(["l1"]),
    date: "2019-12-07",
    description: "this is an exampleComponent"
  };

  const examplePage = {
    id: "l1",
    title: "Facebook - Home",
    editor: "WoxPace",
    published: 1,
    compsL: JSON.stringify(["l1"]), // these are id's refering to a component
    compsM: JSON.stringify(["l2", "l6", "l4", "l3", "l7", "l8"]),
    compsR: JSON.stringify(["l9"]),
    date: "2019-12-07",
    url: "/",
    layout: "l1",
    description: "this is an examplePage"
  };

  const examplePage2 = {
    id: "l2",
    title: "Faceboooooooook - Home",
    editor: "WoxPace",
    published: 1,
    compsL: JSON.stringify(["l1"]), // these are id's refering to a component
    compsM: JSON.stringify(["l2", "l6", "l4", "l3", "l7", "l8"]),
    compsR: JSON.stringify(["l9"]),
    date: "2019-12-07",
    url: "/",
    layout: "l1",
    description: "this is an examplePage"
  };

  const exampleLayout = {
    id: "l1",
    title: "Aarons layout",
    columnType: "triple", // "single", "small-left", "small-right", "triple"
    backgroundType: "color",
    backgroundColor: "rgb(50 , 50, 50)",
    backgroundPicture: "96",
    navbar: 1,
    brand: "WoxPace",
    navcontent: JSON.stringify({ Home: "/home", Contact: "/contact" }),
    footer: 1,
    footcontent: "WoxPace™ - Made possible thanks to Aäron, Wolf and Corneel",
    description: "this is an exampleLayout",
    pages: JSON.stringify(["l1", "l2"])
  };

  const examplePicture = {
    id: "ffb057c0-1d1f-11ea-83e1-ffb25f078cad", // not used for visitors
    extension: ".jpg", // not used for visitors
    caption: "painting", // used to be title
    src: "https://picsum.photos/id/1015/6000/4000", // used to be filepath,
    small: "https://picsum.photos/id/1015/60/40", // should be provided by back-end
    width: 6, // width and height can be either ratio or pixels
    height: 4,
    location: [41.505, -0.09],
    comments: [{ id: "Marie", comment: "Nice picture!" }] // or different structure
  };

  commentCreator(exampleComment);

  componentCreator(exampleTextLeft);
  componentCreator(exampleTextMiddle);
  componentCreator(exampleRightText);
  componentCreator(exampleCarrouselComponent);
  componentCreator(exampleButtonComponent);
  componentCreator(exampleClickablePictureComponent);

  componentCreator(exampleContainerComponent);
  componentCreator(examplePictureFolderComponent);

  layoutCreator(exampleLayout);
  pageCreator(examplePage);
  pageCreator(examplePage2);
};
