import { styled } from "styled-components";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClock, faCommentDots } from "@fortawesome/free-regular-svg-icons";
import { faPeopleGroup } from "@fortawesome/free-solid-svg-icons";
import LevelBadge from "../../common/LevelBadge";
import theme from "../../common/theme";

export default function RecipeViewInfo() {
  return (
    <ViewWrap>
      <WriteInfo>
        <h2>비빔국수의 핵심은 양념장!</h2>
        <div className="info-wrap">
          <div className="info">
            <div className="thumb"></div>
            <div className="writer">
              <LevelBadge>견습 요리사</LevelBadge>
              <p>박진완 님</p>
              <span>
                <FontAwesomeIcon icon={faClock} style={{ fontSize: "12px" }} />
                20분 미만
              </span>
              <span>
                <FontAwesomeIcon
                  icon={faPeopleGroup}
                  style={{ fontSize: "12px" }}
                />
                2인분
              </span>
            </div>
          </div>
          <Link to={"/chat"}>
            <FontAwesomeIcon
              icon={faCommentDots}
              style={{ fontSize: "20rem" }}
            />
          </Link>
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
    background-color: #333;
  }
  a {
    width: 52px;
    height: 52px;
    border-radius: 10px;
    background-color: ${theme.colors.main};
    display: inline-flex;
    align-items: center;
    justify-content: center;
    color: #fff;
  }
`;
