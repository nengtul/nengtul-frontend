import { styled } from "styled-components";

interface Comment {
  commentId: number;
  createdAt: string;
  modifiedAt: string;
  replyComment: string;
  replyCommentId: number;
  userId: number;
  userNickname: string;
}

interface CommentListProps {
  item: Comment;
}

export default function DownCommentList({ item }: CommentListProps) {
  const date = item.createdAt.split("T")[0];
  return (
    <>
      <List>
        <div>
          <p>
            {item.userNickname} / {date}
          </p>
        </div>
        <p>{item.replyComment}</p>
      </List>
    </>
  );
}

const List = styled.li`
  width: 100%;
  padding: 10px 20px;
  background-color: #efefef;
  border-bottom: 1px solid #c2c2c2;
  &:nth-of-type(1) {
    border-top: 1px solid #c2c2c2;
  }
  div > p {
    font-size: 12rem;
    margin-bottom: 10px;
  }
  p {
    font-size: 14rem;
  }
`;
