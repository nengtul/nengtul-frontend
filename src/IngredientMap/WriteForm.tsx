import styled from "styled-components";
import theme from "../common/theme";
import TrandingLocation from "./TrandingLocation";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import RecipeWriteSubmit from "../RecipeBoard/RecipeWriteSubmit";
export default function WriteForm() {
  return (
    <>
      <WriteWrap>
        <form>
          <div>
            <h4>제목</h4>
            <input type="text" placeholder="제목을 입력해주세요." />
          </div>
          <div style={{ marginTop: "20px" }}>
            <h4>내용</h4>
            <textarea placeholder="내용을 입력해주세요."></textarea>
          </div>
          <div className="price-chk">
            <input type="checkbox" id="chk-box" />
            <label htmlFor="chk-box"></label>
            <span>무료 나눔이라면 체크해주세요!</span>
          </div>
          <input type="text" placeholder="가격을 입력해주세요." />
          <div className="input-file">
            <label htmlFor="img-file">
              <FontAwesomeIcon icon={faPlus} />
            </label>
            <input type="file" id="img-file" accept="image/*" />
          </div>

          <TrandingLocation />
          <RecipeWriteSubmit />
        </form>
      </WriteWrap>
    </>
  );
}

const WriteWrap = styled.div`
  width: 92%;
  margin: 0 auto;
  padding: 20px 0px 20px;

  h4 {
    font-size: 16rem;
    font-weight: 800;
    color: ${theme.colors.main};
  }

  input[type="text"] {
    width: 100%;
    padding: 10px;
    margin-top: 4px;
    border: 1px solid #b0b0b0;
    border-radius: 5px;

    &:focus {
      outline: none;
      border: 1px solid #00ff75;
    }
  }

  textarea {
    width: 100%;
    min-height: 120px;
    padding: 8px;
    border-radius: 5px;
    border: 1px solid #b0b0b0;
    margin-top: 4px;

    &:focus {
      outline: none;
      border: 1px solid #00ff75;
    }
  }

  .price-chk {
    display: flex;
    margin: 20px 0px 4px;
    span {
      font-size: 14rem;
      color: #b0b0b0;
      padding-left: 4px;
    }
    label {
      width: 16px;
      height: 16px;
      border-radius: 2px;
      display: inline-block;
      border: 1px solid ${theme.colors.main};
    }
    input:checked + label {
      background-color: ${theme.colors.main};
    }
    #chk-box {
      display: none;
    }
  }
  .input-file {
    margin-top: 20px;
    label {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      width: 70px;
      border: 2px solid ${theme.colors.main};
      height: 70px;
      border-radius: 5px;
      cursor: pointer;
      color: ${theme.colors.main};
      font-size: 30rem;
    }
    input[type="file"] {
      display: none;
    }
  }
`;
