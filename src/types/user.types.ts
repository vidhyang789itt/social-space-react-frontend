export interface User {
  _id: string;
  userId: string;
  username: string;
  email: string;
  profileUrl: string;
  followers: string[];
  following: string[];
  createdAt: string;
  updatedAt: string;
}
