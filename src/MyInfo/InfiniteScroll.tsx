import { useState, useEffect, useRef, useCallback } from "react";
import { useInView } from "react-intersection-observer";
import { styled } from "styled-components";
import MyRecipeList from "./MyRecipelist";
import { useSelector } from "react-redux";
import { RootState } from "../Store/store";
import { getTokenData } from "../axios";
import { useDispatch } from "react-redux";
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

  const dispatch = useDispatch();
  const Token = useSelector((state: RootState) => state.accessTokenValue);
  const { accessTokenValue, refreshTokenValue } = Token;
  const MY_TOKEN = accessTokenValue;
  const REFRESH_TOKEN = refreshTokenValue;

  const fetch = useCallback(async () => {
    try {
      if (MY_TOKEN && REFRESH_TOKEN) {
        await getTokenData<ContentData>(
          `${apiEndPoint}?size=7&page=${page.current}`,
          MY_TOKEN,
          dispatch,
          REFRESH_TOKEN
        )
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
      }
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

  const handleDeletePost = (postId: number | string) => {
    if (typeof postId === "number") {
      setPosts((prevPosts) => prevPosts.filter((post) => post.id !== postId));
    } else if (typeof postId === "string") {
      setPosts((prevPosts) => prevPosts.filter((post) => post.recipeId !== postId));
    }
  };

  return (
    <>
      <CardWrap>
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
          <NoRecipe title={"레시피"} />
        )}
        <div ref={ref} style={{ height: "50px" }} />
      </CardWrap>
    </>
  );
}

const CardWrap = styled.ul`
  margin-top: 60px;
  width: 100%;
  height: calc(100% - 60px);
`;
