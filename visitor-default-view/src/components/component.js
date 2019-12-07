const validTypes = [
  "carrousel",
  "container",
  "text",
  "general",
  "button",
  "clickablePicture"
];

/*
  general layout for the string of a component:
    .⟶ "carrousel" / "container" / "text" / "general" / "button" / "clickablePicture" / "pictureFolder"
    |      |              |          |          |           |             |                    |
    |      |              |          |          |           |             |                    -⟶ * required: pictureID's
    |      |              |          |          |           |             |                       * optional: /
    |      |              |          |          |           |             |
    |      |              |          |          |           |             -⟶ * required: pictureID, hyperlink
    |      |              |          |          |           |                * optional: /
    |      |              |          |          |           |
    |      |              |          |          |           -⟶ * required: [Title, Text, ]
    |      |              |          |          |              * optional: markdown to go with each picture
    |      |              |          |          |
    |      |              |          |          -⟶ * required: picture ID's (must be public)
    |      |              |          |             * optional: markdown to go with each picture
    |      |              |          |
    |      |              |          -⟶ * required: markdown text
    |      |              |             * optional: /
    |      |              |
    |      |              -⟶ * required: list of component-ID's, picture ID's (must be public)
    |      |                 * optional: arrangement of components (next to each other, below each other, ...)
    |      |
    |      -⟶ * required: picture ID's (must be public)
    |         * optional: markdown to go with each picture OR signle markdown for all pictures
    |      
  [type, [required], [optional], [layout]]
  */

class Component {
  load(s) {
    this.savedString = s;
    console.log("I will now represent", s);
  }

  generateString() {
    console.log("I'm now ready to close, and I return", this.savedString);
    return this.savedString;
  }
}

let comp = new Component();
comp.load("fakeCompString");
comp.generateString();

module.exports = Component;
