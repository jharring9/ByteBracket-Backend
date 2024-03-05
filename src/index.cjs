const express = require("express");
const bodyParser = require("body-parser");
const session = require("cookie-session");

const setupServer = async () => {
  /* Set up express pipeline */
  let app = express();
  app.use(bodyParser.urlencoded({ extended: true }));
  app.use(bodyParser.json());

  /* Set up cookie sessions */
  app.store = session({
    name: "session",
    secret: "bytebracketsessionsecret",
    resave: false,
    saveUninitialized: true,
    cookie: { secure: true },
  });
  app.use(app.store);
  require("./api/index.cjs")(app);

  /* Health check API */
  app.get("/health", (req, res) => {
    console.info("Health check passed");
    return res.sendStatus(200);
  });

  /* Start the server */
  const server = app.listen(80, () => {
    console.info(`ByteBracket backend listening on: ${server.address().port}`);
  });
};

// Run the server
setupServer();
