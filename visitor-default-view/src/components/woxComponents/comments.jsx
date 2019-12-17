import React, { Component } from "react";
import { Media, Button } from "react-bootstrap";
import { getApiObject, parseProps } from "../generalFunctions";
import Reply from "./reply";
import { commentParseProps } from "../../defaults.json";

class CommentsRenderer extends Component {
  state = {
    reply: true,
    id: null,
    author: null,
    content: { reaction: null, reactions: [] },
    component: null,
    date: null
  };

  async componentDidMount() {
    const comment = await getApiObject("comment", this.props.id);
    if (comment) parseProps(comment, commentParseProps);
    this.setState({ ...comment });
  }

  toggleReply = () => {
    this.setState({ reply: !this.state.reply });
  };

  render() {
    const { reply, id, author, content, component, date } = this.state;
    if (!content) return null;
    const { allowChildren } = this.props;

    return (
      <div>
        <Media>
          <img
            style={{ borderRadius: "25%" }}
            width={64}
            height={64}
            className="mr-3"
            src={"https://api.adorable.io/avatars/400/" + author + ".png"}
            alt={"Picture of " + author}
          />
          <Media.Body>
            <h5 style={{ display: "inline" }}>{author}</h5>{" "}
            <small>{date}</small>
            {allowChildren ? (
              <Button
                variant="secondary"
                style={{ margin: ".5rem" }}
                onClick={this.toggleReply}
              >
                <img
                  width="20rem"
                  height="20rem"
                  src="https://cdn4.iconfinder.com/data/icons/ionicons/512/icon-reply-512.png"
                  alt="reply-icon"
                />
              </Button>
            ) : null}
            <p>{content.reaction}</p>
            {false // allowChildren // As this prop is not passed to reactions, single level is allowed
              ? content.reactions.map(r =>
                  r !== id ? (
                    <CommentsRenderer key={r} id={r} allowChildren={false} />
                  ) : null
                )
              : null}
            {reply && allowChildren ? (
              <Reply
                handleVisible={this.toggleReply}
                handleReply={this.props.handleReply}
              />
            ) : null}
          </Media.Body>
        </Media>
      </div>
    );
  }
}

// Only one level of comments is allowed, thus infinite recursive calls are prevented
// If this wasn't so a possible case would be:
// {id: 1, ..., reactions: [2]}
// {id: 2, ..., reactions: [3]}
// {id: 3, ..., reactions: [1]}
// Which would render these three reactions forever

export default CommentsRenderer;
