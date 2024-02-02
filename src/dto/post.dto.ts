import Joi from 'joi';

export type Post = {
  userId: number;
  id: number;
  body: string;
  title: string;
};

export type CreateNewPostPayloadBody = {
  userId: number;
  title: string;
  body: string;
};

export type PutPostPayload = {
  userId: number;
  title: string;
  body: string;
  id: number;
};

export type PatchPostPayload = {
  title?: string;
  body?: string;
};

export type postReturnObject = {
  recordCount: number;
  message: string;
  statusCode: number;
  data: Post[] | Post | null;
  isError: boolean;
  errorMessage: string;
};

export const getPostByIdSchema: Joi.ObjectSchema<any> = Joi.object({
  postId: Joi.number().min(1).required().messages({
    'number.base': 'id passed in url must be a number',
    'number.min': 'id passed in url should be number greater than equal to 1',
  }),
});

export const createPostsSchema: Joi.ObjectSchema<CreateNewPostPayloadBody> =
  Joi.object({
    title: Joi.string().trim().required().max(1000),
    body: Joi.string().trim().required().max(1000),
    userId: Joi.number().integer().positive().required().messages({
      'number.positive': 'userId should be greater than 0',
    }),
  });

export const patchPostsSchema: Joi.ObjectSchema<PatchPostPayload> = Joi.object({
  title: Joi.string().trim().max(1000),
  body: Joi.string().trim().max(1000),
  postId: Joi.number().min(1).required().messages({
    'number.base': 'id passed in url must be a number',
    'number.min': 'id passed in url should be number greater than equal to 1',
  }),
})
  .or('title', 'body')
  .messages({
    'object.missing': 'either title or body is required',
  });

export const putPostsSchema: Joi.ObjectSchema<PutPostPayload> = Joi.object({
  userId: Joi.number().integer().positive().required().empty(),
  title: Joi.string().max(1000).required().empty(),
  body: Joi.string().max(1000).required().empty(),
  id: Joi.number().integer().positive().required().empty(),
  postId: Joi.number().min(1).required().valid(Joi.ref('id')).messages({
    'number.base': 'id passed in url must be a number',
    'number.min':
      'id passed in url should be a number greater than or equal to 1',
    'any.only':
      'id passed in url must be equal to the id passed in the request body',
  }),
});
