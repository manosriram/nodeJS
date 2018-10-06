import React, { Component } from "react";

class Test extends Component {
  constructor(props) {
    super(props);

    this.state = {
      laps: []
    };
  }

  componentDidMount() {
    fetch("/api")
      .then(res => res.json())
      .then(laps =>
        this.setState({ laps }, () => console.log("Fetched Data!!", laps))
      );
  }

  render() {
    return (
      <div>
        <h2> Hello There!! </h2>
      </div>
    );
  }
}

export default Test;
