import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from "@fortawesome/free-solid-svg-icons";
import { faEye } from "@fortawesome/free-regular-svg-icons";
import styled from "styled-components";

interface ViewAndHeartProps {
  viewCount: number;
  heartCount: number;
}

export default function ViewAndHeart({ viewCount, heartCount }: ViewAndHeartProps) {
  return (
    <>
      <View className="view-wrap">
        <p>
          <FontAwesomeIcon icon={faHeart} /> {heartCount}
        </p>
        <p>
          <FontAwesomeIcon icon={faEye} /> {viewCount}
        </p>
      </View>
    </>
  );
}

const View = styled.div`
  position: absolute;
  top: 10px;
  right: 10px;
  padding: 8px 16px;
  display: flex;
  align-items: center;
  background-color: #000000a8;
  font-weight: 700;
  border-radius: 10px;
  p {
    color: #fff;
    font-size: 14rem;
    display: flex;
    align-items: center;
    &:nth-of-type(1) {
      margin-right: 16px;
      svg {
        color: #d01818;
      }
    }
  }
  svg {
    color: #c1ffa9;
    margin-right: 4px;
  }
`;
