import React, { Component } from "react";
import { Media, Alert } from "react-bootstrap";
import { getApiObject, parseProps } from "../generalFunctions";
import Reply, { ReplyButton } from "./reply";
import { commentParseProps } from "../../defaults.json";

const ProfilePicture = props => {
  const author = props.author;
  return (
    <img
      style={{ borderRadius: "25%" }}
      width={64}
      height={64}
      className="mr-3"
      src={"https://api.adorable.io/avatars/400/" + author + ".png"}
      alt={"Picture of " + author}
    />
  );
};

class CommentsRenderer extends Component {
  state = {
    reply: false,
    id: null, // to fetch from backend
    author: null, // Aäron Munsters
    content: { reaction: null /*"Very nice picture!"*/ },
    component: null, // "l1" (id of WoxComponent which contains the comments)
    date: null, // "07-09-2019"
    replies: [] // ["commentX", "commentY", "commentZ"]
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
    const { state, props, toggleReply } = this;
    const { reply, id, author, content, component, date, replies } = state;
    if (!content) return null;
    const { allowChildren, handleReply } = props;
    const replyButton = allowChildren ? (
      <ReplyButton onClick={toggleReply} />
    ) : null;

    return (
      <Media>
        <ProfilePicture {...state} />
        <Media.Body>
          <h5 style={{ display: "inline" }}>
            {author} <small>{date}</small>
          </h5>
          {replyButton} <br/>
          <Alert variant={"secondary"} style={{ display: "inline-block" }}>
            {content.reaction}
          </Alert>
          {allowChildren // As this prop is not passed to reactions, single level is allowed
            ? replies.map(r =>
                r !== id ? (
                  <CommentsRenderer key={r} id={r} allowChildren={false} />
                ) : null
              )
            : null}
          {reply && allowChildren ? (
            <Reply
              handleVisible={toggleReply}
              handleReply={handleReply}
              component={component}
              replyId={id}
            />
          ) : null}
        </Media.Body>
      </Media>
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
