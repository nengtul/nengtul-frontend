import styled from "styled-components";
import theme from "../common/theme";
import TrandingLocation from "./TrandingLocation";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { useSelector } from "react-redux";
import { RootState } from "../Store/store";
import { useState, useRef } from "react";
import { SHAREBOARD_URL } from "../url";
import { updateData } from "../axios";
import WriteModal from "../Modal/WriteSuccess";

export default function WriteForm() {
  //토큰가져오기
  const Token = useSelector((state: RootState) => state.accessTokenValue);
  const { accessTokenValue } = Token;
  const MY_TOKEN = accessTokenValue;

  const LatLng = useSelector((state: RootState) => state.latlngInfo);
  const { moveLatitude, moveLongitude } = LatLng;
  //거래위치 props로 받아옴
  const [locationInfo, setLocationInfo] = useState<string>("");
  const handleLocationChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLocationInfo(e.target.value);
  };

  //체크하면 나눔으로 간주하고 자동으로 0원
  const [isFree, setIsFree] = useState(false);
  const handleIsFreeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setIsFree(e.target.checked);
  };

  //이미지
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [tradeImage, setTradeImage] = useState<Blob | null>(null);

  const [writeModal, setWriteModal] = useState(false);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    console.log("file", file);
    if (file) {
      setTradeImage(file);
      console.log("file", file);
    } else {
      // setTradeImage("");
      setTradeImage(null);
    }
  };
  const imageURL = tradeImage ? URL.createObjectURL(tradeImage) : null;

  //이미지+shareBoardDto 같이 보내기
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const title = formData.get("title") as string;
    const content = formData.get("content") as string;
    const price = isFree ? 0 : Number(formData.get("price") as string);
    const latitude = moveLatitude;
    const longitude = moveLongitude;
    const place = locationInfo;
    try {
      const shareBoardDto = {
        title: title,
        content: content,
        place: place,
        price: price,
        lat: latitude,
        lon: longitude,
      };

      if (tradeImage instanceof Blob) {
        formData.append("image", tradeImage);
      }

      const blob = new Blob([JSON.stringify(shareBoardDto)], {
        type: "application/json",
      });
      formData.append("shareBoardDto", blob);

      if (MY_TOKEN !== null) {
        updateData(SHAREBOARD_URL, formData, MY_TOKEN)
          .then((data) => {
            console.log(data);
            setWriteModal(true);
          })
          .catch((error) => {
            console.log(error);
          });
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <WriteWrap>
      {writeModal && (
        <WriteModal
          title={"성공"}
          setWriteModal={setWriteModal}
          navi={"/ingredientMap"}
        ></WriteModal>
      )}
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
          <input type="checkbox" id="chk-box" checked={isFree} onChange={handleIsFreeChange} />
          <label htmlFor="chk-box"></label>
          <span>무료 나눔이라면 체크해주세요!</span>
        </div>
        <input type="text" name="price" placeholder="가격을 입력해주세요." />
        <div className="input-file">
          <label htmlFor="img-file">
            <FontAwesomeIcon icon={faPlus} />
          </label>
          <input
            type="file"
            id="img-file"
            accept="image/*"
            ref={fileInputRef}
            onChange={handleImageChange}
          />
          {tradeImage instanceof Blob ? <img src={imageURL || ""} alt="recipe-img" /> : <></>}
          {tradeImage ? <></> : <span>* 이미지를 업로드해 주세요.</span>}
        </div>

        <TrandingLocation location={locationInfo} onLocationChange={handleLocationChange} />
        <SubmitBtn type="submit">작성하기</SubmitBtn>
      </form>
    </WriteWrap>
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
    display: flex;
    align-items: center;
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
    span {
      font-size: 13rem;
      color: #817f7f;
      margin-left: 4px;
    }
    img {
      width: 70rem;
      height: 70rem;
      margin-left: 5rem;
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
