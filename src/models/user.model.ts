import {Model, model, property} from '@loopback/repository';

@model({settings: {strict: false}})
export class User extends Model {
  @property({
    type: 'number',
    id: true,
    generated: false,
    required: true,
  })
  userId: number;

  @property({
    type: 'number',
    required: true,
  })
  id: number;

  @property({
    type: 'string',
  })
  title?: string;

  @property({
    type: 'boolean',
  })
  completed?: boolean;

  // Define well-known properties here

  // Indexer property to allow additional data
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [prop: string]: any;

  constructor(data?: Partial<User>) {
    super(data);
  }
}

export interface UserRelations {
  // describe navigational properties here
}

export type UserWithRelations = User & UserRelations;
