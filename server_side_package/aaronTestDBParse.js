"use strict";
const functionCreatorObj = require("./app/model/util/sqlFunctionCreators.js");

module.exports = function() {
  const componentCreator = function(obj) {
    const getter = functionCreatorObj.accessor_function("WoxComponents");
    const creator = functionCreatorObj.create_function("WoxComponents");
    getter(obj.id, 'id', function(ignore, result) {
      if (!(result && result.length)) creator(obj, createDisplayer(obj.id));
    });
  };

  const pageCreator = function(obj) {
    const getter = functionCreatorObj.accessor_function("Pages");
    const creator = functionCreatorObj.create_function("Pages");
    getter(obj.id, 'id', function(ignore, result) {
      if (!(result && result.length)) creator(obj, createDisplayer(obj.id));
    });
  };

  const layoutCreator = function(obj) {
    const getter = functionCreatorObj.accessor_function("Layouts");
    const creator = functionCreatorObj.create_function("Layouts");
    getter(obj.id, 'id', function(ignore, result) {
      if (!(result && result.length)) creator(obj, createDisplayer(obj.id));
    });
  };

  const commentCreator = function(obj) {
    const getter = functionCreatorObj.accessor_function("Comments");
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
    commentable: 0,
    comments: JSON.stringify([])
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
    description: "this is an exampleComponent",
    commentable: 1,
    comments: JSON.stringify([])
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
    description: "this is an exampleComponent",
    commentable: 0,
    comments: JSON.stringify([])
  };

  const exampleCarrouselComponent = {
    id: "l3",
    editor: "WoxPace",
    title: "Fotos Carrousel",
    tags: JSON.stringify(["text", "welcome"]),
    type: "carrousel",
    content: JSON.stringify({
      captionActive: true, // when true: renders captions below each picture
      customCaption: true, // when true: renders custom caption (provided by 'captions') per picture
      singleCaption: false, // when true: first caption of 'captions' will be permanent across all captions
      ids: ["pic-id-1", "pic-id-2", "pic-id-3"],
      captions: [
        "custom-caption-id-1",
        "custom-caption-id-2",
        "custom-caption-id-3"
      ]
    }),
    pages: JSON.stringify(["l1"]),
    date: "2019-12-07",
    description: "this is an exampleComponent",
    commentable: 0,
    comments: JSON.stringify([])
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
    description: "this is an exampleComponent",
    commentable: 0,
    comments: JSON.stringify([])
  };

  const exampleClickablePictureComponent = {
    id: "l7",
    editor: "WoxPace",
    title: "Facebook redirect",
    tags: JSON.stringify(["text", "welcome"]),
    type: "clickablePicture",
    content: JSON.stringify({
      id: "l122", // image id
      link: "https://www.facebook.com"
    }),
    pages: JSON.stringify(["l1"]),
    date: "2019-12-07",
    description: "this is an exampleComponent",
    commentable: 0,
    comments: JSON.stringify([])
  };

  /* Components below: Not tested yet */

  const exampleContainerComponent = {
    id: "l4",
    editor: "WoxPace",
    title: "Example Container",
    tags: JSON.stringify(["text", "welcome"]),
    type: "container",
    content: JSON.stringify({
      ids: ["l1", "l2", "l3"],
      style: "vertical"
    }),
    pages: JSON.stringify(["l1"]),
    date: "2019-12-07",
    description: "this is an exampleComponent",
    commentable: 0,
    comments: JSON.stringify([])
  };

  const examplePictureFolderComponent = {
    id: "l8",
    editor: "WoxPace",
    title: "Example Picture Folder",
    tags: JSON.stringify([]),
    type: "pictureFolder",
    content: JSON.stringify({
      ids: ["l1", "l2", "l3"],
      locationActive: true // when locationActive: location is shown per picture
    }),
    pages: JSON.stringify(["l1"]),
    date: "2019-12-07",
    description: "this is an exampleComponent",
    commentable: 1,
    comments: JSON.stringify([])
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
    url: "example/test",
    layout: "l1",
    description: "this is an examplePage"
  };

  const exampleLayout = {
    id: "l1",
    title: "Default layout",
    columnType: "single", // "single", "small-left", "small-right", "triple"
    backgroundType: "color",
    backgroundColor: "rgb(50 , 50, 50)",
    backgroundPicture: "96",
    navbar: 1,
    brand: "WoxPace",
    navcontent: JSON.stringify(["calendar", "contact"]),
    footer: 1,
    footcontent: "WoxPace™ - Made possible thanks to Aäron, Wolf and Corneel",
    description: "this is the default layout",
    pages: JSON.stringify(["l1"])
  };

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
};
