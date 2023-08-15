import styled, { css } from "styled-components";

interface LevelColors {
  [key: string]: string;
}

interface LevelBadgeProps {
  children: number;
}
const PointLevel = {
  막내요리사: 100,
  보조요리사: 200,
  조리장: 300,
  주방장: 301,
} as const;

export default function LevelBadge({ children }: LevelBadgeProps) {
  const point = Number(children);
  let level;
  if (point <= PointLevel.막내요리사) {
    level = "막내요리사";
  } else if (point <= PointLevel.보조요리사) {
    level = "보조요리사";
  } else if (point <= PointLevel.조리장) {
    level = "조리장";
  } else {
    level = "주방장";
  }

  const levelColors: LevelColors = {
    막내요리사: "#c99dc2",
    보조요리사: "#FC8F6C",
    조리장: "#8FB2F7",
    주방장: "#38DB83",
  };

  return (
    <>
      <Badge className="level-badge" $backgroundcolor={levelColors[level]}>
        {level}
      </Badge>
    </>
  );
}

const Badge = styled.div<{ $backgroundcolor: string }>`
  padding: 4px 10px;
  ${({ $backgroundcolor }) => css`
    background: ${$backgroundcolor};
  `};
  font-size: 12rem;
  color: #fff;
  font-weight: 700;
  border-radius: 5px;
  margin-left: 7px;
  display: inline-block;
`;
