import { styled } from "styled-components";
import { Post } from "./MarkerMap";
import LevelBadge from "../common/LevelBadge";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCommentDots } from "@fortawesome/free-regular-svg-icons";
import theme from "../common/theme";

interface MarkerCardProps {
  selectedMarker: Post;
  setSelectedMarker: React.Dispatch<React.SetStateAction<Post | null>>;
}

export default function MarkerCard({ selectedMarker, setSelectedMarker }: MarkerCardProps) {
  return (
    <>
      <Card>
        <div className="toggleCard">
          <button type="button" onClick={() => setSelectedMarker(null)}>
            카드 접기
          </button>
        </div>
        <div className="wrap">
          <div className="info">
            <div className="thumb"></div>
            <div>
              <LevelBadge>견습 요리사</LevelBadge>
              <p>{selectedMarker.writer} 님</p>
            </div>
          </div>
          <div className="item-box">
            <div className="item-img">
              <img src={selectedMarker.thumb} alt={selectedMarker.title} />
            </div>
            <div className="item-info">
              <h4>{selectedMarker.title}</h4>
              <p className="price">
                <span>{selectedMarker.price}</span> 원
              </p>
              <button type="button">
                <FontAwesomeIcon icon={faCommentDots} /> 메세지 보내기
              </button>
            </div>
          </div>
          {/* <img src={selectedMarker.thumb} alt={selectedMarker.title} />
        <h2>{selectedMarker.title}</h2>
        <p>Price: {selectedMarker.price}</p>
        <p>Writer: {selectedMarker.writer}</p> */}
        </div>
      </Card>
    </>
  );
}

const Card = styled.div`
  width: 100%;
  padding: 20px 0px;
  z-index: 999;
  position: relative;
  background-color: #fff;
  border-top: 2px solid ${theme.colors.main};
  border-radius: 15px 15px 0px 0px;
  margin-top: -10px;
  .wrap {
    width: 92%;
    margin: 0 auto;
  }
  .info {
    display: flex;
    align-items: center;
    p {
      font-size: 16rem;
      color: #636363;
      margin: 6px 0px 0px 6px;
    }
    .thumb {
      width: 50px;
      height: 50px;
      border-radius: 50%;
      background-color: #333;
    }
  }
  .item-box {
    margin-top: 20px;
    display: flex;
    align-items: center;
    .item-img {
      width: 140px;
      height: 140px;
      border-radius: 6px;
      overflow: hidden;
      img {
        width: 100%;
        object-fit: cover;
      }
    }
    .item-info {
      width: calc(100% - 140px);
      padding: 0px 10px;
      h4 {
        font-size: 18rem;
        line-height: 1.2;
        word-break: keep-all;
        font-weight: 800;
      }
      .price {
        margin-top: 8px;
        span {
          font-size: 24rem;
          color: ${theme.colors.main};
        }
        font-weight: 800;
        font-size: 16rem;
      }
      button {
        width: 100%;
        padding: 10px 0px;
        background-color: ${theme.colors.main};
        border-radius: 10px;
        color: #fff;
        font-weight: 800;
        font-size: 16rem;
        margin-top: 10px;
        cursor: pointer;
      }
    }
  }
  .toggleCard {
    position: absolute;
    top: 20px;
    right: 15px;
    button {
      cursor: pointer;
      background-color: ${theme.colors.main};
      color: #fff;
      font-size: 15rem;
      padding: 4px 8px;
      border-radius: 4px;
    }
  }
`;
