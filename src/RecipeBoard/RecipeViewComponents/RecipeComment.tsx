import { styled } from "styled-components";
import theme from "../../common/theme";
import CommentList from "./CommentList";
import { useEffect, useState } from "react";
import { RECIPE_COMMENT_LIST_URL } from "../../url";
import { getData } from "../../axios";
import { useParams } from "react-router-dom";
import CommentInput from "./CommentInput";

export interface Comment {
  recipeId: string;
  commentId: number;
  userId: number;
  userNickname: string;
  comment: string;
  createdAt: string;
  modifiedAt: string;
  replyCommentGetDtoList: [];
  point: number;
  profileImageUrl: string;
}

type FetchCommentsFunction = () => void;

export default function RecipeComment() {
  const { recipeId } = useParams();
  const [comment, setComment] = useState<Comment[]>([]);

  const url = `${RECIPE_COMMENT_LIST_URL}/${recipeId}/commentlist`;

  const commentsInput: FetchCommentsFunction = () => {
    getData<Comment[]>(url)
      .then((response) => {
        setComment(response);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    commentsInput();
  }, []);

  return (
    <>
      <CommentWrap>
        <div className="commentCount">
          <h3>
            댓글 <span>{comment.length}</span>
          </h3>
        </div>
        <ul>
          {comment.length > 0 &&
            comment.map((item) => (
              <CommentList key={item.commentId} item={item} commentsInput={commentsInput} />
            ))}
        </ul>
      </CommentWrap>
      <CommentInput commentsInput={commentsInput} />
    </>
  );
}

const CommentWrap = styled.div`
  width: 100%;
  margin-top: 40px;
  border-top: 1px solid #cccccc;

  .commentCount {
    border-bottom: 1px solid #cccccc;
    padding: 14px 0px;
  }

  h3 {
    font-size: 16px;
    font-weight: 800;
    width: 92%;
    margin: 0 auto;
    span {
      color: ${theme.colors.main};
      font-size: 16rem;
      font-weight: 800;
    }
  }
`;
