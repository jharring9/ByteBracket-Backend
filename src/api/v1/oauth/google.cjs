const querystring = require("querystring");
const axios = require("axios");
const userDB = require("../../../dynamo/user.cjs");
const CLIENT_ID =
  "213000508882-r8u1p0q5rm6v7u82hvs0ncq9b1nkkqo5.apps.googleusercontent.com";
const CLIENT_SECRET = "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";
const SERVER_ROOT_URI = "http://localhost:8080";
const REDIRECT_URI = "auth/callback/google";

module.exports = (app) => {
  app.get("/v1/oauth/google", (req, res) => {
    return res.send(getGoogleAuthURL());
  });

  app.get("/v1/oauth/google/process", async (req, res) => {
    const code = req.query.code;
    try {
      const { id_token, access_token } = await getTokens({
        code,
        clientId: CLIENT_ID,
        clientSecret: CLIENT_SECRET,
        redirectUri: `${SERVER_ROOT_URI}/${REDIRECT_URI}`,
      });

      const googleUser = await axios
        .get(
          `https://www.googleapis.com/oauth2/v1/userinfo?alt=json&access_token=${access_token}`,
          {
            headers: {
              Authorization: `Bearer ${id_token}`,
            },
          }
        )
        .then((res) => res.data)
        .catch((error) => {
          throw new Error(error.message);
        });

      /* Try to find user in DynamoDB - if it doesn't exist, create it */
      const dynamoUser = await userDB.getUser(googleUser.email.toLowerCase());
      if (!dynamoUser?.username) {
        const user = {
          username: googleUser.email.toLowerCase(),
          email: googleUser.email.toLowerCase(),
          first: googleUser.given_name,
          last: googleUser.family_name,
        };
        if (!(await userDB.saveUser(user))) {
          return res
            .status(503)
            .send({ error: "Server error. Please try again." });
        }
      }
      req.session.user = {
        first: dynamoUser?.first || googleUser.given_name,
        last: dynamoUser?.last || googleUser.family_name,
        username: dynamoUser?.username || googleUser.email,
        email: dynamoUser?.email || googleUser.email,
        leagues: dynamoUser?.leagues || [],
      };
      return res.status(201).send(req.session.user);
    } catch (err) {
      console.error("Error in Google OAuth: ", err);
      return res.status(500).send({ error: "Server error. Please try again." });
    }
  });
};

/**
 * Create OAuth URL to redirect user to Google for authentication.
 */
function getGoogleAuthURL() {
  const rootUrl = "https://accounts.google.com/o/oauth2/v2/auth";
  const options = {
    redirect_uri: `${SERVER_ROOT_URI}/${REDIRECT_URI}`,
    client_id: CLIENT_ID,
    access_type: "offline",
    response_type: "code",
    prompt: "consent",
    scope: [
      "https://www.googleapis.com/auth/userinfo.profile",
      "https://www.googleapis.com/auth/userinfo.email",
    ].join(" "),
  };

  return `${rootUrl}?${querystring.stringify(options)}`;
}

/**
 * Exchange authorization code for access token.
 */
async function getTokens({ code, clientId, clientSecret, redirectUri }) {
  const url = "https://oauth2.googleapis.com/token";
  const values = {
    code,
    client_id: clientId,
    client_secret: clientSecret,
    redirect_uri: redirectUri,
    grant_type: "authorization_code",
  };

  return axios
    .post(url, querystring.stringify(values), {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
    })
    .then((res) => res.data)
    .catch((error) => {
      throw new Error(error.message);
    });
}
