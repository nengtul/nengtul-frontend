import { styled } from "styled-components";
import theme from "../common/theme";
import NoticeList from "./NoticeList";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { NOTICES_LIST_URL } from "../url";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPen } from "@fortawesome/free-solid-svg-icons";
import { getData } from "../axios";

export interface Post {
  content: string;
  createdAt: string;
  modifiedAt: string;
  nickname: string;
  noticeId: number;
  noticeImg: string;
  title: string;
  viewCount: number;
}
interface ContentData {
  content: Post[];
  totalElements: number;
}

export default function NoticeWrap() {
  const itemsPerPage = 10;
  const [contents, setContents] = useState<Post[]>([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);

  useEffect(() => {
    getData<ContentData>(`${NOTICES_LIST_URL}?page=${currentPage}&size=${itemsPerPage}`)
      .then((data: ContentData) => {
        const contentArr = data.content;
        setContents(contentArr);
        setTotalPages(Math.ceil(data.totalElements / itemsPerPage)); // Use Math.ceil()
      })
      .catch((error) => {
        console.log(error);
      });
  }, [currentPage]);

  const navigate = useNavigate();
  const goToWrite = () => {
    navigate("/noticeWrite");
  };

  const roles = sessionStorage.getItem("roles");

  const pagesToShow = 5; // Number of buttons to show
  const startPage = Math.max(0, currentPage - Math.floor(pagesToShow / 2));
  const endPage = Math.min(totalPages - 1, startPage + pagesToShow - 1);

  const handlePageClick = (page: number) => {
    setCurrentPage(page);
  };

  return (
    <Wrap>
      <h2>공지사항</h2>
      <ul>
        {contents.map((content) => (
          <NoticeList key={content.noticeId} content={content} />
        ))}
      </ul>
      <Pagination>
        {roles === "ADMIN" && (
          <button type="button" className="write-btn" onClick={goToWrite}>
            <FontAwesomeIcon icon={faPen} />
          </button>
        )}

        <div className="pagination">
          {Array.from({ length: endPage - startPage + 1 }, (_, idx) => idx + startPage).map(
            (page) => (
              <button
                key={page}
                className={`page-btn ${page === currentPage ? "active" : ""}`}
                onClick={() => handlePageClick(page)}
              >
                {page + 1}
              </button>
            )
          )}
        </div>
      </Pagination>
    </Wrap>
  );
}

const Wrap = styled.div`
  width: 94%;
  margin: 20px auto;

  h2 {
    font-size: 24rem;
    text-align: center;
    font-weight: 800;
    color: ${theme.colors.main};
  }
  ul {
    width: 100%;
    border: 1px solid #ddd;
    margin-top: 20px;
    border-radius: 8px;
  }
  .write-btn {
    width: 50rem;
    height: 50rem;
    color: white;
    background-color: ${theme.colors.main};
    display: inline-block;
    cursor: pointer;
    position: absolute;
    left: 83%;
    font-size: 25rem;
    bottom: 70px;
    z-index: 9999;
    border-radius: 100%;
  }
`;

const Pagination = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 20px;

  .pagination {
    margin-top: 10px;
    button {
      font-size: 15rem;
      font-weight: 700;
      padding: 4px 6px;
      margin: 0px 2px;
      background-color: #bdbcbc;
      color: #fff;
      border-radius: 4px;
      cursor: pointer;
    }
    button.active {
      background-color: ${theme.colors.main};
      color: #fff;
    }
  }
`;
