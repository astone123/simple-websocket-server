const express = require("express");
const https = require("https");
const fs = require("fs");
const app = express();
const queue = require("queue");
const bodyParser = require("body-parser");

const q = queue({ autostart: true });
const messages = [];

const { CERTIFICATE_PATH, PRIVATE_KEY_PATH, API_KEY, PORT } = process.env;

if (!CERTIFICATE_PATH || !PRIVATE_KEY_PATH) {
  console.error("You must specify a CERTIFICATE_PATH and PRIVATE_KEY_PATH");
  process.exit(1);
}

if (!API_KEY) {
  console.error("You must specify an API_KEY for the websocket connection");
  process.exit(1);
}

const port = PORT || 3000;

const privateKey = fs.readFileSync(PRIVATE_KEY_PATH);
const certificate = fs.readFileSync(CERTIFICATE_PATH);

const httpsServer = https.createServer(
  {
    key: privateKey,
    cert: certificate
  },
  app
);
const expressWss = require("express-ws")(app, httpsServer);

app.use(bodyParser.json());

const log = info => {
  console.log("---------------------------");
  console.log(info);
  console.log("---------------------------");
};

app.post("/webhook", function(req, res) {
  log(req.body);
  data = JSON.stringify(req.data);
  q.push(cb => {
    messages.push(data);
    cb();
  });
  res.send(200);
});

app.ws("/", function(ws, req) {
  const apiKey = req.query.apiKey;

  if (!apiKey || apiKey != API_KEY) {
    ws.close();
  }

  q.on("success", function() {
    ws.send(messages.pop());
  });
});

httpsServer.listen(port);
