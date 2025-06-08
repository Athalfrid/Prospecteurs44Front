import { TopicMessagesDTO } from "./TopicMessagesDTO";

export interface TopicDTO {
  id?: number;
  title: string;          // nullable côté backend (string?), on laisse optionnel ici
  content: string;        // nullable, idem
  createdAt?: string;       // Date en ISO string
  updatedAt?: string;      // nullable, optionnel
  isClosed?: boolean;
  closedAt?: string;       // nullable, optionnel
  messages?: TopicMessagesDTO[];  // liste de messages, optionnelle aussi
}
