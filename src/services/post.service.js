const paginationService = require('./pagination.service');
const postModel = require('../model/post.model');

const PostService = {
    model: postModel,
};

paginationService.apply(PostService);

module.exports = PostService;
