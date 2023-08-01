// import styled from "styled-components";
// import {useState} from 'react';
// import axios from "axios";
// import getLogin from "../ApiCall/getLogin";
// function CertifyPage(){
//     const [modalOpen,setModalOpen]=useState(false);


//     const onCertify=()=>{
//         setModalOpen(!modalOpen)
//     }


//     return (
//         <>
//         <Verify onClick={onCertify}>인증하기</Verify>
//         {modalOpen&&
//             <ModalBasic setModalOpen={setModalOpen}/>}
//         </>
//     )
// }

// function ModalBasic(setModalOpen:React.SetStateAction<boolean>){

//     const MY_TOKEN = getLogin();
//     const handleSubmit=(e:React.FormEvent<HTMLFormElement>): void=>{
//         e.preventDefault();
//         const formData = new FormData(e.currentTarget);
//         const email = formData.get('email') as string;
//         console.log(email)
//         axios.defaults.headers.common['Authorization'] = `Bearer ${MY_TOKEN}`;
//         axios.post(`http://43.200.162.72:8080/v1/user/verify/reset/${email}`)
//         .then((response) => {
//               console.log(response)
//               console.log('인증메일이 전송됨')
//         })
//         .catch((error) => {
//           console.error(error);
//         })
    
//     }
//     return(
//         <Container>
//             <Message>이메일을 입력해주세요</Message>
//             <form onSubmit={handleSubmit}>
//                 <input type='email' name="email"></input>
//                 <VerifyButton>인증메일받기</VerifyButton>
//                 <CloseModalButton>닫기</CloseModalButton>
//             </form>
//         </Container>
//     )
// }
// export default CertifyPage

// const Verify=styled.div`
//     width:25%;
//     background-color:#5b90fb;
//     font-size:20rem;
//     color:white;
//     text-align:center;
//     height:40rem;
//     border-radius:10rem;
//     padding-top:10rem;
//     cursor:pointer;
// `
// const Container = styled.div`

// width: 300px;
// height: 200px;


// z-index: 999;


// position: absolute;
// top: 50%;
// left: 50%;
// transform: translate(-50%, -50%);


// background-color: gray;
// border: 1px solid black;
// border-radius: 8px;
// `

// const Close=styled.button`
// position: absolute;
//   right: 10px;
//   top: 10px;
// `

// const Message=styled.h1`
//     font-size:20rem;
// `



// const VerifyButton=styled.button`
//     width:30rem;
//     font-size:20rem;
// `
// const CloseModalButton=styled.button`
// width:30rem;
//     font-size:20rem;`