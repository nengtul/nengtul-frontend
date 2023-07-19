import { styled } from "styled-components";
import theme from "../common/theme";

interface NumProps {
  step: number;
}

export default function RecipeNumberInput({ step }: NumProps) {
  return (
    <>
      <NumberInput>
        <p>Step.{step}</p>
        <textarea placeholder="내용을 입력해주세요."></textarea>
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
`;
