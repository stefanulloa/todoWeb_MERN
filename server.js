const express = require("express");
const mongoose = require("mongoose");
const path = require("path");

const items = require("./routes/api/items");

const app = express();

app.use(express.json());

//access mongoDB URI
const db = require("./config/keys.js").mongoURI;

//connect to mongo
//.then because connect() allows promise, we can catch errors with .catch
mongoose
  .connect(db)
  .then(() => console.log("MongoDB connected..."))
  .catch(err => console.log(err));

//any command relating to /api/items excute "items" functions
app.use("/api/items", items);

//provide static assets in production
if (process.env.NODE_ENV === "production") {
  //setting static folder
  app.use(express.static("client/build"));

  //when in production and as long as the path is not "/api/items", this will be detected
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
}

//it could be on an external server, or port 5000
const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server started on port ${port}`));
