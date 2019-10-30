import React, { Component } from "react";

class Navigation extends Component {
  state = {};
  render() {
    return (
      <div className="navbar">
        <h1>WoxSpace</h1>
        <button type="button" class="btn btn-primary">
          Save
        </button>
        <button type="button" class="btn btn-danger">
          Start Over
        </button>
        <button type="button" class="btn btn-info">
          Help
        </button>
        <button type="button" class="btn btn-dark">
          Mobile View
        </button>
        <button type="button" className="btn btn-light" title="View plain site">
          <img
            src="https://img.icons8.com/metro/26/000000/visible.png"
            alt="eye icon"
          />
        </button>
      </div>
    );
  }
}

export default Navigation;
