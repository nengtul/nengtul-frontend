import { styled } from "styled-components";
import theme from "../../common/theme";
import { useRef, useState } from "react";

interface NumProps {
  step: number;
  setChangeImage: React.Dispatch<React.SetStateAction<string[]>>;
  // handleStepChange: (step: number, value: string, img: string) => void;
  handleTextChange: (step: number, value: string) => void;
  handleImgChange: (step: number, img: File) => void;
  cookingStep: string[];
  stepImg: string[];
}

export default function RecipeNumberInput({
  step,
  handleTextChange,
  handleImgChange,
  cookingStep,
  stepImg,
  setChangeImage,
}: NumProps) {
  const imgRef = useRef<HTMLInputElement>(null);
  const [imgFile, setImgFile] = useState(stepImg[step - 1]);

  const saveImgFile = () => {
    const file = imgRef.current?.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onloadend = () => {
        setImgFile(reader.result as string);
        setChangeImage((prevChangeImage) => {
          const updatedChangeImage = [...prevChangeImage];
          updatedChangeImage[step - 1] = imgFile;
          return updatedChangeImage;
        });
        handleImgChange(step, file);
      };
    }
  };

  const handleChange = (event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
    if (event.target instanceof HTMLTextAreaElement) {
      const textareaValue = event.target.value;
      handleTextChange(step, textareaValue); // 이미지 파일은 빈 문자열로 전달
    } else {
      saveImgFile();
    }
  };

  return (
    <>
      <NumberInput>
        <p>* Step.{step}</p>
        <textarea
          placeholder="내용을 입력해주세요."
          onChange={handleChange}
          value={cookingStep[step - 1]}
          required
        ></textarea>
        <div className="upload-img">
          <input
            id={`ImgSelect-${step}`}
            type="file"
            accept="image/*"
            onChange={handleChange}
            ref={imgRef}
            required
          />
          <label htmlFor={`ImgSelect-${step}`}>+</label>
          {imgFile ? <img src={imgFile} alt="recipe-img" /> : <></>}
          {imgFile ? <></> : <span>* 이미지를 업로드해 주세요.</span>}
        </div>
      </NumberInput>
    </>
  );
}

const NumberInput = styled.div`
  width: 100%;
  margin-top: 25px;

  p {
    font-size: 18rem;
    font-weight: 800;
    color: ${theme.colors.main};
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

  .upload-img {
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
