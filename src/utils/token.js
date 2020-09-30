import { queries } from "@testing-library/react";
import axios from "axios";
import qs from "querystring";
import redirectToAuth from "./redirect";

export const getRefreshToken = (code, redirect_uri) => {
  axios({
    method: "POST",
    url: "https://accounts.spotify.com/api/token",
    data: qs.stringify({
      grant_type: "authorization_code",
      code,
      redirect_uri,
    }),
    headers: {
      Authorization:
        "Basic NTg1NGJlMDMwOWZmNDU4Yjg4ZDE4YzczNjk5MzdjMGQ6OThjMzlhMjM3YzdmNDkxNzk3NzFhMGNmMjQzYjZmYjE=",
      "content-type": "application/x-www-form-urlencoded;charset=utf-8",
    },
  })
    .then((response) => {
      localStorage.setItem("refresh_token", response.data.refresh_token);
      window.location = window.location.origin;
    })
    .catch((err) => {
      console.error(err.response);
    });
};

export const getToken = (refresh_token, callback) => {
  axios({
    method: "POST",
    url: "https://accounts.spotify.com/api/token",
    data: qs.stringify({
      grant_type: "refresh_token",
      refresh_token,
    }),
    headers: {
      Authorization:
        "Basic NTg1NGJlMDMwOWZmNDU4Yjg4ZDE4YzczNjk5MzdjMGQ6OThjMzlhMjM3YzdmNDkxNzk3NzFhMGNmMjQzYjZmYjE=",
      "content-type": "application/x-www-form-urlencoded;charset=utf-8",
    },
  })
    .then((response) => {
      callback(response);
      setInterval(
        () => getToken(refresh_token, callback),
        response.data.expires_in * 1000
      );
    })
    .catch((err) => {
      console.error(err.response);
      if (err.response.data.error_description.includes("revoked"))
        redirectToAuth();
    });
};
