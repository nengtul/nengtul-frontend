import { styled } from "styled-components";

interface RecipeWriteSubmitProps {
  handleSubmit: () => void;
}

export default function RecipeWriteSubmit({ handleSubmit }: RecipeWriteSubmitProps) {
  return (
    <>
      <SubmitBtn type="button" onClick={handleSubmit}>
        작성하기
      </SubmitBtn>
    </>
  );
}

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
