import {Entity, model, property} from '@loopback/repository';

@model({settings: {strict: false}})
export class Post extends Entity {
  @property({
    type: 'number',
    required: true,
  })
  id: number;
  @property({
    type: 'number',
    // required: true,
  })
  userId: number;

  @property({
    type: 'string',
    required: true,
  })
  title: string;

  @property({
    type: 'string',
    required: true,
  })
  body: string;

  // Define well-known properties here

  // Indexer property to allow additional data
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [prop: string]: any;

  constructor(data?: Partial<Post>) {
    super(data);
  }
}

export interface PostRelations {
  // describe navigational properties here
}

export type PostWithRelations = Post & PostRelations;
