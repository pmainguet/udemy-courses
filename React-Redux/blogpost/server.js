const express = require("express");
const path = require("path");
const port = process.env.PORT || 8080;
const app = express();

//Give everyone access to the current folder => browser automatically serve index.html
app.use(express.static(__dirname));

//for any direct URL, because we are using Browserhistory and not hashHistory,
// we need to say to always send index.html to correctly bootup React
//(otherwise 404 of Express server for any other page directly accessed apart from / )
app.get("*", (req, res) => {
  res.sendFile(path.resolve(__dirname, "index.html"));
});

app.listen(port);
console.log("Server started");
