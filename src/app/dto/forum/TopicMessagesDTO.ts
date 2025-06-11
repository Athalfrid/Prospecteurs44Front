
export interface TopicMessagesDTO {
  id: number;
  content?: string;       // nullable côté backend
  createdAt: string;      // Date en ISO string
  topic: TopicMiniDTO;
  author: AuthorDTO;           // dépend de la classe User, que je te propose ci-dessous
  isReported: boolean;
}

export interface AuthorDTO{
  userId: number;
  userPseudo: string;
}

export interface TopicMiniDTO {
  id: number;
  title: string;
}