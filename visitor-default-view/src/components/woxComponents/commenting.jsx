import React, { Component } from "react";
import CommentsRenderer from "./comments";
import { Button } from "react-bootstrap";
import Reply from "./reply";

class CommentingRenderer extends Component {
  state = { reply: true, comments: [] };

  toggleReply = () => {
    this.setState({ reply: !this.state.reply });
  };

  render() {
    return (
      <div style={{ margin: "1rem" }}>
        <h2 style={{ display: "inline" }}>Comments</h2>
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
        {this.state.reply ? <Reply handleVisible={this.toggleReply} /> : null}
        {this.props.comments.map(c => (
          <CommentsRenderer
            key={c}
            parrent={null}
            id={c}
            allowChildren={true}
          />
        ))}
      </div>
    );
  }
}

export default CommentingRenderer;
