import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import MainPage from "./mainpage/MainPage";
import Login from "./LoginAndNewUser/Login";
import NewUser from "./LoginAndNewUser/NewUser";
import IngredientSearch from "./IngredientAndRecipe/IngredientSearch";
import IngreAfterRecipePage from "./IngredientAndRecipe/IngreAfterRecipePage";
import RecipeListPage from "./RecipeBoard/RecipeListPage";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path={"/"} element={<MainPage />}></Route>
          <Route path="/login" element={<Login />} />
          <Route path="/newUser" element={<NewUser />} />
          <Route path="/search" element={<IngredientSearch />} />
          <Route path="/ingredientRecipe" element={<IngreAfterRecipePage />} />
          <Route path="/recipeList" element={<RecipeListPage />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
