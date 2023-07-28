import { useState, useEffect, useRef, useCallback } from "react";
import axios from "axios";
import { useInView } from "react-intersection-observer";
import { styled } from "styled-components";
import MyRecipeList from "./MyRecipelist";

export interface Post {
  id: number;
  title: string;
  thumb: string;
  like: number;
  writer: string;
}
interface InfiniteScrollProps {
  apiEndPoint: string;
}

export default function InfiniteScroll({ apiEndPoint }: InfiniteScrollProps) {
  const [posts, setPosts] = useState<Post[]>([]);
  const [hasNextPage, setHasNextPage] = useState<boolean>(true);
  const page = useRef<number>(1);
  const [ref, inView] = useInView();

  const fetch = useCallback(async () => {
    try {
      const { data } = await axios.get<Post[]>(`${apiEndPoint}?_limit=5&_page=${page.current}`);
      setPosts((prevPosts) => [...prevPosts, ...data]);
      setHasNextPage(data.length === 5);
      if (data.length) {
        page.current += 1;
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

  return (
    <>
      <CardWrap>
        {posts?.map((post) => <MyRecipeList key={post.id} post={post} />)}
        <div ref={ref} />
      </CardWrap>
    </>
  );
}

const CardWrap = styled.ul`
  width: 100%;
  padding-top: 60px;
`;
