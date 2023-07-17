import styled from "styled-components"
import KakaoIcon from '../assets/KakaoIcon.svg'
import EggIcon from '../assets/EggIcon.tsx'

import HomePart from './HomePart.tsx'
import {Link} from 'react-router-dom'
function Login() {
    return( 
        <Wrapper>
            <HomePart/>
            <Egg>
                <EggImg>

               
                    <EggIcon/>
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
                <Button><SquareButton id='kakaoLogin'>
                    <KakaoPart>
                        <img src={KakaoIcon} alt="KakaoIcon" />
                    </KakaoPart>
                            카카오 로그인 
                </SquareButton></Button>


                <Link to='/newUser'>
                    <Button><SquareButton id='newUser'>회원가입</SquareButton></Button>
                </Link>
            </InputAndButton>
        </Wrapper>
    )
}



const Wrapper= styled.div`
    width:390px;
    height:844px;
    background-color:#38DB83;
    margin: 0 auto;
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
    height: 6%;
    background-color:#38DB83;
    border: 2rem solid white;
    margin: 0 auto;
    margin-bottom:3%;
`
const IdInputWrapper = styled.div`
  position: relative;
  width: 100%;
  height: 100%;

  input {
    padding-left:5%;
    padding-right:5%;
    width: 90%;
    height: 95%;
    font-size:16rem;
    background-color: #38DB83;
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
    padding-left:5%;
    padding-right:5%;
    width: 90%;
    height: 95%;
    font-size:16rem;
    background-color: #38DB83;
    // background-color: red;
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
    height: 100%;
    background-color:white;
    border: 2rem solid white;
    margin-bottom:14rem;
    font-size: 20rem;
    font-weight:700;
    color:#38DB83;
    text-align:center;
    cursor:pointer;
    &:first-of-type {
        margin-top: 6rem;
      }
    
    
`
const Button=styled.div`
    width:90%;
    height: 6%;
    margin: 0 auto;
    margin-bottom:14rem;
    position:relative;
    
`
const InputAndButton=styled.div`
    width:inherit;
    height:inherit;
    margin-top:30rem;
`

const KakaoPart=styled.p`
      position:absolute;
      top:30%;
      left:3%;
      
`

export default Login

