import React from "react";
import { useNavigate } from "react-router-dom";
import * as actions from "../store/actions/actions";
import { connect } from "react-redux";
import { toast } from "react-toastify";
// import filledBookmark from "../Assets/filledbookmark.jpg";


function OngoingNovelsMapper({
  item,
  getBook,
  favoriteBookHandler,
  booksReducer,
  authReducer,
  deleteBookMark,
  getBookmarks,
  from
}) {
  const navigate = useNavigate();
  const isLogin = authReducer?.isLogin;


  // const deleteBookMarks = async () => {
  //   await deleteBookMark(item?._id, authReducer.accessToken);
  //   getBookmarks(authReducer?.accessToken);
  // };

  // const [state, setstate] = useState(true);
  // const key = true
  // useEffect(() => {
  //   setdata(item);
  // },[key]);
  // useEffect(() => {
  //   setdata(
  //     booksReducer?.books?.filter((e) => {
  //       return e?._id === item?._id;
  //     })[0]
  //   );
  // }, [state]);
  console.log('item ',item);
  console.log('from ',from);
  

  if (from === "Bookmarks") {
    return (
      <div className="book_main fromBookmarks">
        <div
          className="book_image"
          onClick={() => {
            getBook(item);
            navigate(`/ReadBookPage/${item?.book?._id}/${item.chapter._id}`, {
              replace: false,
              state: {
                bookId: item?.book?._id,
                bookName: item?.book?.Title,
                bookImage: `${item?.book?.Cover?.url}`,
                chapterId: item.chapter?._id
              },
            });
          }}
        >
          <img src={` ${item?.Cover?.url}`} alt="og-book" />
        </div>

        <div className="book_content">
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
                  bookImage: `${item?.book?.Cover.url}`,
                },
              })
              window.scrollTo(0, 0);
            }}>
            {item?.Title}
          </h3>

        </div>

        <div className="book_desc">
          <div className="book_chapter">
            <span className="book_chps">
              {item?.chapters} Chapters
            </span>
          </div>
        </div>
      </div>
    );
  }

  if (from === "Favourited") {
    return (
      <div className="book_main fromFavourited">
        <div
          className="book_image"
          onClick={() => {
            getBook(item);
            navigate(`/ReadBookPage/${item?.book?._id}/${item._id}`, {
              replace: false,
              state: {
                bookId: item?.book?._id,
                bookName: item?.book?.Title,
                bookImage: `${item?.book?.Cover?.url}`,
                chapterId: item.chapter ? item.chapter._id : item._id
              },
            });
            window.scrollTo(0, 0);
          }}
        >
          <img src={` ${item?.Cover?.url}`} alt="og-book" />
        </div>

        <div className="book_content">
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
                  bookImage: `${item?.book?.Cover.url}`,
                },
              })
              window.scrollTo(0, 0);
            }}
          >
            {item?.Title}
          </h3>
        </div>

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
            <span className="book_chps">
              {item?.chapters} Chapters
            </span>
          </div>
          <button>
            <svg
              className={
                item?.isLike ? "mp-favorite-heart2 hearthover" : "mp-favorite-heart hearthover"
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
    )
  }

  if (from === "Recent") {
    console.log('itemRecent ',item)
    return (
      <div className="book_main fromRecent">
        <div
          className="book_image"
          onClick={() => {
            getBook(item?.book);
            navigate(`/ReadBookPage/${item?.book?._id}/${item._id}`, {
              replace: false,
              state: {
                bookId: item?.book?._id,
                bookName: item?.book?.Title,
                bookImage: `${item?.book?.Cover?.url}`,
                chapterId: item.chapter ? item.chapter._id : item._id
              },
            });
            window.scrollTo(0, 0);
          }}
        >
          <img src={` ${item?.book?.Cover?.url}`} alt="og-book" />
        </div>

        <div className="book_content">
          <h3
            className="book_title"
            onClick={() => {
              getBook(item);
              navigate(`/book`, {
                replace: false,
                state: {
                  book: item?.book,
                  bookId: item?.book?._id,
                  bookName: item?.book?.Title,
                  bookImage: `${item?.book?.Cover.url}`,
                },
              })
              window.scrollTo(0, 0);
            }}
          >
            {item?.book?.Title} | {item?.name}
          </h3>
        </div>
      </div>
    )
  }

  else {
    return (
      <div className="book_main fromHome">

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
                bookImage: `${item?.book?.Cover.url}`,
              },
            })
            window.scrollTo(0, 0);
          }}
        >
          <img src={` ${item?.Cover?.url}`} alt="og-book" />
        </div>

        <div className="book_content">
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
                  bookImage: `${item?.book?.Cover.url}`,
                },
              })
              window.scrollTo(0, 0);
            }}>
            {item?.Title}
          </h3>
        </div>

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
            <span className="book_chps">
              {item?.chapters} Chapters
            </span>
          </div>
          <button>
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
                item?.isLike ? "mp-favorite-heart2 hearthover" : "mp-favorite-heart hearthover"
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
    );
  }
}

const mapstatetoprops = ({ authReducer, booksReducer, libraryReducer }) => {
  return { authReducer, booksReducer, libraryReducer };
};
export default connect(mapstatetoprops, actions)(OngoingNovelsMapper);
