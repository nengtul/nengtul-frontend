import { Link } from "react-router-dom";
import styled from "styled-components";
import { Post } from "./RecipeListPage";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from "@fortawesome/free-solid-svg-icons";
import { faEye } from "@fortawesome/free-regular-svg-icons";

interface RecipeListCardProps {
  post: Post;
}

export default function RecipeListCard({ post }: RecipeListCardProps) {
  return (
    <>
      <CardLi>
        <Link to={`/${post.recipeId}`}>
          <img src={post.thumbnailUrl} alt={post.title} />
          <ThumbInfo>
            <p>{post.title}</p>
          </ThumbInfo>
        </Link>
        <div className="view">
          <p>
            <FontAwesomeIcon icon={faHeart} /> {post.likeCount}
          </p>
          <p>
            <FontAwesomeIcon icon={faEye} /> {post.viewCount}
          </p>
        </div>
      </CardLi>
    </>
  );
}

const CardLi = styled.li`
  width: 100%;
  border-bottom: 1px solid #fff;
  margin-top: 30px;
  overflow: hidden;
  position: relative;
  border-radius: 12px;
  box-shadow: 0px 1px 6px 0px rgba(0, 0, 0, 0.32);
  a {
    width: 100%;
    height: 343px;
    display: block;
  }
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
  .view {
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
      &:nth-of-type(1) {
        margin-right: 16px;
        svg {
          color: #d01818;
        }
      }
    }
    svg {
      color: #c1ffa9;
    }
  }
`;

const ThumbInfo = styled.div`
  width: 100%;
  position: absolute;
  bottom: 0;
  background-color: #000000a8;
  padding: 20px 10px;
  p {
    font-size: 20rem;
    color: #fff;
    font-weight: 800;
    line-height: 1.3;
  }
`;
