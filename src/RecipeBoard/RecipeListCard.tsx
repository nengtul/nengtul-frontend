import { Link } from "react-router-dom";
import styled from "styled-components";
import { Post } from "./RecipeListPage";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from "@fortawesome/free-regular-svg-icons";

interface RecipeListCardProps {
  post: Post;
}

export default function RecipeListCard({ post }: RecipeListCardProps) {
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
  };

  return (
    <>
      <CardLi>
        <Link to={`/${post.recipeId}`}>
          <img src={post.thumbnailUrl} alt={post.title} />
          <ThumbInfo>
            <p>{post.title}</p>
          </ThumbInfo>
          <HeartBtn>
            <button onClick={handleClick}>
              <FontAwesomeIcon icon={faHeart} />
            </button>
          </HeartBtn>
        </Link>
      </CardLi>
    </>
  );
}

const CardLi = styled.li`
  width: 100%;
  border-bottom: 1px solid #fff;
  height: 343px;
  margin-top: 30px;
  border-radius: 12px;
  box-shadow: 0px 1px 6px 0px rgba(0, 0, 0, 0.32);
  position: relative;
  overflow: hidden;
  a {
    width: 100%;
    height: 100%;
    display: block;
  }
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
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

const HeartBtn = styled.div`
  width: 60px;
  height: 60px;
  border-radius: 50%;
  background-color: #000000a8;
  position: absolute;
  top: 10px;
  right: 5px;
  z-index: 999;
  overflow: hidden;

  button {
    width: 100%;
    height: 100%;
    background: none;
    cursor: pointer;

    svg {
      color: red;
      font-size: 25rem;
    }
  }
`;
