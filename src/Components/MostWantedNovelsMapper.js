import "../Styles/clientStyles.css";
import React, { useState } from "react";
import * as actions from "../store/actions/actions";
// import * as types from '../store/actions/actions'
import { connect } from "react-redux";
import { useNavigate } from "react-router-dom";
import useMediaQuery from "@mui/material/useMediaQuery";

import { toast } from "react-toastify";
function MostWantedNovelsMapper({
  item,
  favoriteBookHandler,
  state,
  authReducer,
  getBook,
}) {
  const navigate = useNavigate();
  const isLogin = authReducer?.isLogin;
  const [hoverCategories, setHoverCategories] = useState(false);
  const screen1024 = useMediaQuery("(max-width:1024px)");
  const screen767 = useMediaQuery("(max-width:767px)");
  let categoryName = item?.category?.name || item?.categories?.name;

  console.log('abc ', item);
  return (
    <>
        <div className="book_main most_popular">
          <div
            className="book_image"
            onClick={() => {
              getBook(item);
              navigate(`/book`, {
                replace: false,
                state: {
                  book: item,
                  bookId: item?._id,
                  bookName: item?.Title,
                  bookImage: `${item?.Cover?.url || item?.image?.url}`,
                },
              });
            }}
          >
            <img
              src={`${item?.Cover?.url || item?.image?.url}`}
              alt="mp-book-cover"
            />
          </div>

          <div className="books_details">
            <h3
              className="book_title"
              onClick={() => {
                getBook(item);
                navigate(`/book`, {
                  replace: false,
                  state: {
                    book: item,
                    bookId: item?._id,
                    bookName: item?.Title,
                    bookImage: `${item?.Cover?.url || item?.image?.url}`,
                  },
                });
              }}
            >
              {item?.Title}
            </h3>

            <div className="mp-book-category">
              <span
                onClick={() => {
                  navigate(`/search?category=${categoryName}`, {
                    state: categoryName,
                  });
                }}
                className="bookCatName_Status"
                onMouseEnter={() => setHoverCategories(true)}
                onMouseLeave={() => setHoverCategories(false)}
              >
                {hoverCategories ? (
                  <>
                    <svg
                      className="svg-inline-header-cat-icon"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      style={{ marginBottom: "2px" }}
                    >
                      <path
                        className="st0"
                        d="M3,0h4.2c1.7,0,3.1,1.5,3.1,3.1v4.2c0,1.7-1.5,3.1-3.1,3.1H3c-1.6,0.1-3.1-1.2-3.1-2.9V3.1C-0.1,1.5,1.4,0,3,0 z"
                      />
                      <path
                        className="st0"
                        d="M16.7,0h4.2c1.7,0,3.2,1.5,3.2,3.1v4.2c0,1.7-1.5,3.1-3.1,3.1h-4.2c-1.7,0-3.1-1.5-3.1-3.1V3.1 C13.6,1.5,14.9,0,16.7,0z"
                      />
                      <path
                        className="st0"
                        d="M3,13.7h4.2c1.7,0,3.1,1.5,3.1,3.1v4.2c0,1.7-1.5,3.1-3.1,3.1H3c-1.6,0.1-3.1-1.3-3.1-2.9v-4.2 C-0.1,15,1.4,13.7,3,13.7z"
                      />
                      <path
                        className="st0"
                        d="M16.7,13.7h4.2c1.7,0,3.1,1.5,3.1,3.1v4.2c0,1.7-1.5,3.1-3.1,3.1h-4.2c-1.7,0-3.1-1.5-3.1-3.1v-4.2 C13.6,15,14.9,13.7,16.7,13.7z"
                      />
                    </svg>
                    {item?.category?.name ? (
                      <span style={{ color: "black" }}>
                        {item?.category?.name}
                      </span>
                    ) : (
                      <span style={{ marginTop: "-2.2px", color: "black" }}>
                        {item?.categories?.name}
                      </span>
                    )}
                  </>
                ) : (
                  <>
                    <svg
                      className="svg-inline-header-cat-icon"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      style={{ marginBottom: "2px", fill: "#8d939d" }}
                    >
                      <path
                        className="st0"
                        d="M3,0h4.2c1.7,0,3.1,1.5,3.1,3.1v4.2c0,1.7-1.5,3.1-3.1,3.1H3c-1.6,0.1-3.1-1.2-3.1-2.9V3.1C-0.1,1.5,1.4,0,3,0 z"
                      />
                      <path
                        className="st0"
                        d="M16.7,0h4.2c1.7,0,3.2,1.5,3.2,3.1v4.2c0,1.7-1.5,3.1-3.1,3.1h-4.2c-1.7,0-3.1-1.5-3.1-3.1V3.1 C13.6,1.5,14.9,0,16.7,0z"
                      />
                      <path
                        className="st0"
                        d="M3,13.7h4.2c1.7,0,3.1,1.5,3.1,3.1v4.2c0,1.7-1.5,3.1-3.1,3.1H3c-1.6,0.1-3.1-1.3-3.1-2.9v-4.2 C-0.1,15,1.4,13.7,3,13.7z"
                      />
                      <path
                        className="st0"
                        d="M16.7,13.7h4.2c1.7,0,3.1,1.5,3.1,3.1v4.2c0,1.7-1.5,3.1-3.1,3.1h-4.2c-1.7,0-3.1-1.5-3.1-3.1v-4.2 C13.6,15,14.9,13.7,16.7,13.7z"
                      />
                    </svg>
                    {item?.category?.name ? (
                      <span>{item?.category?.name}</span>
                    ) : (
                      <span style={{ marginTop: "-2.2px" }}>
                        {item?.categories?.name}
                      </span>
                    )}
                  </>
                )}
              </span>
              <span className="mp-book-category-tag">
                {item.releaseSchedule != "completed" ? (
                  <span
                    className="ongoingStyle"
                    onClick={() =>
                      navigate(`/search?category=all&status=ongoing`)
                    }
                  >
                    Ongoing
                  </span>
                ) : (
                  <span
                    onClick={() =>
                      navigate("/search?category=all&status=completed")
                    }
                    style={{ cursor: "pointer" }}
                  >
                    {item?.releaseSchedule}
                  </span>
                )}
              </span>
            </div>
            <p className="book_description">
              {item?.Description?.length > 70
                ? `${item?.Description?.substring(0, 130)}`
                : item?.Description}
            </p>

            <div className="book_desc">
              <div className="book_chapter">
                <span className="book_icon">
                  <svg
                    className="mp-book-chapter-icon"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 12 16"
                  >
                    <path d="M3,12h8c0.6,0,1-0.4,1-1V1c0-0.6-0.4-1-1-1H2C0.9,0,0,0.9,0,2v11c0,1.7,1.3,3,3,3h8c0.6,0,1-0.4,1-1 s-0.4-1-1-1H3c-0.6,0-1-0.4-1-1S2.4,12,3,12z" />
                  </svg>
                </span>
                <span className="book_chps">{`${item?.chapters} Chapters`}</span>
              </div>
              <button>
                <span className="mp-book-category-tag d-none dblock-infilterPage">
                  {item.releaseSchedule != "completed" ? (
                    <span
                      className="ongoingStyle"
                      onClick={() =>
                        navigate(`/search?category=all&status=ongoing`)
                      }
                    >
                      Ongoing
                    </span>
                  ) : (
                    <span
                      onClick={() =>
                        navigate("/search?category=all&status=completed")
                      }
                      style={{ cursor: "pointer" }}
                    >
                      {item?.releaseSchedule}
                    </span>
                  )}
                </span>
                <svg
                  onClick={(e) => {
                    e.stopPropagation();

                    if (isLogin) {
                      favoriteBookHandler(item._id);
                    } else {
                      toast.info("Login Required!");
                    }
                  }}
                  className={
                    item?.isLike
                      ? "mp-favorite-heart2 hearthover"
                      : "mp-favorite-heart hearthover"
                  }
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                >
                  <path d="M12 4.248c-3.148-5.402-12-3.825-12 2.944 0 4.661 5.571 9.427 12 15.808 6.43-6.381 12-11.147 12-15.808 0-6.792-8.875-8.306-12-2.944z" />
                </svg>
              </button>
            </div>
          </div>
        </div>
    </>
  );
}
const mapstatetoprops = ({ authReducer, booksReducer, libraryReducer }) => {
  return { authReducer, booksReducer, libraryReducer };
};
export default connect(mapstatetoprops, actions)(MostWantedNovelsMapper);
