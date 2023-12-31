import { styled } from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClock, faHeart, faBookmark } from "@fortawesome/free-regular-svg-icons";
import { faHeart as faHeart2, faBookmark as faBookmark2 } from "@fortawesome/free-solid-svg-icons";
import { faPeopleGroup } from "@fortawesome/free-solid-svg-icons";
import LevelBadge from "../../common/LevelBadge";
import defaultThumb from "../../assets/common/defaultThumb.svg";

interface RecipeInfoProps {
  title: string;
  nickName: string;
  serving: string;
  cookingTime: string;
  point: number;
  userProfileUrl: string;
  likes: boolean;
  handleLikes: () => void;
  handleFavorites: () => void;
  favorite: boolean;
}

export default function RecipeViewInfo({
  title,
  nickName,
  serving,
  cookingTime,
  point,
  userProfileUrl,
  likes,
  handleLikes,
  favorite,
  handleFavorites,
}: RecipeInfoProps) {
  return (
    <ViewWrap>
      <WriteInfo>
        <h2>{title}</h2>
        <div className="info-wrap">
          <div className="info">
            <div
              className="thumb"
              style={{ backgroundImage: `url(${userProfileUrl || defaultThumb})` }}
            />
            <div className="writer">
              <LevelBadge>{point}</LevelBadge>
              <p>{nickName || "탈퇴한 사용자입니다."} 님</p>
              <span>
                <FontAwesomeIcon icon={faClock} style={{ fontSize: "12px" }} />
                {cookingTime}
              </span>
              <span>
                <FontAwesomeIcon icon={faPeopleGroup} style={{ fontSize: "12px" }} />
                {serving}
              </span>
            </div>
          </div>
          <div>
            <Like onClick={handleFavorites} title="즐겨찾기">
              {favorite ? (
                <FontAwesomeIcon
                  icon={faBookmark2}
                  style={{ fontSize: "20rem", color: "rgb(159, 154, 231)" }}
                />
              ) : (
                <FontAwesomeIcon
                  icon={faBookmark}
                  style={{ fontSize: "20rem", color: "rgb(159, 154, 231)" }}
                />
              )}
            </Like>
            <Like onClick={handleLikes} title="좋아요">
              {likes ? (
                <FontAwesomeIcon icon={faHeart2} style={{ fontSize: "20rem", color: "red" }} />
              ) : (
                <FontAwesomeIcon icon={faHeart} style={{ fontSize: "20rem", color: "red" }} />
              )}
            </Like>
          </div>
        </div>
      </WriteInfo>
    </ViewWrap>
  );
}

const ViewWrap = styled.div`
  width: 100%;
  border-bottom: 1px solid #cccccc;
`;

const WriteInfo = styled.div`
  width: 92%;
  margin: 0 auto;
  padding: 20px 0px;
  h2 {
    font-size: 20rem;
    font-weight: 800;
  }
  .info-wrap {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-top: 20px;
    .info {
      display: flex;
      p {
        font-size: 16rem;
        margin: 4px 0px 8px 8px;
        font-weight: 700;
        color: #636363;
      }
      span {
        margin-left: 8px;
        font-size: 12rem;
        font-weight: 700;
        color: #b0b0b0;
        svg {
          margin-right: 4px;
        }
      }
    }
  }
  .thumb {
    width: 62px;
    height: 62px;
    border-radius: 50%;
    background-size: cover;
    background-color: #333;
  }
`;

const Like = styled.button`
  width: 52px;
  height: 52px;
  border-radius: 10px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  color: #fff;
  cursor: pointer;
  &:nth-of-type(1) {
    margin-right: 4px;
  }
`;
