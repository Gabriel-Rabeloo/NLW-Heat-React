import { User } from './user';

export type Message = {
  id: string;
  text: string;
  user: User;
};
