export interface MessageType {
  _id: string;
  conversationId: string;
  senderId: {
    _id: string;
    userId: string;
    username: string;
    profileUrl?: string;
  };
  receiverId?: {
    _id: string;
    userId: string;
    username: string;
    profileUrl?: string;
  };
  isDeletedForAll?: boolean;
  originalContent?: string;
  deletedForMe?: Array<{
    userId: string;
  }>;
  content?: string;
  messageType: "text" | "image" | "video" | "file" | "mixed";
  media?: Array<{
    url: string;
    type: "image" | "video" | "file";
    fileName?: string;
    fileSize?: number;
  }>;
  isRead: boolean;
  readBy?: Array<{
    userId: {
      _id: string;
      userId: string;
      username: string;
    };
    readAt: Date;
  }>;
  replyTo?: {
    _id: string;
    content: string;
    senderName: string;
    media?: Array<{
      url: string;
      type: "image" | "video" | "file";
    }>;
  };
  createdAt: string;
  updatedAt: string;
}