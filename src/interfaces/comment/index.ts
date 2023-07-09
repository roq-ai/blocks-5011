import { UserInterface } from 'interfaces/user';
import { SnippetInterface } from 'interfaces/snippet';
import { GetQueryInterface } from 'interfaces';

export interface CommentInterface {
  id?: string;
  content: string;
  user_id?: string;
  snippet_id?: string;
  created_at?: any;
  updated_at?: any;

  user?: UserInterface;
  snippet?: SnippetInterface;
  _count?: {};
}

export interface CommentGetQueryInterface extends GetQueryInterface {
  id?: string;
  content?: string;
  user_id?: string;
  snippet_id?: string;
}
