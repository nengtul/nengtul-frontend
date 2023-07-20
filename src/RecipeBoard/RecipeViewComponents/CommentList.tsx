import { styled } from "styled-components";
import LevelBadge from "../../common/LevelBadge";
import theme from "../../common/theme";
import { useState } from "react";

export default function CommentList() {
  const [comment, setComment] = useState(false);

  return (
    <CommentLi>
      <div className="info">
        <div className="thumb"></div>
        <div>
          <LevelBadge>견습 요리사</LevelBadge>
          <p className="writer">박진완 님</p>
        </div>
      </div>
      <div className="comment">
        <p>
          너무 좋은 레시피 감사합니다~!!! 재료도 딱 맞고 이걸로 오늘 저녁은
          해결이네요~^_^
        </p>
      </div>
      <div className="comment-tab">
        <button
          type="button"
          onClick={() => {
            setComment(!comment);
          }}
        >
          댓글달기
        </button>
      </div>
      {comment && (
        <DownComment>
          <form>
            <textarea placeholder="댓글을 입력해주세요."></textarea>
            <button type="submit">작성하기</button>
          </form>
        </DownComment>
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
  }
  .writer {
    font-size: 16rem;
    color: #636363;
    margin-left: 8px;
    margin-top: 4px;
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
    background-color: ${theme.colors.main};
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
