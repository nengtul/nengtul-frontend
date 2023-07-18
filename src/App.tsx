import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import MainPage from "./mainpage/MainPage";

import Login from "./LoginAndNewUser/Login";
import NewUser from "./LoginAndNewUser/NewUser";
import IngredientSearch from "./IngredientAndRecipe/IngredientSearch";
import IngreAfterRecipePage from "./IngredientAndRecipe/IngreAfterRecipePage";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path={"/"} element={<MainPage />}></Route>
          <Route path="/login" element={<Login />} />
          <Route path="/newUser" element={<NewUser />} />
          <Route path="/search" element={<IngredientSearch />} />
          <Route path='/ingredientRecipe' element={<IngreAfterRecipePage/>}/>

        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
