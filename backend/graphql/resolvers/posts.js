const { AuthenticationError, UserInputError } = require('apollo-server');
const Post = require('../../models/Post');
const checkAuth = require('../../util/check-auth');

module.exports = {
  Query: {
    async getPosts() {
      try {
        const posts = await Post.find().populate('user').exec();
        return posts;
      } catch (error) {
        throw new Error(error);
      }
    },
    async getPost(_, { postId }) {
      try {
        const post = await Post.findOne({_id: postId}).populate('user').exec();
        if (post) {
          return post;
        } else {
          throw new Error('Post not found')
        }
      } catch (error) {
        throw new Error(error);
      }
    }
  },
  Mutation: {
    async createPost(_, { body }, context) {
      const user = checkAuth(context);

      if(body.trim() === '') {
        throw new Error('Post body must not me empty');
      }

      const newPost = new Post({
        body,
        user: user.id,
        username: user.username,
        createdAt: new Date().toISOString()
      })

      const post = await newPost.save();

      return post;
    },
    async updatePost(_, { postId, body }, context){
      const user = checkAuth(context);

      try {
        const post = await Post.findById(postId);

        if(post){
          post.body = body;
          await post.save();
          return post;
        } else {
          throw new UserInputError('Post not found');
        }
      } catch (error) {
        throw new Error(error);
      }
      














    },
    async deletePost(_, { postId }, context){
      const user = checkAuth(context);
      
      try {
        const post = await Post.findById(postId);
        if( user.isAdmin || (user.username === post.username) ){
          await post.delete();
          return 'Post deleted successfully';
        } else {
          throw new AuthenticationError('Action not allowed')
        }
      } catch (error) {
        throw new Error(error);
      }
    },
    async likePost(_, { postId }, context){
      const { username } = checkAuth(context);

      const post = await Post.findById(postId);

      if(post){
        if(post.likes.find(like => like.username === username)){
          //post already liked, unlike it
          post.likes = post.likes.filter(like => like.username !== username);
        } else {
          //Not liked, like post
          post.likes.push({
            username,
            createdAt: new Date().toISOString()
          })
        }
        await post.save();
        return post;
      } else {
        throw new UserInputError('Post not found');
      }
    }
  }
}