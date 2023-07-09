import { CommentInterface } from 'interfaces/comment';
import { UserInterface } from 'interfaces/user';
import { GetQueryInterface } from 'interfaces';

export interface SnippetInterface {
  id?: string;
  code: string;
  user_id?: string;
  created_at?: any;
  updated_at?: any;
  comment?: CommentInterface[];
  user?: UserInterface;
  _count?: {
    comment?: number;
  };
}

export interface SnippetGetQueryInterface extends GetQueryInterface {
  id?: string;
  code?: string;
  user_id?: string;
}
