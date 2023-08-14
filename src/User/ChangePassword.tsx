import styled from "styled-components";
import { useState, useCallback, ChangeEvent } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { USER_DETAIL_PASSWORD_URL } from "../url";
import EggPart from "../LoginAndNewUser/EggPart";
import theme from "../common/theme";
function ChangePassword() {
  const navigate = useNavigate();

  const storedData = sessionStorage.getItem("persist:root");
  const parsedData = JSON.parse(storedData.replace(/\\"/g, ""));
  const MY_TOKEN = parsedData?.accessTokenValue;
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const password = formData.get("password") as string;

    try {
      const url = USER_DETAIL_PASSWORD_URL;
      const data = {
        password: password,
      };
      console.log("수정할데이터", data);
      axios.defaults.headers.common["Authorization"] = `Bearer ${MY_TOKEN}`;
      axios
        .put(url, data)
        .then((response) => {
          console.log("response", response);
          console.log("비밀번호가 변경되었습니다");
          navigate("/myPage");
        })
        .catch((error) => {
          console.error(error);
        });
    } catch (err) {
      console.log(err);
    }
  };
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
    <>
      <form
        onSubmit={handleSubmit}
        style={{ height: "100%", backgroundColor: `${theme.colors.main}` }}
      >
        <FormWrap>
          <EggPart />
          <ChangePasswordPart>비밀번호 변경</ChangePasswordPart>
          <InputPart>
            <InputArea id="Password">
              <Title>새 비밀번호</Title>
              <InputWrapper>
                <input type="password" name="password" onChange={onChangePassword}></input>
                <Message>
                  {password.length > 0 &&
                    (ispassword ? (
                      <div style={{ color: "#5b90fb", fontSize: "16rem" }}>
                        {" "}
                        안전한 비밀번호에요 :){" "}
                      </div>
                    ) : (
                      <div style={{ color: "red", fontSize: "16rem" }}>
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
                      <div style={{ color: "#5b90fb", fontSize: "16rem" }}>
                        비밀번호를 똑같이 입력했어요 : )
                      </div>
                    ) : (
                      <div style={{ color: "red", fontSize: "16rem" }}>
                        {" "}
                        비밀번호가 틀려요. 다시 확인해주세요ㅜㅜ{" "}
                      </div>
                    ))}
                </Message>
              </InputWrapper>
            </InputArea>
          </InputPart>
        </FormWrap>
        <SquareButton type="submit" id="newUser">
          비밀번호 바꾸기
        </SquareButton>
      </form>
    </>
  );
}
export default ChangePassword;

const FormWrap = styled.div`
  width: 92%;
  margin: 0 auto;
  .egg-img {
    padding-top: 60px;
  }
`;

const ChangePasswordPart = styled.h1`
  text-align: center;
  font-size: 24rem;
  font-weight: 800;
  margin: 0 auto;
  color: #fff;
  margin-bottom: 40px;
`;

const InputPart = styled.div`
  margin: 0 auto;
  width: 100%;
`;

const InputArea = styled.div`
  width: 100%;
  &:nth-of-type(2) {
    margin-top: 30px;
  }
`;

const Title = styled.div`
  font-size: 18rem;
  font-weight: 700;
  color: #fff;
  margin-bottom: 8rem;
`;
const InputWrapper = styled.div`
  position: relative;
  input {
    padding: 10px;
    width: 100%;
    height: 100%;
    font-size: 14rem;
    outline: none;
    border: none;
    color: #fff;
    border: 2rem solid #fff;
    border-radius: 4rem;
    background-color: transparent;
  }
  input::placeholder {
    color: #fff;
  }
  div {
    position: absolute;
    width: 100%;
    top: 110%;
    left: 50%;
    transform: translateX(-50%);
  }
`;

const SquareButton = styled.button`
  background-color: #fff;
  font-weight: 700;
  cursor: pointer;
  width: 92%;
  text-align: center;
  font-size: 18rem;
  font-weight: 800;
  color: ${theme.colors.main};
  padding: 10px 0px;
  border-radius: 5px;
  display: block;
  margin: 40px auto 0;
`;

const Message = styled.div`
  width: 100%;
  color: white;
  margin: 0 auto;
  text-align: center;
`;
