import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import * as S from "../styles/postcreate.styles";
import { PostForm } from "../components/post/PostForm";
import { usePostSubmit } from "../hooks/usePostSubmit";
import { useDispatch, useSelector } from "react-redux";
import { fetchSinglePost } from "../store/slices/postSlice";
import type { AppDispatch, RootState } from "../store/stores";
import Loader from "../components/common/Loader";

interface ExistingMedia {
  _id?: string;
  url: string;
  type: "image" | "video";
}

const PostEditPage: React.FC = () => {
  const { postId } = useParams<{ postId: string }>();
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const { singlePost, loading: postLoading } = useSelector(
    (state: RootState) => state.posts
  );
  const [removedMediaIds, setRemovedMediaIds] = useState<string[]>([]);
  const [currentExistingMedia, setCurrentExistingMedia] = useState<ExistingMedia[]>([]);

  const { handleSubmit: baseHandleSubmit, loading } = usePostSubmit({
    mode: "edit",
    post: singlePost || undefined,
    onSuccess: () => {
      navigate(`/post/${postId}`);
    },
    onClose: () => {
      navigate(`/post/${postId}`);
    },
  });

  useEffect(() => {
    if (postId) {
      dispatch(fetchSinglePost(postId));
    }
  }, [dispatch, postId]);

  useEffect(() => {
    if (singlePost?.media) {
      setCurrentExistingMedia(singlePost.media as ExistingMedia[]);
    }
  }, [singlePost]);

  const handleClose = () => {
    navigate(`/post/${postId}`);
  };

  const handleSubmit = async (
    title: string,
    content: string,
    mediaFiles?: File[]
  ) => {
    try {
      await baseHandleSubmit(
        title,
        content,
        mediaFiles,
        removedMediaIds,
        currentExistingMedia
      );
    } catch (error) {
      console.error("Error submitting post:", error);
      throw error;
    }
  };

  if (postLoading) {
    return (
      <S.PageWrapper>
        <Loader />
      </S.PageWrapper>
    );
  }

  if (!singlePost) {
    return (
      <S.PageWrapper>
        <div style={{ textAlign: "center", padding: "2rem" }}>
          <h2>Post not found</h2>
          <button
            onClick={handleClose}
            style={{
              marginTop: "1rem",
              padding: "0.5rem 1rem",
              background: "#8b5cf6",
              color: "white",
              border: "none",
              borderRadius: "0.5rem",
              cursor: "pointer",
            }}
          >
            Go Back
          </button>
        </div>
      </S.PageWrapper>
    );
  }

  return (
    <S.PageWrapper>
      <PostForm
        initialTitle={singlePost.title}
        initialContent={singlePost.content}
        initialImage={singlePost.imageUrl}
        initialMedia={singlePost.media as ExistingMedia[]}
        onSubmit={handleSubmit}
        loading={loading}
        isEdit={true}
        onClose={handleClose}
        onRemovedMedia={setRemovedMediaIds}
        onExistingMediaChange={setCurrentExistingMedia}
      />
    </S.PageWrapper>
  );
};

export default PostEditPage;