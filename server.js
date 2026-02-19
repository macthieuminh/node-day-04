require("dotenv").config();

const express = require("express");
const app = express();

require("./src/config/database");
const response = require("./src/middlewares/response.middleware");
const postController = require("./src/controller/post.controller");

const port = process.env.PORT || 3000;

app.use(express.json());

app.use(response);

app.get("/posts", postController.getAll);
app.get("/posts/:id", postController.getOne);

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});
