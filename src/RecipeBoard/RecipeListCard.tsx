import { Link } from "react-router-dom";
import styled from "styled-components";
import { Post } from "./RecipeListPage";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart as regHeart} from "@fortawesome/free-regular-svg-icons";
import { faHeart as solidHeart}   from "@fortawesome/free-solid-svg-icons";
import { useState } from 'react';
import { useSelector } from "react-redux";
import { RootState } from "../Store/store";
import { LIKES_RECIPE_URL } from "../url";
import { AxiosError } from 'axios';
import  {simpleUpdateData} from "../axios";
interface RecipeListCardProps {
  post: Post;
}

export default function RecipeListCard({ post }: RecipeListCardProps) {
  const [isLiked, setIsLiked] = useState(false);
  const Token=useSelector((state: RootState)=>state.accessTokenValue)
  const {accessTokenValue}=Token;
  const MY_TOKEN=accessTokenValue
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    if(!isLiked){
      setIsLiked(true)
      if(MY_TOKEN){
        simpleUpdateData(`${LIKES_RECIPE_URL}/${post.recipeId}`,{},MY_TOKEN)
        .then(response=>{
          console.log('성공')
          console.log(response)
        })
        .catch((error:AxiosError)=>{
          if (error) {
            if (error?.response?.status === 404) {
              console.log("이미 좋아요 누른 레시피 입니다"); //모달창
            }  
          }
        })
      }
    }
    else{
      console.log('이미 좋아요 누른 레시피입니다') //모달창
    }
    event.preventDefault();
  };
  // console.log('post',post)

  return (
    <>
      <CardLi>
        <Link to={`/${post.recipeId}`}>
          <img src={post.thumbnailUrl} alt={post.title} />
          <ThumbInfo>
            <p>{post.title}</p>
          </ThumbInfo>
          <HeartBtn>
            <button onClick={handleClick} >
            <FontAwesomeIcon icon={isLiked ? solidHeart : regHeart} />
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
