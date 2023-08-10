import styled from "styled-components";

interface RecipeThumbProps {
  thumb: string;
}

export default function RecipeMainBanner({ thumb }: RecipeThumbProps) {
  return <Banner style={{ backgroundImage: `url(${thumb})` }}></Banner>;
}

const Banner = styled.div`
  width: 100%;
  height: 220px;
  background-color: #333;
  background-size: cover;
  background-position: center;
`;
