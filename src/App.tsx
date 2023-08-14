import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import MainPage from "./mainpage/MainPage";
import Login from "./LoginAndNewUser/Login";
import NewUser from "./LoginAndNewUser/NewUser";
import IngredientSearch from "./IngredientAndRecipe/IngredientSearch";
import IngreAfterRecipePage from "./IngredientAndRecipe/IngreAfterRecipePage";
import RecipeListPage from "./RecipeBoard/RecipeListPage";
import RecipeWritePage from "./RecipeBoard/RecipeWritePage";
import FindId from "./FindAndCertify/FindIdPage";
import FindPasswordPage from "./FindAndCertify/FindPasswordPage";
import MyPage from "./User/MyPage";
import ChattingListPage from "./Chatting/ChattingListPage";
import ChatPage from "./Chatting/ChatPage";
import ChatPage2 from "./Chatting/ChatPage2";
import RecipeView from "./RecipeBoard/RecipeViewPage";
import IngredientMap from "./IngredientMap/IngredientMap";
import IngredientWrite from "./IngredientMap/IngredientWrite";
import MarketPage from "./Market/MarketPage";
import MyRecipePage from "./MyInfo/MyRecipePage";
import HeartLecipePage from "./MyInfo/HeartLecipePage";
import NoticeViewPage from "./Notice/NoticeViewPage";
import NoticeListPage from "./Notice/NoticeListPage";
import ChangePassowordPage from "./User/ChangePasswordPage";
import MyIngredientTradePage from "./User/MyIngredientTradePage";
import NoticeWritePage from "./Notice/NoticeWritePage";
import RecipeUpdatePage from "./RecipeBoard/RecipeUpdate/RecipeUpdatePage";
import FavoritePublisherPage from "./MyInfo/FavoritePublisherPage"
import UserRecipePage from "./MyInfo/UserRecipePage"
function App() {
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
        <Route path="/:recipeId" element={<RecipeView />} />
        <Route path="/update/:recipeId" element={<RecipeUpdatePage />} />
        <Route path="/chattingList" element={<ChattingListPage />} />
        <Route path="/chat" element={<ChatPage />} />
        <Route path="/chat2" element={<ChatPage2 />} />
        <Route path="/market" element={<MarketPage />} />
        <Route path="/findId" element={<FindId />} />
        <Route path="/findPassword" element={<FindPasswordPage />} />
        <Route path="/myPage" element={<MyPage />} />
        <Route path="/changePassword" element={<ChangePassowordPage />} />

        <Route path="/ingredientMap" element={<IngredientMap />} />

        <Route path="/heartLecipe" element={<HeartLecipePage />} />
        <Route path="/myRecipe" element={<MyRecipePage />} />
        <Route path='/favoritePublisher' element={<FavoritePublisherPage/>}/>
        <Route path="/notice" element={<NoticeListPage />} />
        <Route path="/noticeView/:noticeId" element={<NoticeViewPage />} />
        <Route path="favoritePublisher/recipe/user/:userId" element={<UserRecipePage />} />
        <Route path="/noticeWrite" element={<NoticeWritePage />} />
        <Route path="/myIngredientTrade" element={<MyIngredientTradePage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
