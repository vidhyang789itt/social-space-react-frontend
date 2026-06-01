import { API_ROUTES } from "../constants/apiRoutes";
import type { ConversationType } from "../types/Conversation";
import type { MessageType } from "../types/message.type";
import { fetchClient } from "./fetchClient";

export const getConversationsApi = async () => {
  return fetchClient<ConversationType[]>(API_ROUTES.GETUSERCONVERSATION, {
    method: "GET",
    requireAuth: true,
  });
};

interface PaginatedMessagesResponse {
  messages: MessageType[];
  totalMessages: number;
  totalPages: number;
  currentPage: number;
  hasNextPage: boolean;
  hasPreviousPage: boolean;
}

export const getMessagesApi = async (
  conversationId: string,
  page: number,
  limit: number,
): Promise<PaginatedMessagesResponse> => {
  return fetchClient<PaginatedMessagesResponse>(
    API_ROUTES.GETMESSAGES(conversationId, page, limit),
    {
      method: "GET",
      requireAuth: true,
    }
  );
};

export const createConversationApi = async (otherUserId: string) => {
  return fetchClient<ConversationType>(API_ROUTES.CREATECONVERSATION, {
    method: "POST",
    requireAuth: true,
    body: JSON.stringify({ otherUserId }),
  });
};

export const getUnreadChatCountApi = async () => {
  return fetchClient<{ count: number }>(API_ROUTES.GETALLUNREADCOUNTS, {
    method: "GET",
    requireAuth: true,
  });
};

export const createGroupChatApi = async (
  groupName: string,
  memberIds: string[],
  groupImage?: File | null
) => {
  const formData = new FormData();
  formData.append("groupName", groupName);
  formData.append("memberIds", JSON.stringify(memberIds));
  
  if (groupImage) {
    formData.append("groupImage", groupImage);
  }

  return fetchClient<ConversationType>(API_ROUTES.CREATE_GROUP_CHAT, {
    method: "POST",
    requireAuth: true,
    body: formData,
    isFormData: true
  });
};

export const addGroupMemberApi = async (
  groupId: string,
  newMemberIds: string | string[]
) => {
  return fetchClient<ConversationType>(
    API_ROUTES.ADD_GROUP_MEMBER(groupId),
    {
      method: "POST",
      requireAuth: true,
      body: JSON.stringify({ userId: newMemberIds }),
    }
  );
};

export const removeGroupMemberApi = async (
  groupId: string,
  userId: string
) => {
  return fetchClient<ConversationType>(
    API_ROUTES.REMOVE_GROUP_MEMBER(groupId, userId),
    {
      method: "DELETE",
      requireAuth: true,
    }
  );
};

export const leaveGroupApi = async (groupId: string) => {
  return fetchClient<{ message: string }>(
    API_ROUTES.LEAVE_GROUP(groupId),
    {
      method: "DELETE",
      requireAuth: true,
    }
  );
};

export const updateGroupInfoApi = async (
  groupId: string,
  groupName?: string
) => {
  return fetchClient<ConversationType>(
    API_ROUTES.UPDATE_GROUP_INFO(groupId),
    {
      method: "PUT",
      requireAuth: true,
      body: JSON.stringify({ groupName }),
    }
  );
};

export const updateGroupImageApi = async (
  groupId: string,
  file: File
) => {
  const formData = new FormData();
  formData.append("groupImage", file);

  return fetchClient<ConversationType>(
    API_ROUTES.UPDATE_GROUP_IMAGE(groupId),
    {
      method: "PUT",
      requireAuth: true,
      body: formData,
      isFormData: true,
    }
  );
};

export const uploadFileApi = async (file: File): Promise<any> => {
  const formData = new FormData();
  formData.append("file", file);

  return fetchClient<ConversationType>(
    API_ROUTES.UPLOADFILE,
    {
      method: "POST",
      requireAuth: true,
      body: formData,
      isFormData: true,
    }
  );
};

export const deleteGroupApi = async (groupId : string) => {
  return fetchClient<{success : boolean}>(
    API_ROUTES.DELETEGROUP(groupId),
    {
      method: "DELETE",
      requireAuth: true,
    }
  );
}

export const deleteMessageApi = async(messageId: string) => {
  return fetchClient<{}>(
    API_ROUTES.DELETEMESSAGEFORME(messageId),
    {
      method: "DELETE",
      requireAuth: true,
    }
  )
}