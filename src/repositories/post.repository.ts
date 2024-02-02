import {DefaultCrudRepository} from '@loopback/repository';
import {Post} from '../models';
import {Posts} from '../schemas/post.schema';

export class PostRepository extends DefaultCrudRepository<
  Post,
  typeof Post.prototype.id
> {
  async findAllPost(): Promise<Post[]> {
    try {
      return await Posts.find({});
    } catch (error) {
      console.log('Unable to fetch data for all posts.');
      throw new Error('Unable to fetch data for all posts.');
    }
  }
}
