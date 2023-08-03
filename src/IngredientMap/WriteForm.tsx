import styled from "styled-components";
import theme from "../common/theme";
import TrandingLocation from "./TrandingLocation";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import axios  from "axios";
import { Provider,useSelector } from "react-redux";
import tradeStore from "../Redux/tradeStore";
import { RootState } from "../Redux/tradeStore";
export default function WriteForm() {
  const LatLng=useSelector((state: RootState)=>state.latlngInfo)
  console.log('뭐뜨냐',LatLng)

  const handleSubmit=(e:React.FormEvent<HTMLFormElement>): void=>{
    e.preventDefault();
    console.log('클릭됨')
    const formData = new FormData(e.currentTarget);
    const title=formData.get('title') as string;
    const content=formData.get('content') as string;
    const price=formData.get('price') as string;
  }
  return (
    <Provider store={tradeStore}>
      <WriteWrap>
        <form onSubmit={handleSubmit}>
          <div>
            <h4>제목</h4>
            <input type="text" name="title" placeholder="제목을 입력해주세요." />
          </div>
          <div style={{ marginTop: "20px" }}>
            <h4>내용</h4>
            <textarea name="content" placeholder="내용을 입력해주세요."></textarea>
          </div>
          <div className="price-chk">
            <input type="checkbox" id="chk-box" />
            <label htmlFor="chk-box"></label>
            <span>무료 나눔이라면 체크해주세요!</span>
          </div>
          <input type="text" name="price" placeholder="가격을 입력해주세요." />
          <div className="input-file">
            <label htmlFor="img-file">
              <FontAwesomeIcon icon={faPlus} />
            </label>
            <input type="file" id="img-file" accept="image/*" />
          </div>

          <TrandingLocation />
          <SubmitBtn type="submit" >
              작성하기
          </SubmitBtn>
        </form>
      </WriteWrap>
    </Provider>
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

const SubmitBtn = styled.button`
  width: 100%;
  background-color: #38db83;
  font-size: 20rem;
  font-weight: bold;
  color: #fff;
  padding: 13px 0px;
  margin-top: 40px;
  border-radius: 5px;
  cursor: pointer;
  text-align: center;
`;
