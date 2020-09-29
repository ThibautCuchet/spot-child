import React, { Component } from "react";
import logo from "./logo.svg";
import "./App.css";

export const authEndpoint = "https://accounts.spotify.com/authorize?";

const clientId = "5854be0309ff458b88d18c7369937c0d";
const redirectUri = "http://localhost:3006";
const scopes = [
  "user-read-currently-playing",
  "user-modify-playback-state",
  "streaming",
  "user-read-private",
  "playlist-read-private",
];

const hash = window.location.hash
  .substring(1)
  .split("&")
  .reduce(function (initial, item) {
    if (item) {
      var parts = item.split("=");
      initial[parts[0]] = decodeURIComponent(parts[1]);
    }
    return initial;
  }, {});
window.location.hash = "";

class App extends Component {
  state = {};

  componentDidMount() {
    let _token = hash.access_token;
    if (_token) {
      // Set token
      this.setState({
        token: _token,
      });
    }
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          {!this.state.token && (
            <a
              className="btn btn--loginApp-link"
              href={`${authEndpoint}client_id=${clientId}&redirect_uri=${redirectUri}&scope=${scopes.join(
                "%20"
              )}&response_type=token&show_dialog=true`}
            >
              Login to Spotify
            </a>
          )}
          {this.state.token && <div>You are logged</div>}
        </header>
      </div>
    );
  }
}

export default App;
