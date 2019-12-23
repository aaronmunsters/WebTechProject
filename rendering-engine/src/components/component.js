/*
  general layout for the string of a component:
    .⟶ "carousel" / "container" / "text" / "general" / "button" / "clickablePicture" / "pictureFolder"
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
