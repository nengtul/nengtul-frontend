import styled from "styled-components";

interface LevelBadgeProps {
  children: string;
}

const Badge = styled.div`
  padding: 4px 10px;
  background: #c99dc2;
  font-size: 15rem;
  color: #fff;
  font-weight: 700;
  border-radius: 5px;
  margin-left: 4px;
  display: inline-block;
`;

export default function LevelBadge({ children }: LevelBadgeProps) {
  return (
    <>
      <Badge>{children}</Badge>
    </>
  );
}
