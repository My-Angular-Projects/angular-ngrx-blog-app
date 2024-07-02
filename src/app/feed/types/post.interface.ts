import { Timestamp } from 'firebase/firestore';

export interface PostInterface {
  id: string;
  userId: string;
  title: string;
  content: string;
  userEmail: string;
  createdAt: Timestamp;
}
