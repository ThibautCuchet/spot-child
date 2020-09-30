import React, { Component } from "react";
import logo from "./logo.svg";
import "./App.css";
import search from "./utils/search";
import redirectToAuth from "./utils/redirect";
import { getMe } from "./utils/spotify";
import { getToken, getRefreshToken } from "./utils/token";
import { checkUser } from "./utils/databse";

const redirectUri = "http://localhost:3006";

class App extends Component {
  state = {};

  componentDidMount() {
    let _code = search.code;
    let _refresh_token = localStorage.getItem("refresh_token");
    if (!_refresh_token && !search.code) redirectToAuth();

    if (_code) getRefreshToken(_code, redirectUri);

    if (_refresh_token) this.initToken(_refresh_token);

    setInterval(this.getData, 10000);
  }

  initToken = (refresh_token) => {
    getToken(refresh_token, (response) => {
      this.setState({ token: response.data.access_token }, this.loadUser);
    });
  };

  loadUser = () => {
    getMe((response) => {
      let user = response.data;
      this.setState({ user: user.display_name });
      checkUser(user.id, user.email, user.display_name, (profile) => {
        this.setState({ profile });
      });
    }, this.state.token);
  };

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          {this.state.token && this.state.user && (
            <div>You are logged, hi {this.state.user}</div>
          )}
          <div>
            {this.state.profile && this.state.profile.access
              ? "You can use this app"
              : "Ask Admin an access"}
          </div>
        </header>
      </div>
    );
  }
}

export default App;
