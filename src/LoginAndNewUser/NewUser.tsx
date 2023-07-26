
import styled from "styled-components"
import EggIcon from '../assets/icon/EggIcon_png.png'
import HomePart from './HomePart'
import MobileWrap from '../common/MobileWrap'
function NewUser (){
    const handleSubmit=(e:React.FormEvent<HTMLFormElement>)=>{
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        // console.log(e.currentTarget);
        const id = formData.get('Id');
        console.log('아이디:', id);
    }
    

    return (
        <MobileWrap>
        <Wrapper>
            <HomePart/>
            <EggPart/>
            <form onSubmit={handleSubmit}>
            <InputPart>
                <InputArea id="Id"  >
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
                <InputArea id="Email">
                    <Title>이메일</Title>
                    <InputWrapper>
                        <input type='email'></input>
                    </InputWrapper>
                </InputArea>
                <InputArea id="PhoneNumber">
                    <Title>휴대폰번호</Title>
                    <InputWrapper>
                        <input type='tel'></input>
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
                <SquareButton type='submit' id='newUser'>회원가입</SquareButton>
            </Button>
            </form>

        </Wrapper>
        </MobileWrap>
    )

}

function EggPart() {
  return (
    <Egg>
      <EggImg>
        <img src={EggIcon} alt="EggIcon" />
      </EggImg>
    </Egg>
  );
}
const Wrapper = styled.div`
  height: 844px;
  background-color: #38db83;
  margin: 0 auto;
`;
const Egg = styled.div`
  width: 150px;
  margin: 0 auto;
`;
const EggImg = styled.div``;
const InputPart = styled.div`
  margin: 0 auto;
  width: 90%;
  margin-bottom: 20rem;
`;

const InputArea = styled.div`
  width: 100%;
  height: 85rem;
  margin-bottom: 5rem;
  // background-color:white;
`;

const Title = styled.div`
  font-size: 16rem;
  font-weight: 700;
  color: white;
  margin-bottom: 8rem;
`;
const InputWrapper = styled.div`
  position: relative;
  width: 99%;
  height: 45rem;
  border: 2rem solid white;
  border-radius: 4rem;
  input {
    padding-left: 5%;
    padding-right: 5%;
    width: 90%;
    height: 95%;
    font-size: 16rem;
    background-color: #38db83;

    outline: none;
    border: none;
    color: white;
  }

  input::placeholder {
    color: white;
  }
`;

const SquareButton = styled.button`
    width: 100%;
    height: 55rem;
    background-color:white;
    border: 2rem solid white;
    border-radius:4rem;
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
