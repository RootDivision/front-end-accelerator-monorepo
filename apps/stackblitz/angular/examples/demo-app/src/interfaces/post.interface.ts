import { Pagination } from './pagination.interface';

export interface PaginatedPostResponse extends Pagination {
  // hasMore: boolean;
  posts: Post[];
  // totalPages: number;
}

export interface Post {
  body: string;
  id: number;
  reactions: {
    dislikes: number;
    likes: number;
  };
  tags: string[];
  title: string;
  userId: number;
  views: number;
}
