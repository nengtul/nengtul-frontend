import { styled } from "styled-components";
import theme from "../../common/theme";
import CommentList from "./CommentList";

export default function RecipeComment() {
  return (
    <CommentWrap>
      <div className="commentCount">
        <h3>
          댓글 <span>2</span>
        </h3>
      </div>
      <ul>
        <CommentList></CommentList>
        <CommentList></CommentList>
      </ul>
    </CommentWrap>
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
