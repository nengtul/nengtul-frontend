import { MainPageSection, SectionTitle, TitlePoint } from "./CommonStyle";
import styled from "styled-components";
import SavedRecipeList from "./SavedRecipeList";
import { useState, useEffect, useCallback } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../Store/store";
import { getData } from "../axios";
import { SAVED_RECIPE_URL } from "../url";
import NoRecipe from "../common/NoRecipe";

export interface Post {
  createdAt: string;
  id: number;
  recipeId: string;
  thumbnailUrl: string;
  title: string;
  recipeUserNickname: string;
}
interface ContentData {
  content: Post[];
}

export default function MyRecipe() {
  const Token = useSelector((state: RootState) => state.accessTokenValue);
  const { accessTokenValue } = Token;
  const MY_TOKEN = accessTokenValue;
  const [posts, setPosts] = useState<Post[]>([]);

  const fetch = useCallback(async () => {
    try {
      const url = SAVED_RECIPE_URL;

      if (MY_TOKEN) {
        await getData<ContentData>(`${url}`, MY_TOKEN)
          .then((data) => {
            console.log(data);
            console.log(data.content);
            const contentData = data.content;
            setPosts((prevPosts) => [...prevPosts, ...contentData]);
          })
          .catch((err) => {
            console.log(err);
          });
      }
    } catch (err) {
      console.error(err);
    }
  }, []);
  useEffect(() => {
    const fetchData = () => {
      fetch().catch((error) => {
        console.error(error);
      });
    };
    fetchData();
  }, [fetch]);

  const handleDeletePost = (postId: number) => {
    setPosts((prevPosts) => prevPosts.filter((post) => post.id !== postId));
  };
  return (
    <>
      <MainPageSection>
        <SectionTitle>
          <TitlePoint>회원님의</TitlePoint> 저장 레시피
        </SectionTitle>
        <ListWrap>
          {posts.length > 0 ? (
            posts?.map((post) => (
              <SavedRecipeList key={post.id} post={post} onDeletePost={handleDeletePost} />
            ))
          ) : (
            <NoRecipe title={"저장한"} />
          )}
        </ListWrap>
      </MainPageSection>
    </>
  );
}

const ListWrap = styled.ul`
  width: 95%;
  height: 450px;
  border-radius: 15px;
  box-shadow: 0px 1px 7px 0px rgba(0, 0, 0, 0.38);
  margin: 0 auto;
  margin-top: 20px;
  overflow-y: scroll;
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
