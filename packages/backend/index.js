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
const cors = require("cors");
require("dotenv").config();

const app = express();
app.use(cookieParser());
// app.use(bodyParser());
app.use(cors());


const deezerAppId = process.env.DEEZER_APP_ID;
const deezerSecret = process.env.DEEZER_APP_SECRET;
const redirect = process.env.DEEZER_CALLBACK_URI;

var accessToken;
var refreshToken;
var expiration;

app.get("/auth/login", function (req, res) {

  res.redirect( "https://connect.deezer.com/oauth/auth.php?" +
  querystring.stringify({
    app_id: deezerAppId,
    redirect_uri: "http://localhost.test:8888/auth/callback",//redirect,
    perms: "basic_access,email",
  }))
});

app.get("/auth/callback", function (req, res) {
  const code = req.query.code || null ;
  request.get("https://connect.deezer.com/oauth/access_token.php?" +
    querystring.stringify({
      app_id: deezerAppId,
      secret: deezerSecret,
      code: code}), (error, response, body) => {
        if (!error) {
        const token = querystring.parse(body);
        accessToken = token.access_token;
        expiration = token.expires;
        res.redirect("http://localhost:3000")
      } else res.redirect("http://localhost:3000"+
      querystring.stringify({
        error: error,
      }))
      })
});

app.get("/auth/token", function (req, res) {
  res.json({accessToken});
  res.cookie("accessToken", accessToken);
});

app.get("/search", (req, res) => {
  const params = req
  console.log(req)
  const searchOption = {
    url: "https://api.deezer.com/search?" + 
    querystring.stringify({
      q:"booba"
    }),
    headers : {
       Authorization: `Bearer ${accessToken}`
    },
    json: true,
  }

  request.get( searchOption, (error, response, body) => {
      if(!error) {
      console.log("response");
      res.json({response});
    } else {
      console.error("error");
      res.status(500);
    }

    })
});

console.log("Listening on 8888");
app.listen(8888);
