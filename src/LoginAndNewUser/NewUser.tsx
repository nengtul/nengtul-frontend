import axios, { AxiosError } from "axios";
import styled from "styled-components";
import EggIcon from "../assets/icon/EggIcon_png.png";
import HomePart from "./HomePart";
import Modal from "../Modal/Modal";
import MobileWrap from "../common/MobileWrap";
import { useState, useCallback, ChangeEvent } from "react";
import { useNavigate } from "react-router-dom";
import { USER_JOIN_URL } from "../url";
function NewUser() {
  const [modalOpen, setModalOpen] = useState<{ error: AxiosError | null }>({ error: null });

  const handleCloseModal = () => {
    setModalOpen({ error: null });
  };

  const navigate = useNavigate();
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const nickname = formData.get("nickname") as string;
    const name = formData.get("name") as string;
    const email = formData.get("email") as string;
    const tel = formData.get("tel") as string;
    const password = formData.get("password") as string;

    handleNewUser(name, nickname, password, tel, email).catch((err) => {
      console.error(err);
    });
  };

  const handleNewUser = async (
    name: string,
    nickname: string,
    password: string,
    tel: string,
    email: string
  ) => {
    try {
      const url = USER_JOIN_URL;
      const data = {
        name: name,
        nickname: nickname,
        password: password,
        phoneNumber: tel,
        email: email,
      };
      const response = await axios.post(url, data);
      console.log(response);
      navigate("/");
    } catch (err) {
      console.log(err);
      setModalOpen({ error: err as AxiosError }); // true가 아닌 객체로 상태 전달
      if (axios.isAxiosError(err)) {
        const axiosError: AxiosError = err;
        console.error("회원가입 요청 실패", axiosError);
        if (axiosError.response && axiosError.response.data) {
          const responseData = axiosError.response.data as { message?: string };
          if (responseData.message) {
            console.log(responseData.message);
          } else {
            console.log("다른오류");
          }
        } else {
          console.log("다른 오류");
        }
      } else {
        console.error("기타 오류", err);
      }
    }
  };

  // 유효성검사
  //8자리 이상 비밀번호 확인
  const [password, setPassword] = useState("");
  const [ispassword, setIsPassword] = useState<boolean>(false);
  const onChangePassword = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    const passwordRegex = /^.{8,}$/;
    const passwordCurrent = e.target.value;
    setPassword(passwordCurrent);
    if (!passwordRegex.test(passwordCurrent)) {
      setIsPassword(false);
    } else {
      setIsPassword(true);
    }
  }, []);

  //비밀번호 확인
  const [passwordCheck, setPasswordCheck] = useState("");

  const [ispasswordcheck, setIsPasswordCheck] = useState<boolean>(false);
  const onChangePasswordCheck = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      const passwordCheckCurrent = e.target.value;
      setPasswordCheck(passwordCheckCurrent);
      if (password === passwordCheckCurrent) {
        setIsPasswordCheck(true);
      } else {
        setIsPasswordCheck(false);
      }
    },
    [password]
  );
  return (
    <MobileWrap>
      {modalOpen.error && (
        <Modal error={modalOpen.error} onClose={handleCloseModal} title="회원가입"></Modal>
      )}
      <Wrapper>
        <HomePart />
        <EggPart />
        <form onSubmit={handleSubmit}>
          <InputPart>
            <InputArea id="Id">
              <Title>아이디</Title>
              <InputWrapper>
                <input type="text" name="nickname"></input>
              </InputWrapper>
            </InputArea>
            <InputArea id="Name">
              <Title>이름</Title>
              <InputWrapper>
                <input type="text" name="name"></input>
              </InputWrapper>
            </InputArea>
            <InputArea id="Email">
              <Title>이메일</Title>
              <InputWrapper>
                <input type="email" name="email"></input>
              </InputWrapper>
            </InputArea>
            <InputArea id="PhoneNumber">
              <Title>휴대폰번호</Title>
              <InputWrapper>
                <input type="tel" name="tel" placeholder="ex: 010-1234-5678 "></input>
              </InputWrapper>
            </InputArea>
            <InputArea id="Password">
              <Title>비밀번호</Title>
              <InputWrapper>
                <input type="password" name="password" onChange={onChangePassword}></input>
                <Message>
                  {password.length > 0 &&
                    (ispassword ? (
                      <div style={{ color: "white", fontSize: "14rem" }}>
                        {" "}
                        안전한 비밀번호에요 :){" "}
                      </div>
                    ) : (
                      <div style={{ color: "red", fontSize: "14rem" }}>
                        {" "}
                        8자리 이상의 비밀번호를 입력해주세요{" "}
                      </div>
                    ))}
                </Message>
              </InputWrapper>
            </InputArea>
            <InputArea id="PasswordCheck">
              <Title>비밀번호 확인</Title>
              <InputWrapper>
                <input type="password" onChange={onChangePasswordCheck}></input>
                <Message>
                  {passwordCheck.length > 0 &&
                    (ispasswordcheck ? (
                      <div style={{ color: "white", fontSize: "14rem" }}>
                        {" "}
                        비밀번호를 똑같이 입력했어요 : ){" "}
                      </div>
                    ) : (
                      <div style={{ color: "red", fontSize: "14rem" }}>
                        {" "}
                        비밀번호가 틀려요. 다시 확인해주세요 ㅜ ㅜ{" "}
                      </div>
                    ))}
                </Message>
              </InputWrapper>
            </InputArea>
          </InputPart>
          <Button>
            <SquareButton type="submit" id="newUser">
              회원가입
            </SquareButton>
          </Button>
        </form>
      </Wrapper>
    </MobileWrap>
  );
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
  background-color: white;
  border: 2rem solid white;
  border-radius: 4rem;
  margin-bottom: 14rem;
  font-size: 20rem;
  font-weight: 700;
  color: #38db83;
  text-align: center;
  cursor: pointer;
  &:first-of-type {
    margin-top: 6rem;
  }
`;
const Button = styled.div`
  width: 90%;
  height: 6%;
  margin: 0 auto;
  margin-bottom: 14rem;
  position: relative;
`;
// interface MessageProps {
//     ispassword: string;
//     // ispasswordcheck:string
//   }

// const Message=styled.div`
// const Message=styled.div<MessageProps>`
const Message = styled.div`
  width: 90%;
  color: white;
  margin: 0 auto;
  margin-top: 2%;
  font-size: 14rem;
  text-align: center;
`;
// background-color: ${({ isPassword }) => (isPassword ? 'green' : 'red')};
// Message.attrs<MessageProps>(({ isPassword }) => ({
//     $isPassword: isPassword,
//   }))``
export default NewUser;
