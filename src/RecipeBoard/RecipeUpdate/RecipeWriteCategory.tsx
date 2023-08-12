import { CategoryBtn } from "../RecipeListPage";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleDown } from "@fortawesome/free-solid-svg-icons";

type Props = {
  selectOpt: (e: React.MouseEvent<HTMLButtonElement>) => void;
  category: string;
  categoryView: boolean;
  categoryName: string;
  setCategoryView: React.Dispatch<React.SetStateAction<boolean>>;
};

export default function RecipeWriteCategory({
  selectOpt,
  categoryView,
  categoryName,
  setCategoryView,
}: Props) {
  return (
    <>
      <CategoryBtn>
        <button
          onClick={() => {
            setCategoryView(true);
          }}
          type="button"
        >
          {categoryName || "카테고리"}
          <FontAwesomeIcon icon={faAngleDown} />
        </button>
        {categoryView && (
          <ul>
            <li>
              <button type="button" onClick={selectOpt} value="SIDE_DISH">
                밑반찬
              </button>
            </li>
            <li>
              <button type="button" onClick={selectOpt} value="MAIN_SIDE_DISH">
                메인반찬
              </button>
            </li>
            <li>
              <button type="button" onClick={selectOpt} value="KOREAN_SOUP">
                국/탕
              </button>
            </li>
            <li>
              <button type="button" onClick={selectOpt} value="STEW">
                찌개
              </button>
            </li>
            <li>
              <button type="button" onClick={selectOpt} value="DESSERT">
                디저트
              </button>
            </li>
            <li>
              <button type="button" onClick={selectOpt} value="NOODLES_DUMPLINGS">
                면/만두
              </button>
            </li>
            <li>
              <button type="button" onClick={selectOpt} value="RICE_PORRIDGE_RICE_CAKE">
                밥/죽/떡
              </button>
            </li>
            <li>
              <button type="button" onClick={selectOpt} value="FUSION">
                퓨전
              </button>
            </li>
            <li>
              <button type="button" onClick={selectOpt} value="KIMCHI_SALTED_FISH_SAUCES">
                김치/젓갈
              </button>
            </li>
            <li>
              <button type="button" onClick={selectOpt} value="SEASONING_SAUCE_JAM">
                양념/소스
              </button>
            </li>
            <li>
              <button type="button" onClick={selectOpt} value="SALAD">
                샐러드
              </button>
            </li>
            <li>
              <button type="button" onClick={selectOpt} value="SOUP">
                스프
              </button>
            </li>
            <li>
              <button type="button" onClick={selectOpt} value="BREAD">
                빵
              </button>
            </li>
            <li>
              <button type="button" onClick={selectOpt} value="SNACKS">
                과자
              </button>
            </li>
            <li>
              <button type="button" onClick={selectOpt} value="TEA_DRINK">
                차/음료
              </button>
            </li>
            <li>
              <button type="button" onClick={selectOpt} value="ETC">
                기타
              </button>
            </li>
          </ul>
        )}
      </CategoryBtn>
    </>
  );
}
