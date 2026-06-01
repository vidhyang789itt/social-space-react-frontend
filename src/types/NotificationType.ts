
export interface NotificationType {
    _id : string,
    recipient: {
        _id : string,
        username : string,
        profileUrl : string,
        userId : string
    },
    sender: {
        _id : string,
        username : string,
        profileUrl : string,
        userId : string
    },
    type: "FOLLOW" | "LIKE" | "COMMENT" | "MESSAGE",
    content : string,
    referenceId: {
        _id : string,
        title : string,
        postId : string,
        imageUrl : string
    },
    isRead: Boolean,
    createdAt: string
  }