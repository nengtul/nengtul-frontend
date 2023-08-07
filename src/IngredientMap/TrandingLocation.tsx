import { faLocationDot } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { styled } from "styled-components";
import theme from "../common/theme";
import {useState} from "react";
import TradePlaceMap from "./TradePlaceMap";

interface TrandingLocationProps {
  location: string;
  onLocationChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export default function TrandingLocation({ location, onLocationChange }: TrandingLocationProps) {
  const [showModal,setShowModal]=useState(false);

  const handleModalOpen=()=>{
    setShowModal(true);
  }
  const handleModalClose=()=>{
    setShowModal(false);
  }
  return (
    <LocationWrap>
      <h4>
        <FontAwesomeIcon icon={faLocationDot} /> 거래 위치
      </h4>
        <input type="text" placeholder="정확한 거래위치를 알려주세요" value={location} onChange={onLocationChange} />
        <button type="button" onClick={handleModalOpen}>위치 수정</button>
        {showModal&&(
          <ModalOverlay>
            <ModalContent>
              <TradePlaceMap onClose={handleModalClose}/>
            </ModalContent>
          </ModalOverlay>
        )}
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
const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.6);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 9999;
`;

const ModalContent = styled.div`
  background-color: #fff;
  padding: 20px;
  border-radius: 10px;
  z-index: 10000;
  width:350rem;
  
`;