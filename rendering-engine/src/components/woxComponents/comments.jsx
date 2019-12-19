import React, { Component } from "react";
import { Media, Alert, Badge } from "react-bootstrap";
import { getApiObject, parseProps } from "../generalFunctions";
import Reply, { ReplyButton } from "./reply";
import {
  commentParseProps,
  liveUpdate,
  updateInterval
} from "../../defaults.json";

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

  updateComments = async () => {
    const comment = await getApiObject("comment", this.props.id);
    if (comment) parseProps(comment, commentParseProps);
    this.setState({ ...comment });
  };

  awaitUpdate(callback) {
    return async () => {
      if (this.prevUpdateDone) {
        this.prevUpdateDone = false;
        await callback();
        this.prevUpdateDone = true;
      }
    };
  }

  componentDidMount = async () => {
    await this.updateComments();
    this.prevUpdateDone = true;
    if (liveUpdate)
      this.interval = setInterval(
        this.awaitUpdate(this.updateComments),
        updateInterval
      );
  };

  componentWillUnmount = () => {
    if (liveUpdate) clearInterval(this.interval);
  };

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
            <Badge variant={"secondary"}>
              {author} <small>{date}</small>
            </Badge>
          </h5>
          {replyButton} <br />
          <Alert
            variant={"secondary"}
            style={{ display: "inline-block", margin: "1rem" }}
          >
            {content.reaction}
          </Alert>
          {allowChildren // Because this prop is not passed to reactions, replies is only possible 1 level deep
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
