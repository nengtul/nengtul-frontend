import styled from "styled-components"
import EggIcon from '../assets/EggIcon.tsx'
import HomePart from './HomePart'

function NewUser (){

    

    return (
        <Wrapper>
            <HomePart/>
            <EggPart/>

            <InputPart>
                <InputArea id="Id">
                    <Title>아이디</Title>
                    <InputWrapper>
                        <input type='text' ></input>
                    </InputWrapper>
                    <Message> * 사용가능한 아이디 입니다 </Message>
                </InputArea>
                <InputArea id="Name">
                    <Title>이름</Title>
                    <InputWrapper>
                        <input type='text'></input>
                    </InputWrapper>
                </InputArea>
                <InputArea id="Password">
                    <Title>비밀번호</Title>
                    <InputWrapper>
                        <input type='password'></input>
                    </InputWrapper>
                </InputArea>
                <InputArea id="PasswordCheck">
                    <Title>비밀번호 확인</Title>
                    <InputWrapper>
                        <input type='password'></input>
                    </InputWrapper>
                    <Message> * 비밀번호가 일치합니다 </Message>
                </InputArea>
                
            </InputPart>
            <Button>
                <SquareButton id='newUser'>회원가입</SquareButton>
            </Button>

        </Wrapper>
    )
}


function EggPart(){
    return (
        <Egg>
            <EggImg>
                <EggIcon/>
            </EggImg>
        </Egg>
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
    padding-top:32rem;
`
const InputPart=styled.div`
    
    margin: 0 auto;
    width:90%;
    margin-bottom:30rem;
`

const InputArea=styled.div`
    width:100%;
    height: 85rem;
    margin-bottom:19rem;
    // background-color:white;
`

const Title=styled.div`
    font-size:16rem;
    font-weight:700;
    color:white;
    margin-bottom:8rem;
`
const InputWrapper=styled.div`
    position: relative;
    width: 99%;
    height: 45rem;
    border: 2rem solid white;
    input {
        padding-left:5%;
        padding-right:5%;
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
`

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
const Message=styled.div`
    width:90%;
    color:white;
    margin: 0 auto;
    margin-top:2%;
    // height:10px;
    font-size:14rem;
    text-align:center;
`
export default NewUser