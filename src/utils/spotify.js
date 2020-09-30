import axios from "axios";

export const getMe = (callback, token) => {
  axios({
    method: "GET",
    url: "https://api.spotify.com/v1/me",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
    .then(callback)
    .catch((err) => console.error(err));
};
