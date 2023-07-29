import { styled } from "styled-components";
import theme from "./theme";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faExclamation } from "@fortawesome/free-solid-svg-icons";
import { AxiosError } from "axios";

interface ModalProps {
  error: AxiosError | null;
  title: string;
  onClose: () => void;
}

export default function Modal({ error, onClose, title }: ModalProps) {
  let errorMessage = "알 수 없는 오류가 발생했습니다.";
  console.log(error);
  if (error) {
    if (error?.response?.status === 404) {
      errorMessage = "일치하는 회원 정보가 없습니다.";
    }
  }

  return (
    <ModalWrap>
      <div className="modal-component">
        <div className="title">
          <p>{title} 오류</p>
        </div>
        <div className="err-code">
          <FontAwesomeIcon icon={faExclamation} />
          <p>{errorMessage}</p>
          <button type="button" onClick={onClose}>
            확인
          </button>
        </div>
      </div>
    </ModalWrap>
  );
}

const ModalWrap = styled.div`
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  background-color: rgba(0, 0, 0, 0.6);
  z-index: 99999;
  display: flex;
  align-items: center;
  justify-content: center;

  .modal-component {
    background-color: #fff;
    width: 280px;
    border-radius: 8px;
    border: 2px solid ${theme.colors.main};
    .title {
      width: 100%;
      background-color: ${theme.colors.main};
      padding: 10px;
      p {
        color: #fff;
        font-size: 16rem;
        font-weight: 700;
        text-align: center;
      }
    }
    .err-code {
      padding: 20px;
      display: flex;
      flex-direction: column;
      align-items: centerr;
      svg {
        font-size: 30rem;
        color: #8f8f8f;
      }
      p {
        font-size: 14rem;
        text-align: center;
        font-weight: 700;
        margin-top: 10px;
      }
      button {
        width: 100%;
        padding: 4px 0px;
        background-color: ${theme.colors.main};
        color: #fff;
        font-size: 16rem;
        font-weight: 700;
        margin-top: 20px;
        cursor: pointer;
      }
    }
  }
`;
