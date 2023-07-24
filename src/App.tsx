import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import MainPage from "./mainpage/MainPage";
import Login from "./LoginAndNewUser/Login";
import NewUser from "./LoginAndNewUser/NewUser";
import IngredientSearch from "./IngredientAndRecipe/IngredientSearch";
import IngreAfterRecipePage from "./IngredientAndRecipe/IngreAfterRecipePage";
import RecipeListPage from "./RecipeBoard/RecipeListPage";
import RecipeWritePage from "./RecipeBoard/RecipeWritePage";

import ChattingList from "./Chatting/ChattingListPage";
import Chat from "./Chatting/ChatPage";
import RecipeView from "./RecipeBoard/RecipeView";


import MarketPage from './Market/MarketPage'
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
          <Route path="/recipeWrite" element={<RecipeWritePage />} />
          <Route path="/recipeView" element={<RecipeView />} />
          <Route path="/chattingList" element={<ChattingList />} />
          <Route path="/chat" element={<Chat />} />
          <Route path="/market" element={<MarketPage />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
