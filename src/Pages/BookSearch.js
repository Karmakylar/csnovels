import { useState } from "react";
import { connect } from "react-redux";
import { useNavigate } from "react-router-dom";
import * as actions from "../store/actions/actions";
import StarRatings from "react-star-ratings/build/star-ratings";
import Header from "../Components/Header";
import Datanotexist from "../Assets/Images/Datanotexist.png";
import { imageUrl } from "../config";

const BookSearch = ({ getSearchedBooks, authReducer, booksReducer }) => {
  const navigate = useNavigate();
  const [searchText, setSearchText] = useState("");
  const userId = authReducer?.userData?._id;

  return (
    <>
      <Header />
      <div
        className="container search"
        style={
          booksReducer.searchedBooks.length === 1 ? { height: "500px" } : null
        }
      >
        {/* <div className="search_main">
          <div className="search_input">
            <button href="g_thumb">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                fill="currentColor"
                className="bi bi-search"
                viewBox="0 0 16 16"
              >
                <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z" />
              </svg>
            </button>

            <input
              className="search_inp"
              placeholder="Search anything you like"
              onChange={(f) => {
                setSearchText(f.target.value);
              }}
              onKeyPress={(f) => {
                if (f.charCode === 13) {
                  getSearchedBooks(searchText, userId);
                }
              }}
              value={searchText}
            />
          </div>
        </div> */}

        {/* <Buttons /> */}

        {booksReducer?.searchedBooks?.length > 0 ? (
          booksReducer?.searchedBooks?.map((item, index) => {
            
            const { Title, image, categories } = item;

            return (
              <div
                className="card_main"
                key={index}
                onClick={() => {
                  navigate(`/book`, {
                    replace: false,
                    state: {
                      book: item,
                      bookId: item?._id,
                      bookName: item?.Title,
                      bookImage: `${item?.image?.url}`,
                    },
                  });
                }}
              >
                <div className="card_ m-0">
                  <div className="geeks">
                    <img
                      className="img"
                      src={`${image?.url}`}
                      alt="adoptedsoldier"
                    />
                  </div>
                  <div className="card_content">
                    <button className="adopted_button">
                      {Title} <span className="last_name"></span>
                    </button>
                    <div className="buttons_all">
                      <button className=""> {categories?.name}</button>
                    </div>
                    <div className="rating">
                      <StarRatings
                        starRatedColor="orange"
                        numberOfStars={5}
                        name="rating"
                        rating={
                          item?.totalRates === null ? 0 : item?.totalRates
                        }
                        starDimension="16px"
                        starSpacing="1px"
                      />

                      <p className="">{item?.para}</p>
                    </div>
                    <div className="content">
                      <p className="desc-book">{item?.description}</p>
                    </div>
                  </div>
                </div>
              </div>
            );
          })
        ) : (
          <div className="data-not">
            {/* <h3>Your Search: {searchText} does not match any book.</h3> */}
            <img src={Datanotexist}  alt="DonotExist"/>
          </div>
        )}
      </div>
    </>
  );
};

const mapStateToProps = ({ booksReducer, authReducer }) => {
  return {
    booksReducer,
    authReducer,
  };
};

export default connect(mapStateToProps, actions)(BookSearch);
