import { styled } from "styled-components";
import theme from "../../common/theme";
import { RECIPE_COMMENT_LIST_URL } from "../../url";
import { useParams } from "react-router-dom";
import { useState } from "react";
import { simpleUpdateData } from "../../axios";
import { useSelector } from "react-redux";
import { RootState } from "../../Store/store";
import OkModal from "../../Modal/OkModal";

type CommentsInputFunction = () => void;

interface CommentInputProps {
  commentsInput: CommentsInputFunction;
}
export default function CommentInput({ commentsInput }: CommentInputProps) {
  const { recipeId } = useParams();
  const [comment, setComment] = useState("");
  const [okModalText, setOkModalText] = useState("");
  const [okModalOpen, setokModalOpen] = useState(false);
  const url = `${RECIPE_COMMENT_LIST_URL}/${recipeId}/comments`;

  const Token = useSelector((state: RootState) => state.accessTokenValue);
  const { accessTokenValue } = Token;
  const MY_TOKEN = accessTokenValue;

  const handleSubmit = () => {
    const data = {
      comment: comment,
    };
    if (MY_TOKEN !== null) {
      simpleUpdateData(url, data, MY_TOKEN)
        .then((data) => {
          console.log(data);
          setComment("");
          commentsInput();
        })
        .catch((err) => {
          console.error(err);
        });
    } else {
      setOkModalText("로그인이 필요한 서비스입니다.");
      setokModalOpen(true);
      setComment("");
    }
  };

  return (
    <Commet>
      {okModalOpen && (
        <OkModal setokModalOpen={setokModalOpen} title={"레시피"} okModalText={okModalText} />
      )}
      <form>
        <textarea
          name="comment"
          id="comment"
          placeholder="댓글을 입력해주세요."
          value={comment}
          onChange={(e) => {
            setComment(e.target.value);
          }}
        ></textarea>
        <button type="button" onClick={handleSubmit}>
          작성하기
        </button>
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
