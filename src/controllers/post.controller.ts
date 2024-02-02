// Uncomment these imports to begin using these cool features!

import {intercept} from '@loopback/core';
import {get, param, post, put, requestBody} from '@loopback/rest';
import {
  CreateNewPostPayloadBody,
  PutPostPayload,
  postReturnObject,
} from '../dto/post.dto';
import {PostInterceptor} from '../interceptor/post.interceptor';
import {
  createNewPostDb,
  findAllPost,
  findPostById,
  updatePostUsingPut,
} from '../service/post.service';

// import {inject} from '@loopback/core';

export class PostController {
  @get('/posts')
  async getAllPosts(): Promise<postReturnObject> {
    try {
      const allPosts = await findAllPost();
      return {
        recordCount: allPosts.length,
        message: '',
        statusCode: 200,
        data: allPosts,
        isError: false,
        errorMessage: '',
      };
    } catch (error) {
      return {
        recordCount: 0,
        message: '',
        statusCode: 400,
        data: [],
        isError: true,
        errorMessage: error.message,
      };
    }
  }

  @intercept(new PostInterceptor().createPostInterceptor)
  @post('/posts')
  async createPost(
    @requestBody() post: CreateNewPostPayloadBody,
  ): Promise<object> {
    console.log(`inside endpoint`);

    return await createNewPostDb(post);
  }

  @intercept(new PostInterceptor().fetchPostByIdInterceptor)
  @get('/post/{id}')
  async getPostById(
    @param.path.number('id') id: number,
  ): Promise<postReturnObject> {
    try {
      const data = await findPostById(id);
      if (!data) {
        return {
          recordCount: 0,
          message: 'No matching records are found.',
          statusCode: 400,
          data: data,
          isError: false,
          errorMessage: '',
        };
      }
      return {
        recordCount: 1,
        message: '',
        statusCode: 200,
        data: data,
        isError: false,
        errorMessage: '',
      };
    } catch (error) {
      return {
        recordCount: 0,
        message: '',
        statusCode: 400,
        data: null,
        isError: true,
        errorMessage: error.message,
      };
    }
  }

  @intercept(new PostInterceptor().putPostInterceptor)
  @put('/post/{id}')
  async updatePostUsingPut(
    @param.path.number('id') id: number,
    @requestBody() body: PutPostPayload,
  ): Promise<postReturnObject> {
    try {
      console.log('updatePostUsingPut');
      console.log(body);

      const res = await updatePostUsingPut(id, body);
      return {
        recordCount: 1,
        message: res,
        statusCode: 200,
        data: null,
        isError: false,
        errorMessage: '',
      };
    } catch (error) {
      return {
        recordCount: 0,
        message: '',
        statusCode: 400,
        data: null,
        isError: true,
        errorMessage: error.message,
      };
    }
  }
}

/* @get('/comments')
  async getCommentsByPostId(
    @param.query.string('postId') id: string,
  ): Promise<object> {
    const url = `https://jsonplaceholder.typicode.com/posts/${id}/comments`;
    const post: Post | null = await fetchPostById(url);
    if (post && Object.keys(post).length > 0) {
      return {
        msg: `Here is the post.....`,
        statusCode: 200,
        data: post,
        error: false,
        errorMessage: '',
      };
    } else {
      return {
        msg: `No post found.`,
        statusCode: 200,
        data: true,
        error: true,
        errorMessage: 'No posts found.',
      };
    }
  }

  @get('/post/{id}/comments')
  async getCommentsById(@param.path.string('id') id: string): Promise<object> {
    const url = `https://jsonplaceholder.typicode.com/posts/${id}/comments`;
    const post: Post | null = await fetchPostById(url);
    // console.log(Array.isArray(post));

    if (post && Object.keys(post).length > 0) {
      return {
        msg: `Here is the post.....`,
        statusCode: 200,
        data: post,
        error: false,
        errorMessage: '',
      };
    } else {
      return {
        msg: `No post found.`,
        statusCode: 200,
        data: true,
        error: true,
        errorMessage: 'No posts found.',
      };
    }
  } */
