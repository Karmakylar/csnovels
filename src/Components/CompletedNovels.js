import React from "react";

import * as actions from "../store/actions/actions";
import { connect } from "react-redux";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

function CompletedNovels({
  item,
  onClick,
  authReducer,
  favoriteBookHandler,
  isLoading,
  getBook,
}) {
  const isLogin = authReducer?.isLogin;
  const navigate = useNavigate();

  return (
    <div
      className="col-lg-2 col-md-3 col-sm-4 completed-books"
      onClick={() => {
        getBook(item);
          navigate(`/book`, {
            replace: false,
            state: {
              book: item,
              bookId: item?._id,
              bookName: item?.Title,
              bookImage: `${item?.Cover?.url}`,
            },
          });
        
      
      }}
    >
      <div className="completed-image-and-text-container">
        <img
          src={`${item?.Cover?.url}`}
          className="og-book-image"
          alt="completed"
        />
        {/* <p className="mp-cs-text">CS</p>
        <p className="completed-book-status">{item.status} </p>
        <p className="completed-book-heading">{item.heading} </p> */}
      </div>
      <p className="completed-book-title">
        {window.screen.width <= 768
          ? `${item?.Title?.substring(0, 25)}...`
          : item?.Title?.length > 35
          ? `${item?.Title?.substring(0, 35)}...`
          : item?.Title}
      </p>
      <div className="mp-book-chapters">
        <svg
          className="mp-book-chapter-icon"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 12 16"
        >
          <path d="M3,12h8c0.6,0,1-0.4,1-1V1c0-0.6-0.4-1-1-1H2C0.9,0,0,0.9,0,2v11c0,1.7,1.3,3,3,3h8c0.6,0,1-0.4,1-1 s-0.4-1-1-1H3c-0.6,0-1-0.4-1-1S2.4,12,3,12z" />
        </svg>
        <p className="mp-book-chapter-number">{`${item?.chapters} Chapters`}</p>
        <svg
          onClick={(e) => {
            e.stopPropagation();
            if (isLogin) {
              favoriteBookHandler(item?._id);
            } else {
              toast.info("Login Required!");
            }
          }}
          className={item?.isLike ? "mp-favorite-heart2" : "mp-favorite-heart"}
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
        >
          <path d="M12 4.248c-3.148-5.402-12-3.825-12 2.944 0 4.661 5.571 9.427 12 15.808 6.43-6.381 12-11.147 12-15.808 0-6.792-8.875-8.306-12-2.944z" />
        </svg>
      </div>
    </div>
  );
}

const mapstatetoprops = ({ authReducer, booksReducer, libraryReducer }) => {
  return { authReducer, booksReducer, libraryReducer };
};
export default connect(mapstatetoprops, actions)(CompletedNovels);
