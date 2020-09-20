const Post = require("../models/post");
const { randomBytes } = require("crypto");

module.exports = (app) => {
  app.get("/posts", (req, res) => {
    Post.find().then((posts) => {
      res.send(posts);
    });
  });

  app.post("/posts", async (req, res) => {
    const newPost = new Post({
      title: req.body.title,
    });
    newPost
      .save()
      .then(async (post) => {
        await axios.post("http://localhost:4005/events", {
          type: "PostCreated",
          data: post,
        });

        res.status(201).send(post);
      })
      .catch((err) => {
        console.log(err.message);
      });
  });

  app.post("/events", (req, res) => {
    console.log("Received Event", req.body.type);

    res.send({});
  });
};
