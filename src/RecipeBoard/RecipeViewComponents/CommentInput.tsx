import { styled } from "styled-components";
import theme from "../../common/theme";

export default function CommentInput() {
  return (
    <Commet>
      <form>
        <textarea
          name="comment"
          id="comment"
          placeholder="댓글을 입력해주세요."
        ></textarea>
        <button type="submit">작성하기</button>
      </form>
    </Commet>
  );
}

const Commet = styled.div`
  width: 100%;
  padding: 20px 0px;

  form {
    width: 92%;
    margin: 0 auto;
  }
  textarea {
    width: 100%;
    height: 110px;
    border: 2px solid ${theme.colors.main};
    padding: 4px;
    &:focus {
      outline: none;
      border: 2px solid #00ff75;
    }
  }
  button {
    width: 100%;
    background-color: ${theme.colors.main};
    margin-top: 15px;
    padding: 12px 0px;
    font-size: 16rem;
    color: #fff;
    font-weight: 800;
    cursor: pointer;
    border-radius: 5px;
  }
`;
