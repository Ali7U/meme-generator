import React from "react";

class MemeGenerator extends React.Component {
  // MemeGenerator component to generate a meme
  state = {
    topText: "",
    bottomText: "",
    allMemeImgs: [],
    randomImg: "",
  };

  // componentDidMount() method to fetch
  // Imgs from the API
  componentDidMount() {
    // Fetching data from the API
    fetch("https://api.imgflip.com/get_memes")
      .then((response) => response.json())
      .then((content) =>
        // Updating state variables
        this.setState({ allMemeImgs: content.data.memes })
      );
  }

  // method to change the value of the input fields
  handleChanges = (event) => {
    // Destructuring the event. target object
    const { name, value } = event.target;

    // Updating the state variable
    this.setState({
      [name]: value,
    });
  };

  // Method to submit from and create meme
  handleSubmit = (event) => {
    event.preventDefault();
    const { allMemeImgs } = this.state;
    const rand =
      allMemeImgs[Math.floor(Math.random() * allMemeImgs.length)].url;
    this.setState({
      randomImg: rand,
    });
  };
  render() {
    return (
      <div>
        {/* Controlled form */}
        <form className="meme-form" onSubmit={this.handleSubmit}>
          <input
            placeholder="Enter text"
            type="text"
            value={this.topText}
            name="topText"
            onChange={this.handleChanges}
          />
          <button>Generate</button>
        </form>
        <br />
        <div className="meme">
          {/* // Only show the below elements when the image is ready to be displayed */}
          {this.state.randomImg === "" ? (
            ""
          ) : (
            <img src={this.state.randomImg} alt="meme" />
          )}
          {this.state.randomImg === "" ? (
            ""
          ) : (
            <h2 className="top">{this.state.topText}</h2>
          )}
          {this.state.randomImg === "" ? (
            ""
          ) : (
            <h2 className="bottom">{this.state.bottomText}</h2>
          )}
        </div>
      </div>
    );
  }
}

export default MemeGenerator;
