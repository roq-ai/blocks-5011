import axios from 'axios';
import queryString from 'query-string';
import { CommentInterface, CommentGetQueryInterface } from 'interfaces/comment';
import { GetQueryInterface } from '../../interfaces';

export const getComments = async (query?: CommentGetQueryInterface) => {
  const response = await axios.get(`/api/comments${query ? `?${queryString.stringify(query)}` : ''}`);
  return response.data;
};

export const createComment = async (comment: CommentInterface) => {
  const response = await axios.post('/api/comments', comment);
  return response.data;
};

export const updateCommentById = async (id: string, comment: CommentInterface) => {
  const response = await axios.put(`/api/comments/${id}`, comment);
  return response.data;
};

export const getCommentById = async (id: string, query?: GetQueryInterface) => {
  const response = await axios.get(`/api/comments/${id}${query ? `?${queryString.stringify(query)}` : ''}`);
  return response.data;
};

export const deleteCommentById = async (id: string) => {
  const response = await axios.delete(`/api/comments/${id}`);
  return response.data;
};
