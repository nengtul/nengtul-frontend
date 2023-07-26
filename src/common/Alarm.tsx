import { styled } from "styled-components";
import Bell from "../assets/icon/Bell.svg";
import theme from "./theme";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faExclamation } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";

export default function Alarm() {
  const [alarm, setAlarm] = useState(false);

  return (
    <>
      <AlarmStyle>
        <button
          type="button"
          onClick={() => {
            setAlarm(!alarm);
          }}
        >
          <img src={Bell} alt="search-button" />
          <span className="alarm">01</span>
        </button>

        {alarm && (
          <div className="alarm-list">
            <ul>
              <li></li>
              <li></li>
              <li></li>
            </ul>

            <div className="none-alarm">
              <FontAwesomeIcon icon={faExclamation} />
              <p>새로운 소식이 없습니다.</p>
            </div>
          </div>
        )}
      </AlarmStyle>
    </>
  );
}

const AlarmStyle = styled.div`
  position: relative;

  button {
    cursor: pointer;
    background-color: transparent;
    padding: 0;
  }

  span {
    position: absolute;
    bottom: 0;
    left: -10px;
    font-size: 13rem;
    color: #fff;
    background-color: ${theme.colors.main};
    font-weight: 800;
    padding: 2px 4px;
    border-radius: 4px;
  }
  .alarm-list {
    position: absolute;
    top: 160%;
    right: -10px;
    width: 250px;
    padding: 0px;
    background: #ffffff;
    -webkit-border-radius: 10px;
    -moz-border-radius: 10px;
    border-radius: 10px;
    border: #7fff7f solid 3px;
    &::after {
      content: "";
      position: absolute;
      border-style: solid;
      border-width: 0 12px 12px;
      border-color: #ffffff transparent;
      display: block;
      width: 0;
      z-index: 1;
      top: -12px;
      left: 209px;
    }
    &::before {
      content: "";
      position: absolute;
      border-style: solid;
      border-width: 0 14px 14px;
      border-color: #7fff7f transparent;
      display: block;
      width: 0;
      z-index: 0;
      top: -17px;
      left: 207px;
    }

    &::-webkit-scrollbar {
      width: 1px;
    }
    &::-webkit-scrollbar-track {
      background-color: rgba(0, 0, 0, 0);
    }
    &::-webkit-scrollbar-thumb {
      background-color: #b5b5b5;
      border-radius: 10px;
      width: 1px;
    }
  }

  .none-alarm {
    width: 100%;
    min-height: 120px;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    svg {
      font-size: 30rem;
      color: #959595;
    }
    p {
      font-size: 14rem;
      text-align: center;
      margin-top: 10px;
      font-weight: 700;
      color: #959595;
    }
  }
`;
