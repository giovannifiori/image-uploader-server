const Post = require("../models/post");

class PostController {
  async upload(req, res) {
    console.log(req.file);
    const { originalname: name, size, key, location: url = "" } = req.file;
    const post = await Post.create({
      name,
      size,
      key,
      url
    });
    res.status(201).json(post);
  }

  async listAll(req, res) {
    const posts = await Post.find();

    res.status(200).json(posts);
  }

  async delete(req, res) {
    const post = await Post.findById(req.params.id);

    await post.remove();
    res.send();
  }
}

module.exports = PostController;
