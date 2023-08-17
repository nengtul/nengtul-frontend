import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from "@fortawesome/free-solid-svg-icons";
import { useInView } from "react-intersection-observer";
import { useEffect, useState, useRef, useCallback } from "react";
import { getData } from "../axios";
import { Link } from "react-router-dom";
import { RECIPE_INGREDIENT_URL } from "../url";
import { faEye } from "@fortawesome/free-regular-svg-icons";
import { IngredientsProps } from "./IngreAfterRecipePage";
import NoneSearchData from "./NoneSearchData";

interface SearchResultProps {
  likeCount: number;
  nickName: string;
  recipeId: string;
  thumbnailUrl: string;
  title: string;
  viewCount: number;
}
interface RecipeSectionProps {
  content: SearchResultProps[];
}

function RecipeSection({ ingredients }: IngredientsProps) {
  const [posts, setPosts] = useState<SearchResultProps[]>([]);
  const [hasNextPage, setHasNextPage] = useState<boolean>(true);
  const page = useRef<number>(0);
  const [ref, inView] = useInView();

  const url = `${RECIPE_INGREDIENT_URL}/${ingredients}`;

  const fetch = useCallback(async () => {
    try {
      await getData<RecipeSectionProps>(`${url}?size=7&page=${page.current}&sort=viewCount,desc`)
        .then((data) => {
          console.log(data);
          const contentData = data.content;
          setPosts((prevPosts) => [...prevPosts, ...contentData]);
          setHasNextPage(contentData.length === 7);
          if (contentData.length) {
            page.current += 1;
          }
        })
        .catch((err) => {
          console.log(err);
        });
    } catch (err) {
      console.error(err);
    }
  }, []);

  useEffect(() => {
    console.log(inView, hasNextPage);
    const fetchData = () => {
      if (inView && hasNextPage) {
        fetch().catch((error) => {
          console.error(error);
        });
      }
    };
    fetchData();
  }, [fetch, hasNextPage, inView]);

  return (
    <RecipeArea>
      {posts.length > 0 ? (
        posts?.map((post, index) => (
          <Recipe key={index}>
            <Link to={`/${post.recipeId}`}>
              <img src={post.thumbnailUrl} alt="noodle" />
              <TextArea>
                <Title>{post.title}</Title>
                <Heart>
                  <div>
                    <FontAwesomeIcon icon={faHeart} style={{ height: "14rem", color: "#d01818" }} />
                    <HeartRate>{post.likeCount}</HeartRate>
                  </div>
                  <div style={{ marginLeft: "10px" }}>
                    <FontAwesomeIcon icon={faEye} style={{ height: "14rem", color: "#c1ffa9" }} />
                    <HeartRate>{post.viewCount}</HeartRate>
                  </div>
                </Heart>
                <Writer>{post.nickName}</Writer>
              </TextArea>
            </Link>
          </Recipe>
        ))
      ) : (
        <NoneSearchData />
      )}
      <Observer ref={ref}></Observer>
    </RecipeArea>
  );
}
export default RecipeSection;

const RecipeArea = styled.div`
  flex: 1;
  overflow: auto;
  &::-webkit-scrollbar {
    width: 2px;
  }
  &::-webkit-scrollbar-track {
    background-color: rgba(0, 0, 0, 0);
  }
  &::-webkit-scrollbar-thumb {
    background-color: #b5b5b5;
    border-radius: 10px;
    width: 2px;
  }
`;

const Recipe = styled.div`
  padding: 4px;
  cursor: pointer;
  border-bottom: 1px solid #dddddd;
  img {
    width: 120px;
    height: 120px;
    object-fit: cover;
    object-position: center;
  }
  a {
    display: flex;
    align-items: center;
  }
`;
const TextArea = styled.div`
  padding: 12rem 10rem;
`;
const Title = styled.div`
  font-size: 16rem;
  font-weight: 800;
  line-height: 1.3;
  max-height: 2.6;
  overflow: hidden;
  text-overflow: elipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  word-break: keep-all;
  margin-bottom: 4px;
`;
const Heart = styled.div`
  margin-bottom: 12rem;
  display: flex;
  align-items: center;
  div {
    display: flex;
    align-items: center;
  }
`;
const HeartRate = styled.span`
  font-size: 14rem;
  margin-left: 4px;
  font-weight: 700;
`;
const Writer = styled.div`
  font-size: 14rem;
`;

const Observer = styled.div`
  width: 100%;
  height: 3rem;
`;
