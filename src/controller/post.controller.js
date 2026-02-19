const PostService = require("../services/post.service");
const postModel = require("../model/post.model");

const getAll = async (req, res) => {
  const page = +req.query.page || 1;
  const limit = +req.query.limit || 20;
  const result = await PostService.pagination(page, limit, {
    user_id: req.query.user_id,
  });

  res.paginate(result);
};

const getOne = async (req, res) => {
  const task = await postModel.findOne(req.params.id);
  if (!task) return res.error("Not found", 404);

  res.success(task);
};

const create = (req, res) => {};

module.exports = { getAll, getOne, create };
