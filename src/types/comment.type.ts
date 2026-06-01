export interface Comment {
  _id: string;
  post: string;
  content: string;
  user: {
    _id: string;
    userId: string;
    username: string;
    profileUrl: string;
  };
  createdAt: string;
}
