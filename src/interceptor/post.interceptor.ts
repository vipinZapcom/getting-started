import {
  Interceptor,
  InvocationContext,
  Next,
  Provider,
  ValueOrPromise,
} from '@loopback/core';
import {
  createPostsSchema,
  getPostByIdSchema,
  patchPostsSchema,
  putPostsSchema,
} from '../dto/post.dto';
import {validateRequestBody} from '../utils/joi.service';

export class PostInterceptor implements Provider<Interceptor> {
  value(): ValueOrPromise<Interceptor> {
    throw new Error('Method not implemented.');
  }

  async fetchPostByIdInterceptor(
    context: InvocationContext,
    next: Next,
  ): Promise<any> {
    const postIdFromUrl = context.args[0];
    const finalRequestBody = {postId: postIdFromUrl};
    const validationResponse = await validateRequestBody(
      finalRequestBody,
      getPostByIdSchema,
    );
    if (validationResponse?.error.length) {
      return validationResponse;
    }
    const result = await next();
    return result;
  }

  async createPostInterceptor(
    context: InvocationContext,
    next: Next,
  ): Promise<any> {
    const requestBody = context.args[0];
    const validationResponse = await validateRequestBody(
      requestBody,
      createPostsSchema,
    );
    if (validationResponse?.error.length) {
      return validationResponse;
    }
    const result = await next();
    return result;
  }

  async patchPostInterceptor(
    context: InvocationContext,
    next: Next,
  ): Promise<any> {
    const requestBody = context.args[0];
    const postId = context.args[1];
    const finalRequestBody = {postId, ...requestBody};
    const validationResponse = await validateRequestBody(
      finalRequestBody,
      patchPostsSchema,
    );
    if (validationResponse?.error.length) {
      return validationResponse;
    }
    const result = await next();
    return result;
  }

  async putPostInterceptor(
    context: InvocationContext,
    next: Next,
  ): Promise<any> {
    const requestBody = context.args[0];
    const postId = context.args[1];
    const finalRequestBody = {postId, ...requestBody};
    const validationResponse = await validateRequestBody(
      finalRequestBody,
      putPostsSchema,
    );
    if (validationResponse?.error.length) {
      return validationResponse;
    }
    const result = await next();
    return result;
  }
}
