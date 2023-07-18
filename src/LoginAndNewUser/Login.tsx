
import styled from "styled-components"
import KakaoIcon from '../assets/icon/kakaotalk.svg'
import GoogleIcon from '../assets/icon/google.svg'
import NaverIcon from '../assets/icon/naver.svg'
import EggIcon from '../assets/icon/EggIcon_png.png' 

import HomePart from './HomePart.tsx'
import MobileWrap from '../common/MobileWrap.tsx'
import {Link} from 'react-router-dom'
function Login() {
    return( 
        <MobileWrap>
         <Wrapper>
            <HomePart/>
            <Egg>
                <EggImg>

                    <img src={EggIcon} alt="EggIcon" />
                </EggImg>
            </Egg>


            <InputAndButton>
            
                <SquareInput id="id">
                    <IdInputWrapper>
                        <input type="email" placeholder="아이디를 입력해주세요" />
                    </IdInputWrapper>
                </SquareInput>
                <SquareInput id="password">
                    <PasswordInputWrapper>
                        <input type="password" placeholder="비밀번호를 입력해주세요" />
                    </PasswordInputWrapper>
                </SquareInput>
                
                <Button><SquareButton id='login'>로그인</SquareButton></Button>
                <Link to='/newUser'>
                    <Button><SquareButton id='newUser'>회원가입</SquareButton></Button>
                </Link>

                <SNSButtonArea>
                    <SNSButton id='kakao'><img src={KakaoIcon} alt="EggIcon" /></SNSButton>
                    <SNSButton id='Google'><img src={GoogleIcon} alt="EggIcon" /></SNSButton>
                    <SNSButton id='Naver'><img src={NaverIcon} alt="EggIcon" /></SNSButton>
                </SNSButtonArea>
            </InputAndButton>
        </Wrapper>
        </MobileWrap>
    )

}


const Wrapper= styled.div`
    // width:390px;
    // height:844px;
    min-height:844px;
    // height:100%;
    background-color:#38DB83;
    
    `

const Egg=styled.div`
    width :150px;
    margin: 0 auto;
`
const EggImg=styled.div`
    padding-top:77px;
`


const SquareInput=styled.div`
    width: 90%;
    // height: 6%;
    height: 54rem;
    background-color:#38DB83;
    border: 2rem solid white;
    border-radius:4rem;
    margin: 0 auto;
    margin-bottom:3%;
`

const IdInputWrapper = styled.div`
    position: relative;
    width: 100%;
    height: 100%;

  input {
    padding-left: 5%;
    padding-right: 5%;
    width: 90%;
    height: 95%;
    font-size: 16rem;
    background-color: #38db83;
    // background-color: red;
    outline: none;
    border: none;
    color: white;
  }

  input::placeholder {
    color: white;
  }
`;

const PasswordInputWrapper = styled.div`
  position: relative;
  width: 100%;
  height: 100%;

  input {
    padding-left: 5%;
    padding-right: 5%;
    width: 90%;
    height: 95%;

    font-size:16rem;
    background-color: #38DB83;

    outline: none;
    border: none;
    color: white;
  }

  input::placeholder {
    color: white;
  }
`;


const SquareButton=styled.button`

    width: 100%;
    // height: 100%;
    height: 51rem;
    background-color:white;
    border: 2rem solid white;
    border-radius:4rem;
    
    font-size: 20rem;
    font-weight:700;
    color:#38DB83;
    text-align:center;
    cursor:pointer;
    &:first-of-type {
        margin-top: 16rem;
      }
 
    
    
`
const Button=styled.div`
    width:90%;
    height: 6%;
    margin: 0 auto;
    position:relative;
    
    
`
const InputAndButton=styled.div`
    width:inherit;
    height:inherit;
    margin-top:30rem;
`
const SNSButtonArea=styled.div`
    display:flex;
    justify-content:center;
    margin-top:20rem;
    `
const SNSButton=styled.button`
    width:62rem;
    height:62rem;
    border-radius:100%;
    border:none;
    cursor:pointer;
    background-color:#fff;
    &:not(:last-child){
        margin-right:17rem;
    }
    
    
`
export default Login


