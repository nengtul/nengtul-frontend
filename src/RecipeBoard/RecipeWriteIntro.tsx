import { styled } from "styled-components";
import theme from "../common/theme";
import { useRef, useState } from "react";

interface RecipeWriteIntroProps {
  setIntro: React.Dispatch<React.SetStateAction<string>>;
  setThumb: React.Dispatch<React.SetStateAction<File | null>>;
}

export default function RecipeWriteIntro({ setIntro, setThumb }: RecipeWriteIntroProps) {
  const [img, setImg] = useState("");
  const imgRef = useRef<HTMLInputElement>(null);

  return (
    <>
      <RecipeIntroWrap>
        <p>레시피 설명</p>
        <textarea
          placeholder="요리에 대한 설명을 입력해주세요."
          onChange={(e) => setIntro(e.target.value)}
        ></textarea>
        <div className="thumbnail-img">
          <input
            id={`thumbnail`}
            type="file"
            accept="image/*"
            required
            ref={imgRef}
            onChange={(e) => {
              const file = e.target.files?.[0];
              if (file) {
                const reader = new FileReader();
                reader.readAsDataURL(file);
                reader.onloadend = () => {
                  setImg(reader.result as string);
                  setThumb(file);
                };
              }
            }}
          />
          <label htmlFor={`thumbnail`}>+</label>
          {img ? <img src={img} alt="thumb-img" /> : <></>}
          {img ? <></> : <span>* 대표 이미지를 업로드해 주세요.</span>}
        </div>
      </RecipeIntroWrap>
    </>
  );
}

const RecipeIntroWrap = styled.div`
  margin-top: 20px;
  p {
    font-size: 16rem;
    font-weight: 700;
    color: ${theme.colors.main};
    margin-bottom: 4px;
  }
  textarea {
    width: 100%;
    min-height: 120px;
    padding: 8px;
    border-radius: 5px;
    border: 2px solid ${theme.colors.main};
    margin-top: 10px;

    &:focus {
      outline: none;
      border: 2px solid #00ff75;
    }
  }

  .thumbnail-img {
    margin-top: 4px;
    display: flex;
    align-items: center;
    label {
      font-size: 26rem;
      color: ${theme.colors.main};
      font-weight: 800;
      width: 45px;
      height: 45px;
      display: flex;
      align-items: center;
      justify-content: center;
      border: 2px solid ${theme.colors.main};
      border-radius: 5px;
      cursor: pointer;
    }
    img {
      width: 45px;
      height: 45px;
      border-radius: 5px;
      object-fit: cover;
      margin-left: 4px;
    }
    input {
      display: none;
    }
    span {
      font-size: 13rem;
      color: #817f7f;
      margin-left: 4px;
    }
  }
`;
