const router = require("express").Router();
const multer = require("multer");
const multerConfig = require("./config/multer");
const PostController = require("./controllers/post");

const postController = new PostController();

router
  .route("/posts")
  .get(postController.listAll)
  .post(multer(multerConfig).single("file"), postController.upload);

router.route("/posts/:id").delete(postController.delete);

module.exports = router;
