import { Pagination } from './pagination.interface';

export interface Comment {
  body: string;
  id: number;
  likes: number;
  postId: number;
  user: User;
}

export type CommentResponse = Pagination & {
  comments: Comment[];
};

export interface User {
  fullName: string;
  id: number;
  username: string;
}
