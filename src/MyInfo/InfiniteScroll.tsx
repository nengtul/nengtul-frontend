import { useState, useEffect, useRef, useCallback } from "react";
import { useInView } from "react-intersection-observer";
import { styled } from "styled-components";
import MyRecipeList from "./MyRecipelist";
import { useSelector } from "react-redux";
import { RootState } from "../Store/store";
import { getData } from "../axios";
import NoRecipe from "../common/NoRecipe";
export interface Post {
  createdAt: string;
  id: number;
  recipeId: string;
  thumbnailUrl: string;
  title: string;
  recipeUserNickName: string;
  likeCount: number;
}
interface ContentData {
  content: Post[];
}
interface InfiniteScrollProps {
  apiEndPoint: string;
}

export default function InfiniteScroll({ apiEndPoint }: InfiniteScrollProps) {
  const [posts, setPosts] = useState<Post[]>([]);
  const [hasNextPage, setHasNextPage] = useState<boolean>(true);
  const page = useRef<number>(0);
  const [ref, inView] = useInView();

  const Token = useSelector((state: RootState) => state.accessTokenValue);
  const { accessTokenValue } = Token;
  const MY_TOKEN = accessTokenValue;

  const fetch = useCallback(async () => {
    try {
      if (MY_TOKEN) {
        await getData<ContentData>(`${apiEndPoint}?size=5&page=${page.current}`, MY_TOKEN)
          .then((data) => {
            console.log(data);
            const contentData = data.content;
            setPosts((prevPosts) => [...prevPosts, ...contentData]);
            setHasNextPage(contentData.length === 5);
            if (contentData.length) {
              page.current += 1;
            }
          })
          .catch((err) => {
            console.log(err);
          });
      }
    } catch (err) {
      console.error(err);
    }
  }, []);

  const handleDeletePost = (postId: number | string) => {
    if (typeof postId === "number") {
      setPosts((prevPosts) => prevPosts.filter((post) => post.id !== postId));
    } else if (typeof postId === "string") {
      setPosts((prevPosts) => prevPosts.filter((post) => post.recipeId !== postId));
    }
  };

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
    <>
      <CardWrap style={{ height: "100%" }}>
        {posts.length > 0 ? (
          posts?.map((post) => (
            <MyRecipeList
              key={post.recipeId}
              post={post}
              onDeletePost={handleDeletePost}
              apiEndPoint={apiEndPoint}
            />
          ))
        ) : (
          <NoRecipe title={"좋아하는"} />
        )}
        <div ref={ref} />
      </CardWrap>
    </>
  );
}

const CardWrap = styled.ul`
  width: 100%;
  height: 100%;
  padding-top: 60px;
`;
