const express = require("express");
const bodyParser = require("body-parser");
// const { randomBytes } = require("crypto");
const cors = require("cors");
// const axios = require("axios");
const mongoose = require("mongoose");

const app = express();
app.use(cors());

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

mongoose.connect("mongodb://localhost/posts", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// const posts = {};

// app.get("/posts", (req, res) => {
//   res.send(posts);
// });

// app.post("/posts", async (req, res) => {
//   const id = randomBytes(4).toString("hex");
//   const { title } = req.body;

//   posts[id] = {
//     id,
//     title,
//   };

//   await axios.post("http://localhost:4005/events", {
//     type: "PostCreated",
//     data: {
//       id,
//       title,
//     },
//   });

//   res.status(201).send(posts[id]);
// });

// app.post("/events", (req, res) => {
//   console.log("Received Event", req.body.type);

//   res.send({});
// });
const posts = require("./controllers/posts")(app);

const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
  console.log("Listening on 4000");
});
