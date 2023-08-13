import { useState, useEffect, useRef, useCallback } from "react";
import { useInView } from "react-intersection-observer";
import { styled } from "styled-components";
import MyFavList from "./MyFavList";
import { useSelector } from "react-redux";
import { RootState } from "../Store/store";
import { getData } from "../axios";
import NoRecipe from "../common/NoRecipe";
export interface User {
    id: number;
    publisherId:number;
    publisherNickName:string;
    publisherProfilePhotoUrl:string;
}
interface ContentData {
  content: User[];
}
interface InfiniteScrollProps {
  apiEndPoint: string;
}

export default function InfiniteScroll2({ apiEndPoint }: InfiniteScrollProps) {
  const [users, setUsers] = useState<User[]>([]);
  const [hasNextPage, setHasNextPage] = useState<boolean>(true);
  const page = useRef<number>(0);
  const [ref, inView] = useInView();

  const Token = useSelector((state: RootState) => state.accessTokenValue);
  const { accessTokenValue } = Token;
  const MY_TOKEN = accessTokenValue;

  const fetch = useCallback(async () => {
    try {
      if (MY_TOKEN) {
        await getData<ContentData>(apiEndPoint, MY_TOKEN)
          .then((data) => {
            console.log(data);
            const contentData = data.content;
            setUsers((prevPosts) => [...prevPosts, ...contentData]);
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

  const handleDeletePost = (postId: number) => {
    setUsers((prevPosts) => prevPosts.filter((post) => post.id !== postId));
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
      <CardWrap>
        {users.length > 0 ? (
          users?.map((user) => (
            <MyFavList
              key={user.id}
              user={user}
              onDeletePost={handleDeletePost}
              apiEndPoint={apiEndPoint}
            />
          ))
        ) : (
          <NoRecipe title={"즐겨찾기 한"} />
        )}
        <div ref={ref} />
      </CardWrap>
    </>
  );
}

const CardWrap = styled.ul`
  width: 100%;
  padding-top: 60px;
  margin-top:3px;
`;
