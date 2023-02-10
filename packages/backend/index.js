/**
 * This is an example of a basic node.js script that performs
 * the Authorization Code oAuth2 flow to authenticate against
 * the Spotify Accounts.
 *
 * For more information, read
 * https://developer.spotify.com/web-api/authorization-guide/#authorization_code_flow
 */

const express = require("express"); // Express web server framework
const request = require("request"); // "Request" library
const querystring = require("querystring");
const cookieParser=require("cookie-parser");
require("dotenv").config();

const app = express();

app.use(cookieParser());

app.get("/login", function (req, res) {
});

app.get("/callback", function (req, res) {
});

app.get("/refresh_token", function (req, res) {
});

console.log("Listening on 8888");
app.listen(8888);
