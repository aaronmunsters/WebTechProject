"use strict";
const functionCreatorObj = require("./app/model/util/sqlFunctionCreators.js");

module.exports = function() {
  const componentCreator = function(obj) {
    const getter = functionCreatorObj.accessor_id_function("WoxComponents");
    const creator = functionCreatorObj.create_function("WoxComponents");
    getter(obj.id, function(ignore, result) {
      if (result == null) creator(obj, displayer);
    });
  };

  const pageCreator = function(obj) {
    const getter = functionCreatorObj.accessor_id_function("Pages");
    const creator = functionCreatorObj.create_function("Pages");
    getter(obj.id, function(ignore, result) {
      if (result == null) creator(obj, displayer);
    });
  };

  const layoutCreator = function(obj) {
    const getter = functionCreatorObj.accessor_id_function("Layouts");
    const creator = functionCreatorObj.create_function("Layouts");
    getter(obj.id, function(ignore, result) {
      if (result == null) creator(obj, displayer);
    });
  };

  function displayer(ignore, id) {
    if (ignore) console.log("Entry not added since error ocurred!");
    else console.log("ADDED test db entry with id: ", id);
  }

  const exampleTextLeft = {
    id: 1,
    editor: "WoxPace",
    title: "Left Welcome text",
    tags: JSON.stringify(["text", "welcome"]),
    type: "text",
    content: JSON.stringify({
      text:
        "# Left-side!\nHere on the left side is your left column, feel free to go wild!\n\nYou could maybe link some nice websites here? Check these out!\n\n[youtube](https://youtube.com)\n\n[Facebook](https://facebook.com)\n\n[Google](https://google.com)"
    }),
    pages: JSON.stringify([123, 456, 798]),
    date: "2019-12-07"
  };

  const exampleTextMiddle = {
    id: 2,
    editor: "WoxPace",
    title: "Middle Welcome text",
    tags: JSON.stringify(["text", "welcome"]),
    type: "text",
    content: JSON.stringify({
      text:
        "# Hi there\nWelcome to **WoxPace™**, glad you could make it! I'm sure you're wondering how you can start editting this beautiful website, to make it even more beautiful! Go ahead, check out the admin page!\n\nHow you may be wondering? It's easy, just navigate over to [the admin page](./admin) and play around with the settings! Scared to *break* stuff? Try 👇local👇 before you go 🌍global🌍.\n\nBe sure to check out our documentation, you can find it on [our site](https://aaronmunsters.github.io/WebTechProject/).\n\nThis site editor is ideal for people who just want a small scaled website and aren't in for starting to ```code all day long```, so let's start!\n\n![Just do it!](https://i.imgur.com/7524jhl.gif)\n\n## Other tutorials:\n1. Markdown\n2. WoxPace\n3. Setting up your own website\n\n## Authors\n* Corneel Soete\n* Aäron Munsters\n* Wolf De Wulf"
    }),
    pages: JSON.stringify([123, 456, 798]),
    date: "2019-12-07"
  };

  const exampleRightText = {
    id: 9,
    editor: "WoxPace",
    title: "Right Welcome text",
    tags: JSON.stringify(["text", "welcome"]),
    type: "text",
    content: JSON.stringify({
      text:
        "# A righty?\n## Ohhh so you're a righty we heard?\nGlad you could make it to this side of the website! I'm feeling quite hungry, you too? 🍔🍔🍔"
    }),
    pages: JSON.stringify([123, 456, 798]),
    date: "2019-12-07"
  };

  const exampleCarrouselComponent = {
    id: 3,
    editor: "WoxPace",
    title: "Welcome-text",
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
    pages: JSON.stringify([123, 456, 798]),
    date: "2019-12-07"
  };

  const exampleButtonComponent = {
    id: 6,
    editor: "WoxPace",
    title: "Explode-button",
    tags: JSON.stringify(["explosion", "button"]),
    type: "button",
    content: JSON.stringify({
      text: "Click me",
      link: "https://wikipedia.com"
    }),
    pages: JSON.stringify([123, 456, 798]),
    date: "2019-12-07"
  };

  const exampleClickablePictureComponent = {
    id: 7,
    editor: "WoxPace",
    title: "Facebook redirect",
    tags: JSON.stringify(["text", "welcome"]),
    type: "clickablePicture",
    content: JSON.stringify({
      online: true,
      source: "https://picsum.photos/id/100/200/200",
      id: 122,
      link: "https://www.facebook.com"
    }),
    pages: JSON.stringify([123, 456, 798]),
    date: "2019-12-07"
  };

  /* Components below: Not tested yet */

  const exampleContainerComponent = {
    id: 4,
    editor: "WoxPace",
    title: "Welcome-text",
    tags: JSON.stringify(["text", "welcome"]),
    type: "container",
    content: JSON.stringify([1, 2, 3, 4]),
    pages: JSON.stringify([123, 456, 798]),
    date: "2019-12-07"
  };

  const exampleGeneralComponent = {
    id: 5,
    editor: "WoxPace",
    title: "Welcome-text",
    tags: JSON.stringify(["text", "welcome"]),
    type: "general",
    content: JSON.stringify(
      "# Hi there\nWelcome to **WoxPace™**, glad you could make it! I'm sure you're wondering how you can start editting this beautiful website, to make it even more beautiful! Go ahead, check out the admin page!\n\nHow you may be wondering? It's easy, just navigate over to [the admin page](./admin) and play around with the settings! Scared to *break* stuff? Try 👇local👇 before you go 🌍global🌍.\n\nBe sure to check out our documentation, you can find it on [our site](https://aaronmunsters.github.io/WebTechProject/).\n\nThis site editor is ideal for people who just want a small scaled website and aren't in for starting to ```code all day long```, so let's start!\n\n![Just do it!](https://i.imgur.com/7524jhl.gif)\n\n## Other tutorials:\n1. Markdown\n2. WoxPace\n3. Setting up your own website\n\n## Authors\n* Corneel Soete\n* Aäron Munsters\n* Wolf De Wulf"
    ),
    pages: JSON.stringify([123, 456, 798]),
    date: "2019-12-07"
  };

  const examplePictureFolderComponent = {
    id: 8,
    editor: "WoxPace",
    title: "Example Photo's",
    tags: JSON.stringify(["text", "Foto gallery"]),
    type: "pictureFolder",
    content: JSON.stringify([
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
    ]),
    pages: JSON.stringify([123, 456, 798]),
    date: "2019-12-07"
  };

  const examplePage = {
    id: 1,
    title: "Facebook - Home",
    editor: "WoxPace",
    published: 1,
    compsL: JSON.stringify([1]), // these are id's refering to a component
    compsM: JSON.stringify([2, 5, 6, 4, 3, 7, 8]),
    compsR: JSON.stringify([9]),
    date: "2019-12-07",
    url: "/",
    layout: 1
  };

  const exampleLayout = {
    id: 1,
    title: "Default Layout",
    columnType: "triple", // "single", "small-left", "small-right", "triple"
    backgroundType: "color",
    backgroundColor: "rgb(50 , 50, 50)",
    backgroundPicture: 96,
    navbar: 1,
    brand: "WoxPace",
    navcontent: JSON.stringify({ Home: "/home", Contact: "/contact" }),
    footer: 1,
    footcontent: "WoxPace™ - Made possible thanks to Aäron, Wolf and Corneel"
  };

  componentCreator(exampleTextLeft, displayer);
  componentCreator(exampleTextMiddle, displayer);
  componentCreator(exampleRightText, displayer);
  componentCreator(exampleCarrouselComponent, displayer);
  componentCreator(exampleButtonComponent, displayer);
  componentCreator(exampleClickablePictureComponent, displayer);

  componentCreator(exampleContainerComponent, displayer);
  componentCreator(exampleGeneralComponent, displayer);
  componentCreator(examplePictureFolderComponent, displayer);

  layoutCreator(exampleLayout, displayer);
  pageCreator(examplePage, displayer);
};
