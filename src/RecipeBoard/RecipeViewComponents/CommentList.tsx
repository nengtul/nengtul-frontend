import { styled } from "styled-components";
import LevelBadge from "../../common/LevelBadge";
import theme from "../../common/theme";
import { useState } from "react";
import DownCommentList from "./DownCommentList";
import { REPLY_COMMENT_URL } from "../../url";
import { simpleUpdateData } from "../../axios";
import { useSelector } from "react-redux";
import { RootState } from "../../Store/store";
import defaultThumb from "../../assets/common/defaultThumb.svg";

interface Comment {
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

type CommentsInputFunction = () => void;

interface CommentListProps {
  item: Comment;
  commentsInput: CommentsInputFunction;
}

export default function CommentList({ item, commentsInput }: CommentListProps) {
  const [replayComment, setreplayComment] = useState("");
  const [comment, setComment] = useState(false);

  const url = `${REPLY_COMMENT_URL}/${item.commentId}`;
  const Token = useSelector((state: RootState) => state.accessTokenValue);
  const { accessTokenValue } = Token;
  const MY_TOKEN = accessTokenValue;

  const handleSubmit = () => {
    const data = {
      replyComment: replayComment,
    };
    if (MY_TOKEN !== null) {
      simpleUpdateData(url, data, MY_TOKEN)
        .then((data) => {
          console.log(data);
          commentsInput();
          setreplayComment("");
        })
        .catch((err) => {
          console.error(err);
        });
    }
  };

  const date = item.createdAt.split("T")[0];

  return (
    <CommentLi>
      <div className="info">
        <div
          className="thumb"
          style={{ backgroundImage: `url(${item.profileImageUrl || defaultThumb})` }}
        ></div>
        <div>
          <LevelBadge>{item.point}</LevelBadge>
          <p className="writer">{item.userNickname} 님</p>
        </div>
      </div>
      <div className="comment">
        <p>{item.comment}</p>
        <span>{date}</span>
      </div>

      <div className="comment-tab">
        <button
          type="button"
          onClick={() => {
            setComment(!comment);
          }}
        >
          댓글 {item.replyCommentGetDtoList.length}
        </button>
      </div>
      {comment && (
        <>
          <ul style={{ marginTop: "10px" }}>
            {item.replyCommentGetDtoList.length > 0 &&
              item.replyCommentGetDtoList.map((item) => <DownCommentList item={item} />)}
          </ul>
          <DownComment>
            <form>
              <textarea
                placeholder="댓글을 입력해주세요."
                value={replayComment}
                onChange={(e) => {
                  setreplayComment(e.target.value);
                }}
              ></textarea>
              <button type="button" onClick={handleSubmit}>
                작성하기
              </button>
            </form>
          </DownComment>
        </>
      )}
    </CommentLi>
  );
}

const CommentLi = styled.li`
  width: 100%;
  padding: 14px 0px;
  border-bottom: 1px solid #ddd;
  & > div.info {
    width: 92%;
    margin: 0 auto;
    display: flex;
    align-items: center;
  }
  .thumb {
    width: 50px;
    height: 50px;
    border-radius: 50%;
    background-color: #333;
    background-size: cover;
    background-position: center;
  }
  .writer {
    font-size: 16rem;
    color: #636363;
    margin-left: 8px;
    margin-top: 4px;
  }
  span {
    font-size: 12rem;
    color: #6e6868;
    margin-top: 20px;
    display: block;
  }
  .comment {
    width: 92%;
    margin: 0 auto;
    padding: 15px 0px;
    p {
      font-size: 14rem;
      word-break: keep-all;
      line-height: 1.3;
    }
  }
  .comment-tab {
    width: 92%;
    margin: 0 auto;
  }
  .comment-tab button {
    cursor: pointer;
    background-color: #646d68;
    color: #f6f6f6;
    padding: 4px 8px;
    border-radius: 5px;
  }
`;

const DownComment = styled.div`
  width: 92%;
  margin: 0 auto;
  margin-top: 10px;
  textarea {
    width: 100%;
    height: 60px;
    padding: 4px;
    border: 1px solid #ccc;
    &:focus {
      outline: none;
      border: 1px solid #00ff75;
    }
  }
  button {
    cursor: pointer;
    background-color: ${theme.colors.main};
    color: #f6f6f6;
    padding: 4px 8px;
    margin-top: 10px;
    border-radius: 5px;
  }
`;
