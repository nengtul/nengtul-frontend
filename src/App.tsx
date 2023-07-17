import "./App.css";
import Login from "./LoginAndNewUser/Login"
import NewUser from "./LoginAndNewUser/NewUser"
import { BrowserRouter,Route,Routes  } from 'react-router-dom'
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/login' element={<Login/>}/>
        <Route path='/newUser' element={<NewUser/>}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;

