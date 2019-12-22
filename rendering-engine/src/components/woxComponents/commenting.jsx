import React, { Component } from "react";
import CommentsRenderer from "./comments";
import Reply, { ReplyButton } from "./reply";

class CommentingRenderer extends Component {
  state = { reply: false, comments: [] };

  toggleReply = () => {
    this.setState({ reply: !this.state.reply });
  };

  render() {
    return (
      <div className="commentsHolder">
        <h2 className="commentsDisplay">Comments</h2>
        <ReplyButton onClick={this.toggleReply} />
        {this.state.reply ? (
          <Reply
            handleVisible={this.toggleReply}
            handleReply={this.props.handleReply}
            component={this.props.id}
          />
        ) : null}
        {this.props.comments.map(c => (
          <CommentsRenderer
            key={c}
            parrent={null}
            id={c}
            allowChildren={true}
            handleReply={this.props.handleReply}
          />
        ))}
      </div>
    );
  }
}

export default CommentingRenderer;
