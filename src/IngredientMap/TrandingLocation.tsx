import { faLocationDot } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { styled } from "styled-components";
import theme from "../common/theme";
import { Link } from "react-router-dom";

interface TrandingLocationProps {
  location: string;
  onLocationChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export default function TrandingLocation({ location, onLocationChange }: TrandingLocationProps) {
  
  return (
    <LocationWrap>
      <h4>
        <FontAwesomeIcon icon={faLocationDot} /> 거래 위치
      </h4>
        <input type="text" placeholder="정확한 거래위치를 알려주세요" value={location} onChange={onLocationChange} />
      <Link to="/tradePlace">
        <button type="button">위치 수정</button>
      </Link>
    </LocationWrap>
  );
}

const LocationWrap = styled.div`
  margin-top: 20px;

  input {
    width: 100%;
    padding: 10px;
    margin-top: 4px;
    border: 1px solid #b0b0b0;
    border-radius: 5px;
    margin-top: 8px;  
    font-size: 14rem;
  }
  button {
    background-color: ${theme.colors.main};
    color: #fff;
    border-radius: 5px;
    padding: 6px 14px;
    font-size: 14rem;
    font-weight: 800;
    margin-top: 10px;
    cursor: pointer;
  }
`;
