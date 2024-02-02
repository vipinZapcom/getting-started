import {CreateNewPostPayloadBody, PutPostPayload} from '../dto/post.dto';
import {Post} from '../models';
import {Posts} from '../schemas/post.schema';

/* export async function findAllPost(): Promise<Post[]> {
  try {
    return await Posts.find({});
  } catch (error) {
    console.log('Unable to fetch data for all posts.');
    throw new Error('Unable to fetch data for all posts.');
  }
} */

export async function createNewPostDb(
  createNewPostPayload: CreateNewPostPayloadBody,
): Promise<object> {
  try {
    const postsCount = await Posts.countDocuments();
    const newPost = new Posts({
      ...createNewPostPayload,
      id: postsCount + 1,
    });
    const isPostExists = await Posts.findOne({...createNewPostPayload});
    if (isPostExists && isPostExists.id) {
      return {
        data: [],
        error: `The given post already exists for the userId ${createNewPostPayload.userId} having the same content`,
        isError: false,
        statusCode: 200,
      };
    }
    const createdPostResponseDb = await newPost.save();
    // if (createdPostResponseDb) {
    return {
      data: createdPostResponseDb,
      statusCode: 201,
      isError: false,
      error: '',
    };
    // }
  } catch (error) {
    console.log('Failed creating the post');
    return {
      data: [],
      statusCode: 500,
      error: error,
      isError: true,
    };
  }
}

export async function findPostById(id: number): Promise<Post | null> {
  try {
    return await Posts.findOne({id});
  } catch (error) {
    console.log('Unable to fetch data for the post with id ' + id);
    throw error;
  }
}

export async function updatePostUsingPut(
  postId: number,
  body: PutPostPayload,
): Promise<string> {
  try {
    console.log('BEFORE UPDATING THE POST.');

    await Posts.findOneAndUpdate({id: postId}, body);
    console.log('AFTER UPDATING THE POST.');

    return 'record updted successfully.';
  } catch (error) {
    console.log(`Unable to update the record.`);
    throw error;
  }
}
