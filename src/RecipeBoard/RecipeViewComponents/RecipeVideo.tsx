import styled from "styled-components";
import ReactPlayer from "react-player";

interface RecipeVideoProps {
  video: string;
}

export default function RecipeVideo({ video }: RecipeVideoProps) {
  return (
    <Player>
      <ReactPlayer url={video} controls width={"100%"} height={"100%"} />
    </Player>
  );
}

const Player = styled.div`
  width: 100%;
  height: 220px;
  background-color: #333;
`;
