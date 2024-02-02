import mongoose from 'mongoose';

const {Schema} = mongoose;

const postsSchema = new Schema({
  id: {type: Number, required: true, unique: true},
  userId: {type: Number, required: true},
  title: {type: String, required: true},
  body: {type: String, required: true},
});
export const Posts = mongoose.model('Posts', postsSchema);
