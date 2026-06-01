export interface ConversationType {
  _id: string;
  type: "direct" | "group";
  
  user1?: {
    _id: string;
    userId: string;
    username: string;
    profileUrl?: string;
    followers?: string[];
  };
  user2?: {
    _id: string;
    userId: string;
    username: string;
    profileUrl?: string;
    followers?: string[];
  };
  
  groupName?: string;
  groupImage?: string;
  groupAdmin?: {
    _id: string;
    userId: string;
    username: string;
    profileUrl?: string;
  };
  groupMembers?: Array<{
    userId: {
      _id: string;
      userId: string;
      username: string;
      profileUrl?: string;
    };
    role: "admin" | "member";
    joinedAt: Date;
  }>;
  
  lastMessage?: string;
  lastMessageSender?: {
    _id: string;
    username: string;
  };
  lastMessageTime?: Date;
  
  unreadCountUser1?: number;
  unreadCountUser2?: number;
  groupUnreadCounts?: Array<{
    unreadCount: number;
    _id: string;
  }>;
  
  createdAt: Date;
  updatedAt: Date;
}