import axios, {AxiosError, AxiosResponse} from 'axios';
import {Post} from '../models';

export async function fetchAllPosts(url: string): Promise<Post[]> {
  try {
    const response: AxiosResponse = await axios.get(url);
    console.log('fetchAllPosts');
    console.log(`response?.data`);
    console.log(response?.data);
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const axiosError: AxiosError = error;
      console.log(axiosError.message);
      console.log(axiosError.response?.data);
    } else {
      console.log(`Error is ${error.message}`);
    }
  }
  return [];
}

export async function fetchPostById(url: string): Promise<Post | null> {
  try {
    const response: AxiosResponse = await axios.get(url);
    console.log('fetchPostById');
    console.log(`response?.data`);
    console.log(response?.data);

    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const axiosError: AxiosError = error;
      console.log(axiosError.message);
      console.log(axiosError.response?.data);
    } else {
      console.log(`Error is ${error.message}`);
    }
  }
  return null;
}

export async function createPost(post: Post): Promise<object> {
  try {
    const response: AxiosResponse = await axios.post(
      'https://jsonplaceholder.typicode.com/posts',
      post,
    );
    return {
      msg: 'Post created succesfully.',
      statusCode: 200,
      data: null,
      error: false,
      errorMessage: '',
    };
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const axiosError: AxiosError = error;
      console.log(axiosError.message);
      console.log(axiosError.response?.data);
      return {
        msg: axiosError.message,
        statusCode: 200,
        data: null,
        error: false,
        errorMessage: '',
      };
    } else {
      console.log(`Error is ${error.message}`);
      return {
        msg: error.message,
        statusCode: 200,
        data: null,
        error: false,
        errorMessage: '',
      };
    }
  }
}

// function formatData(posts: P[]) {}
