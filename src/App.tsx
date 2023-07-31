import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import MainPage from "./mainpage/MainPage";
import Login from "./LoginAndNewUser/Login";
import NewUser from "./LoginAndNewUser/NewUser";
import IngredientSearch from "./IngredientAndRecipe/IngredientSearch";
import IngreAfterRecipePage from "./IngredientAndRecipe/IngreAfterRecipePage";
import RecipeListPage from "./RecipeBoard/RecipeListPage";
import RecipeWritePage from "./RecipeBoard/RecipeWritePage";
import FindId from "./LoginAndNewUser/FindIdPage";
import MyPage from "./User/MyPage";
import ChattingListPage from "./Chatting/ChattingListPage";
import ChatPage from "./Chatting/ChatPage";
import RecipeView from "./RecipeBoard/RecipeViewPage";
import IngredientMap from "./IngredientMap/IngredientMap";
import IngredientWrite from "./IngredientMap/IngredientWrite";
import MarketPage from "./Market/MarketPage";
import MyRecipePage from "./MyInfo/MyRecipePage";
import HeartLecipePage from "./MyInfo/HeartLecipePage";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { RootState } from "./Store/types";
import NoticeListPage from "./Notice/NoticeListPage";

function App() {
  const token = useSelector((state: RootState) => state.auth?.token);

  useEffect(() => {
    console.log(token);
  }, [token]);

  return (
    <BrowserRouter>
      <Routes>
        <Route path={"/"} element={<MainPage />}></Route>
        <Route path="/login" element={<Login />} />
        <Route path="/newUser" element={<NewUser />} />
        <Route path="/search" element={<IngredientSearch />} />
        <Route path="/ingredientRecipe" element={<IngreAfterRecipePage />} />
        <Route path="/ingredientWrite" element={<IngredientWrite />} />
        <Route path="/recipeList" element={<RecipeListPage />} />
        <Route path="/recipeWrite" element={<RecipeWritePage />} />
        <Route path="/recipeView" element={<RecipeView />} />
        <Route path="/chattingList" element={<ChattingListPage />} />
        <Route path="/chat" element={<ChatPage />} />
        <Route path="/market" element={<MarketPage />} />
        <Route path="/findId" element={<FindId />} />
        <Route path="/myPage" element={<MyPage />} />
        <Route path="/ingredientMap" element={<IngredientMap />} />

        <Route path="/heartLecipe" element={<HeartLecipePage />} />
        <Route path="/MyRecipe" element={<MyRecipePage />} />

        <Route path="/notice" element={<NoticeListPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
