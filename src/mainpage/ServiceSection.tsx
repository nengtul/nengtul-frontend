import { Link } from "react-router-dom";
import { SectionTitle, TitlePoint, MainPageSection } from "./CommonStyle";
import styled from "styled-components";
import Mart from "../assets/mainpage/mart.svg";
import Share from "../assets/mainpage/share.svg";
import Service from "../assets/mainpage/service.svg";

const ServiceCard = styled.div`
  width: 95%;
  height: 180rem;
  margin: 0 auto;
  margin-top: 15rem;
  border-radius: 17rem;
  background: #303030;
`;

const CardWithRecipe = styled(ServiceCard)`
  background-color: #c99dc2;
  margin-top: 20px;
`;
const CardWithShare = styled(ServiceCard)`
  background-color: #fc8f6c;
`;
const CardWithMart = styled(ServiceCard)`
  background-color: #8fb2f7;
`;

const CardLink = styled(Link)`
  width: 100%;
  height: 100%;
  display: inline-flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: flex-start;
  padding: 15px;
  position: relative;
`;

const CardCategory = styled.span`
  border: 2px solid #fff;
  color: #fff;
  font-size: 14rem;
  font-weight: 700;
  padding: 8px 16px;
  border-radius: 15px;
`;
const CardTitle = styled.p`
  font-weight: 800;
  color: #fff;
  font-size: 20rem;
  line-height: 1.3;
`;

const CardImage = styled.img`
  position: absolute;
  top: 50%;
  right: 5px;
  transform: translateY(-50%);
  opacity: 0.8;
`;

export default function ServiceSection() {
  return (
    <>
      <MainPageSection>
        <SectionTitle>
          <TitlePoint>냉털의 특별한</TitlePoint> 서비스!
        </SectionTitle>
        <CardWithRecipe>
          <CardLink to={"/"}>
            <CardCategory>냉장고를 털어라</CardCategory>
            <CardTitle>
              냉장고에 남아있는 재료로
              <br />
              맞춤 레시피를 확인하세요!
            </CardTitle>
            <CardImage src={Service} alt="card-img"></CardImage>
          </CardLink>
        </CardWithRecipe>
        <CardWithShare>
          <CardLink to={"/"}>
            <CardCategory>식재료 아나바다</CardCategory>
            <CardTitle>
              요리하고 재료가 남으셨나요?
              <br />
              주변 사람들과 공유해보세요!
            </CardTitle>
            <CardImage src={Share} alt="card-img"></CardImage>
          </CardLink>
        </CardWithShare>
        <CardWithMart>
          <CardLink to={"/"}>
            <CardCategory>근처 마트 찾기</CardCategory>
            <CardTitle>
              재료가 부족하거나 없다면
              <br />
              근처 마트를 알아봐드릴게요!
            </CardTitle>
            <CardImage src={Mart} alt="card-img"></CardImage>
          </CardLink>
        </CardWithMart>
      </MainPageSection>
    </>
  );
}
