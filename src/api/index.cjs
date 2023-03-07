module.exports = (app) => {
  require("./v1/user.cjs")(app);
  require("./v1/lambda.cjs")(app);
  require("./v1/session.cjs")(app);
  require("./v1/bracket.cjs")(app);
  require("./v1/league.cjs")(app);
  require("./v1/oauth/google.cjs")(app);
  require("./v1/oauth/facebook.cjs")(app);
};
