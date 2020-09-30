const clientId = "5854be0309ff458b88d18c7369937c0d";
const redirectUri = "http://localhost:3006";
const scopes = [
  "user-read-currently-playing",
  "user-read-playback-state",
  "streaming",
  "user-read-private",
  "playlist-read-private",
  "user-read-email",
];
export const authEndpoint = "https://accounts.spotify.com/authorize?";

export default function redirectToAuth() {
  window.location = `${authEndpoint}client_id=${clientId}&redirect_uri=${redirectUri}&scope=${scopes.join(
    "%20"
  )}&response_type=code&show_dialog=true`;
}
