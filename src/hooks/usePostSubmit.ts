import { useDispatch } from "react-redux";
import type { AppDispatch } from "../store/stores";
import { updatePost, updatePostMedia, createPost } from "../store/slices/postSlice";
import type { Post, CreatePostPayload, UpdatePostMediaPayload } from "../types/post.types";

interface UsePostSubmitProps {
  mode: "create" | "edit";
  post?: Post;
  onSuccess?: () => void;
  onClose?: () => void;
}

interface ExistingMedia {
  _id?: string;
  url: string;
  type: "image" | "video";
}

export const usePostSubmit = ({
  mode,
  post,
  onSuccess,
}: UsePostSubmitProps) => {
  const dispatch = useDispatch<AppDispatch>();

  const handleSubmit = async (
    title: string,
    content: string,
    mediaFiles?: File[],
    removedMediaIds?: string[],
    existingMedia?: ExistingMedia[]
  ) => {
    try {
      if (mode === "create") {
        const payload: CreatePostPayload = {
          title,
          content,
          media: mediaFiles || [],
        };

        const result = await dispatch(createPost(payload)).unwrap();
        onSuccess?.();
        return result;
      } else if (mode === "edit" && post) {
        await dispatch(
          updatePost({
            postId: post.postId,
            title,
            content,
          })
        ).unwrap();

        const originalMediaIds = (post.media || []).map((m: any) => m._id).filter(Boolean);
        const currentMediaIds = (existingMedia || []).map((m) => m._id).filter(Boolean);
        const hasRemovedMedia = originalMediaIds.some((id: string) => !currentMediaIds.includes(id));
        const hasNewMedia = mediaFiles && mediaFiles.length > 0;


        if (hasNewMedia || hasRemovedMedia) {

          const mediaPayload: UpdatePostMediaPayload = {
            postId: post.postId,
            media: mediaFiles || [],
            removeMediaIds: removedMediaIds || [],
          };


          await dispatch(updatePostMedia(mediaPayload)).unwrap();
        } else {
        }

        onSuccess?.();
      }
    } catch (error: any) {
      console.error("Post submission error:", error);
      throw error;
    }
  };

  return {
    handleSubmit,
    loading: false,
  };
};