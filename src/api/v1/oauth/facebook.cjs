const querystring = require("querystring");
const axios = require("axios");
const userDB = require("../../../dynamo/user.cjs");
const CLIENT_ID = "901016331318377";
const CLIENT_SECRET = "c8e900f2613b57e1fd5ce9f600591af6";
const SERVER_ROOT_URI = "https://bytebracket.io";
const REDIRECT_URI = "auth/callback/facebook";

module.exports = (app) => {
  app.get("/v1/oauth/facebook", (req, res) => {
    return res.send(getFacebookAuthURL());
  });

  app.get("/v1/oauth/facebook/process", async (req, res) => {
    const code = req.query.code;
    try {
      const { access_token } = await getTokens({
        clientId: CLIENT_ID,
        redirectUri: `${SERVER_ROOT_URI}/${REDIRECT_URI}`,
        clientSecret: CLIENT_SECRET,
        code,
      });

      const facebookUser = await axios
        .get(
          `https://graph.facebook.com/me?fields=first_name,last_name,email&access_token=${access_token}`
        )
        .then((res) => res.data);

      /* Try to find user in DynamoDB - if it doesn't exist, create it */
      const dynamoUser = await userDB.getUser(facebookUser.email.toLowerCase());
      if (!dynamoUser?.username) {
        const user = {
          username: facebookUser.email.toLowerCase(),
          email: facebookUser.email.toLowerCase(),
          first: facebookUser.first_name,
          last: facebookUser.last_name,
        };
        if (!(await userDB.saveUser(user))) {
          return res
            .status(503)
            .send({ error: "Server error. Please try again." });
        }
      }
      req.session.user = {
        first: dynamoUser?.first || facebookUser.first_name,
        last: dynamoUser?.last || facebookUser.last_name,
        username: dynamoUser?.username || facebookUser.email,
        email: dynamoUser?.email || facebookUser.email,
        leagues: dynamoUser?.leagues || [],
      };
      return res.status(201).send(req.session.user);
    } catch (err) {
      console.error("Error in Facebook OAuth: ", err);
      return res.status(500).send({ error: "Server error. Please try again." });
    }
  });
};

/**
 * Create OAuth URL to redirect user to Google for authentication.
 */
function getFacebookAuthURL() {
  const rootUrl = "https://www.facebook.com/v16.0/dialog/oauth";
  const options = {
    client_id: CLIENT_ID,
    redirect_uri: `${SERVER_ROOT_URI}/${REDIRECT_URI}`,
    scope: "email",
  };
  return `${rootUrl}?${querystring.stringify(options)}`;
}

/**
 * Exchange authorization code for access token.
 */
async function getTokens({ code, clientId, clientSecret, redirectUri }) {
  const url = "https://graph.facebook.com/v16.0/oauth/access_token";
  const values = {
    client_id: clientId,
    redirect_uri: redirectUri,
    client_secret: clientSecret,
    code,
  };

  return axios
    .post(url, querystring.stringify(values), {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
    })
    .then((res) => res.data);
}
