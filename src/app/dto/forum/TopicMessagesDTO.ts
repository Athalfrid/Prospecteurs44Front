import { User } from "../register.dto";

export interface TopicMessagesDTO {
  id: number;
  content?: string;       // nullable côté backend
  createdAt: string;      // Date en ISO string
  topicId: number;
  author: User;           // dépend de la classe User, que je te propose ci-dessous
  isReported: boolean;
}
