import React from "react";
import { useNavigate } from "react-router-dom";
import * as S from "../styles/postcreate.styles";
import { PostForm } from "../components/post/PostForm";
import { usePostSubmit } from "../hooks/usePostSubmit";

const PostCreatePage: React.FC = () => {
  const navigate = useNavigate();
  const { handleSubmit, loading } = usePostSubmit({
    mode: "create",
    onSuccess: () => {
      navigate("/home");
    },
    onClose: () => {
      navigate("/home");
    },
  });

  const handleClose = () => {
    navigate("/home");
  };

  return (
    <S.PageWrapper>
        <PostForm
          onSubmit={handleSubmit}
          loading={loading}
          isEdit={false}
          onClose={handleClose}
        />
    </S.PageWrapper>
  );
};

export default PostCreatePage;