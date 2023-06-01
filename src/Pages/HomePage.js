import React, { useEffect } from "react";
import Header from "../Components/Header";
import { useState } from "react";

import {
  faThLarge,
  faBook,
  faAngleRight,
} from "@fortawesome/free-solid-svg-icons";
import Footer from "../Components/Footer";
import BOOK_CARD from "../Assets/Images/book-card.png";
import MostWantedNovelsMapper from "../Components/MostWantedNovelsMapper";
import OngoingNovelsMapper from "../Components/OngoingNovelsMapper";
import Top10Mapper from "../Components/Top10Mapper";
import SliderComp from "../Components/SliderComp";
import { connect, useDispatch } from "react-redux";
import * as actions from "../store/actions/actions";
import THREE_LINES from "../Assets/Images/three-lines.png";

import URBAN from "../Assets/Images/urban.png";
import SCIFI from "../Assets/Images/scifi.png";
import FANTASY from "../Assets/Images/fantasy.png";
import SLIDE_IMAGE_1 from "../Assets/Images/slide-image.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import moment from "moment";
import "../Styles/Mirza.css";
import queryString from "query-string";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import { apiUrl } from "../config";
import * as types from "../store/actions/actionType";

import updateBusiness from "../Business/UpdatesBusiness"
import { toast } from "react-toastify";


const HomePage = ({
  authReducer,
  booksReducer,
  favoriteThisBook,
  getAllBooks,
}) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();
  const accessToken = authReducer?.accessToken;
  const userId = authReducer?.userData?._id;
  const [isLoading, setIsLoading] = useState(false);

  const freeBookOfWeek = {
    _id: 1,
    title:
      "Book Title Goes Here On Even Two Lines Test Test Test Test Test Test Test Two Lines Even Test Test Test Test Test Test Test",
    category: "urban",
    heading: "great l",
    chapters: 3471,
    status: "completed",
    image: BOOK_CARD,
    description:
      "Lorem ipsum is a placeholder text commonly used to demonstrate the visual form of a document or a typeface without relying on meaningful content. Lorem ipsum may be used as a placeholder before final copy is available  Lorem ipsum may be used as a placeholder before final copy is available..",
  };

  const [mostPopular, setMostPopular] = useState([]);
  const [ongoing, setOngoing] = useState([]);
  const [completed, setCompleted] = useState([]);
  const [top10, setTop10] = useState([]);
  const [recent, setRecent] = useState([]);

  const images = [
    {
      _id: 1,
      image: SLIDE_IMAGE_1,
    },
    {
      _id: 2,
      image: SLIDE_IMAGE_1,
    },
    {
      _id: 3,
      image: SLIDE_IMAGE_1,
    },
  ];

  useEffect(() => {
    const parsed = queryString.parse(location.search);
    if (Object.keys(parsed).length === 0) return;
    const parsed1 = JSON.parse(parsed.data);
    // console.log(parsed1, "klllllllllllllllllllllllllllllllll");
    dispatch({
      type: types.LOGIN_SUCCESS,
      payload: parsed1,
    });
  }, []);
  const favoriteBookHandler = (id) => {
    const data = {
      bookId: id,
    };

    setIsLoading(true);
    favoriteThisBook(data, accessToken, "favoritedBooks");
  };
  const [recentchapter, setrecentchapter] = useState([]);
  const getrecentchapters = async () => {
    const res = await axios.get(`${apiUrl}/chapter/recentlyCreateChapters`);
    setrecentchapter(res.data.data);
  };
  console.log(recentchapter,"recentchapter");
  useEffect(() => {
    setIsLoading(true);
    getrecentchapters();
    getAllBooks(userId, accessToken);
  }, [authReducer.userData]);

  useEffect(() => {
    let mostPopularNovels = booksReducer?.books?.filter(
      (ele) => ele?.isPopular
    );
    let ongoingNovels = booksReducer?.books?.filter(
      (ele) => ele?.releaseSchedule !== "completed"
    );
    let completedNovels = booksReducer?.books?.filter(
      (ele) => ele?.releaseSchedule === "completed"
    );
    let top10Books = booksReducer?.books?.sort(
      (a, b) => b?.avgRate - a?.avgRate
    );
    let recentArrivedBooksDateWiseSorted = booksReducer?.books?.sort(
      (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
    );
    let recent5Arrived = [];
    for (let i = 0; i < recentArrivedBooksDateWiseSorted?.length; i++) {
      if (i < 5) {
        recent5Arrived.push(recentArrivedBooksDateWiseSorted[i]);
      }
    }
    setMostPopular(mostPopularNovels);
    setCompleted(completedNovels);
    setRecent(recent5Arrived);
    setOngoing(ongoingNovels);
    setTop10(top10Books);
  }, [booksReducer.books, booksReducer.favoritedBooks, authReducer.userData]);
  useEffect(() => { }, [mostPopular, ongoing, completed, recent, top10]);
  function groupArrayOfObjects(list, key) {
    return list.reduce(function (rv, x) {
      (rv[x[key]] = rv[x[key]] || []).push(x);
      return rv;
    }, {});
  }
  groupArrayOfObjects(recentchapter, "book");

  return (
    <>
      <Header />
      {/* Slider  */}
      <SliderComp images={images} />
      <div className="container mainContainerHome layout-content oth-ch">
        {/* Most Popular  */}
        {mostPopular?.length > 0 && (
          <div className="books_sec most_popular homePage">
            <div className="container-1240">
              <div className="row align-items-center no-gutters sec-heading-wraper">
                <div className="col-md-8">
                  <h3 className="sec-heading">Most Popular</h3>
                </div>
                <div className="col-md-4">
                  <div className="btn-box">
                  <button
                  className="mp-books-view-all"
                  onClick={() => {
                    navigate("/search", { state: { sortBy: "popular" } });
                  }}
                >
                  VIEW ALL {<FontAwesomeIcon icon={faAngleRight} />}
                </button>
                  </div>
                </div>
              </div>
              <div className="books_wraper most">
                {mostPopular?.map((item, idx) =>
                  idx < 3 ? (
                    <MostWantedNovelsMapper
                      key={idx}
                      item={item}
                      isLoading={isLoading}
                      favoriteBookHandler={favoriteBookHandler}
                    />
                  ) : null
                )}
              </div>
            </div>

          </div>
        )}

        {/* Ongoing Novels  */}
        {ongoing?.length > 0 && (
          <div className="books_sec ongoing_novel" id="ongoing">
            <div className="container-1240">
            <div className="row align-items-center no-gutters sec-heading-wraper">
              <div className="col-md-8">
                <h3 className="sec-heading">ONGOING NOVELS</h3>
              </div>
              <div className="col-md-4">
                <div className="btn-box">
                  <button
                    className="view-all"
                    onClick={() => {
                      navigate("/search", { state: { contentStatus: "ongoing" } });
                    }}
                  >
                    VIEW ALL <FontAwesomeIcon icon={faAngleRight} />
                  </button>
                </div>
              </div>
            </div>
              <div className="books_wraper">
                {ongoing?.map((item, idx) =>
                  idx < 6 ? (
                    <OngoingNovelsMapper
                      key={idx}
                      item={item}
                      isLoading={isLoading}
                      favoriteBookHandler={favoriteBookHandler}
                      from="homepage"
                    />
                  ) : null
                )}
              </div>
            </div>

          </div>
        )}


        {/* New Book Cover Design Start AYUB */}

        {/* {
          ongoing?.length > 0 &&
          <div className="books_sec">
            <div className="container-1240">
              <div className="row no-gutters align-items-center sec-heading-wraper">
                <div className="col-md-8">
                  <h2 className="sec-heading">ONGOING NOVELS</h2>
                </div>
                <div className="col-md-4">
                  <div className="btn-box">
                    <button
                      onClick={() => navigate("/search", { state: { contentStatus: "ongoing" } })}
                    >View All <span><i className="fa fa-angle-right"></i></span></button>
                  </div>
                </div>
              </div>
              <div className="books_wraper">
                {ongoing?.map((item, idx) =>
                  idx < 6 ? (
                    <div className="book_main" key={item._id}
                      onClick={() => {
                        actions.getBook(item);
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
                      <div className="book_image">
                        <img src={item.Cover.url} alt="Book_Image" />
                      </div>
                      <div className="book_content">
                        <h3 className="book_title">{item.Title}</h3>
                        <div className="book_desc">
                          <div className="book_chapter">
                            <span><svg class="mp-book-chapter-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 12 16"><path d="M3,12h8c0.6,0,1-0.4,1-1V1c0-0.6-0.4-1-1-1H2C0.9,0,0,0.9,0,2v11c0,1.7,1.3,3,3,3h8c0.6,0,1-0.4,1-1 s-0.4-1-1-1H3c-0.6,0-1-0.4-1-1S2.4,12,3,12z"></path></svg></span>
                            <span>{item.chapters} Chapters</span>
                          </div>
                          <button
                            onClick={(e) => {
                              // e.stopPropagation();
                              if (authReducer?.isLogin) {
                                favoriteBookHandler(item._id);
                              } else {
                                toast.info("Login Required!");
                              }
                            }}
                          >
                            <svg class="mp-favorite-heart hearthover" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M12 4.248c-3.148-5.402-12-3.825-12 2.944 0 4.661 5.571 9.427 12 15.808 6.43-6.381 12-11.147 12-15.808 0-6.792-8.875-8.306-12-2.944z"></path></svg>
                          </button>
                        </div>
                      </div>
                    </div>
                  ) : null
                )}
              </div>
            </div>
          </div>
        } */}

        {/* <div className="books_wraper">
          <div className="book_main">
            <div className="book_image">
              <img src="https://cannedsplam.s3.amazonaws.com/1668006774182No-1-Supreme-Warrior.jpg" alt="Book_Image" />
            </div>
            <div className="book_content">
              <h3 className="book_title">No. 1 Supreme Warrior</h3>
              <div className="book_desc">
                <div className="book_chapter">
                  <span><svg class="mp-book-chapter-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 12 16"><path d="M3,12h8c0.6,0,1-0.4,1-1V1c0-0.6-0.4-1-1-1H2C0.9,0,0,0.9,0,2v11c0,1.7,1.3,3,3,3h8c0.6,0,1-0.4,1-1 s-0.4-1-1-1H3c-0.6,0-1-0.4-1-1S2.4,12,3,12z"></path></svg></span>
                  <span>3145 Chapters</span>
                </div>
                <button>
                  <svg class="mp-favorite-heart hearthover" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M12 4.248c-3.148-5.402-12-3.825-12 2.944 0 4.661 5.571 9.427 12 15.808 6.43-6.381 12-11.147 12-15.808 0-6.792-8.875-8.306-12-2.944z"></path></svg>
                </button>
              </div>
            </div>
          </div>
        </div> */}
        {/* New Book Cover End */}


        {/* Top Ranking */}
        <div className="section-div top-10-section top_ranking ">
          <p className="section-heading">TOP 10 RANKING</p>
          <hr
            className="hrTopRanking"
            style={{ height: "1px", backgroundColor: "rgba(0,0,0,0.02)" }}
          />

          {/* Top 10 & Recent Arrivals  */}
          <div className="row">
            <div className="col-md-8 col-sm-12 tp-ranking">
              <p className="section-heading-inner">TOP 10</p>
              <div className="books-container">
                {top10?.slice(0, 10)?.reverse()?.map((ele, idx) => {
                  return (
                    <Top10Mapper key={idx} item={ele} index={idx} />
                  )
                })}
              </div>
            </div>

            <div className="col-md-4 p-0 recent_books">
              <p className="section-heading-inner sec-inner-heading2">
                RECENT ARRIVALS
              </p>
              {/* <h3 className="sec-heading">
                RECENT ARRIVALS
              </h3> */}

              <div className="row-425 row-426 recent-width recent-books-container recent">
                {recent.map((ele, idx) => (
                  <Top10Mapper key={idx} item={ele} index={idx} />
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Free Book  */}
        <div className="free-book-section fbs" style={{ position: "relative" }}>
          <div className="timerMainMobDiv">
            <p className="free-book-label">Free Book of The Week</p>
            <div className="timer-div timerDivMob">
              <p className="count-label">00</p>
              <p className="day-label">D</p>
              <p className="count-label">00</p>
              <p className="day-label">H</p>
              <p className="count-label">00</p>
              <p className="day-label">M</p>
            </div>
          </div>
          <div className="gradient-border free__book">
            <div className="free-book-rectangle grounded-radiants">
              <div className="timer-and-free-book-details">
                {/* Timer  */}
                <div className="timer-div timerDivDesktop">
                  <p className="count-label">00</p>
                  <p className="day-label">D</p>
                  <p className="count-label">00</p>
                  <p className="day-label">H</p>
                  <p className="count-label">00</p>
                  <p className="day-label">M</p>
                </div>
                {/* Book details  */}
                <div className="d-flex flex-row">
                  <span className="gradient-blue-ball" />
                  <span className="gradient-green-ball" />
                  <span className="gradient-red-ball" />
                  <div className="three-lines">
                    <img
                      src={THREE_LINES}
                      className="three-lines-image"
                      alt="three_lines_image"
                    />
                  </div>

                  <div className="freeBookContentMain freebook-box">
                    <div className="free-book-image">
                      <div>
                        <p className="free-book-status">
                          {/* {freeBookOfWeek.status}{" "} */}
                        </p>
                        <p className="free-book-heading">
                          {freeBookOfWeek.heading}
                        </p>
                        <p className="mp-cs-text">CS</p>
                      </div>
                      <img
                        src={freeBookOfWeek.image}
                        className="free-book-image"
                        alt="free_book_image"
                      />
                    </div>

                    <div className="free-book-details ">
                      <h3 className="book-h2">EASTERN FANTASY</h3>
                      <p className="free-book-title">
                        {window.screen.width <= 768
                          ? `${freeBookOfWeek.title.substring(0, 30)}...`
                          : freeBookOfWeek.title.length > 50
                            ? `${freeBookOfWeek.title.substring(0, 50)}...`
                            : freeBookOfWeek.title}
                      </p>
                      <p className="free-book-category">
                        <span>
                          <FontAwesomeIcon icon={faThLarge} />{" "}
                          {freeBookOfWeek.category}
                        </span>
                        <span>{freeBookOfWeek.status}</span>
                      </p>
                      <p className="free-book-description">
                        {freeBookOfWeek.description.length > 150
                          ? `${freeBookOfWeek.description.substring(0, 150)}...`
                          : freeBookOfWeek.description}
                      </p>
                      <p className="stars st">
                        <i className="fa-solid fa-star"></i>
                        <i className="fa-solid fa-star"></i>
                        <i className="fa-solid fa-star"></i>
                        <i className="fa-solid fa-star"></i>
                        <i className="fa-sharp fa-solid fa-star-half-stroke"></i>
                        <p>4.2</p>
                      </p>

                      <div className="star-ratings free-books">
                        <span class="star"><svg viewBox="0 0 51 48" class="widget-svg"><path class="star" d="m25,1 6,17h18l-14,11 5,17-15-10-15,10 5-17-14-11h18z"></path></svg></span>
                        <span class="star"><svg viewBox="0 0 51 48" class="widget-svg"><path class="star" d="m25,1 6,17h18l-14,11 5,17-15-10-15,10 5-17-14-11h18z"></path></svg></span>
                        <span class="star"><svg viewBox="0 0 51 48" class="widget-svg"><path class="star" d="m25,1 6,17h18l-14,11 5,17-15-10-15,10 5-17-14-11h18z"></path></svg></span>
                        <span class="star"><svg viewBox="0 0 51 48" class="widget-svg"><path class="star" d="m25,1 6,17h18l-14,11 5,17-15-10-15,10 5-17-14-11h18z"></path></svg></span>
                        <span class="star"><svg viewBox="0 0 51 48" class="widget-svg"><path class="star" d="m25,1 6,17h18l-14,11 5,17-15-10-15,10 5-17-14-11h18z"></path></svg></span>
                        <span class="star-text">4.5</span>
                      </div>

                      <div className="free-chapters-div ic-align">
                        <p className="free-book-chapters">
                          <FontAwesomeIcon icon={faBook} />{" "}
                          {`${freeBookOfWeek.chapters} Chapters`}
                        </p>
                        <p className="heart-ic">
                          <i className="fa-regular fa-heart"></i>
                        </p>
                        <div className="read-div mt-1">
                          <button className="text-center read-p">READ <span>NOW</span></button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Categories  */}
        <div className="book-categories-section">
          <div className="row">
            <div className="col-md-4 col-sm-6 category">
              <div
                onClick={(e) => {
                  e.preventDefault();
                  navigate("/search?category=urban", { state: { genre: "urban" } });
                }}
                style={{
                  background: `linear-gradient( rgba(0, 0, 0, 0.2), rgba(0, 0, 0, 0.2) ), url(${URBAN})`,
                }}
                className="book-category-image"
              >
                <p className="book-category-label">urban</p>
              </div>
            </div>

            <div className="col-md-4 col-sm-6 category">
              <div
                onClick={(e) => {
                  e.preventDefault();
                  navigate("/search?category=sci-fi", { state: { genre: "sci-fi" } });
                }}
                style={{
                  background: `linear-gradient( rgba(0, 0, 0, 0.2), rgba(0, 0, 0, 0.2) ), url(${SCIFI})`,
                }}
                className="book-category-image"
              >
                <p className="book-category-label">Sci-Fi</p>
              </div>
            </div>

            <div className="col-md-4 col-sm-6 category">
              <div
                onClick={(e) => {
                  e.preventDefault();
                  navigate("/search?category=fantasy", { state: { genre: "fantasy" } });
                }}
                style={{
                  background: `linear-gradient( rgba(0, 0, 0, 0.2), rgba(0, 0, 0, 0.2) ), url(${FANTASY})`,
                }}
                className="book-category-image"
              >
                <p className="book-category-label">Fantasy</p>
              </div>
            </div>
          </div>
        </div>

        {/* Completed Novels  */}
        <div className="complete_novels" id="finished">
          <div className="books_sec">
            <div className="container-1240">
          <div className="row align-items-center no-gutters sec-heading-wraper">
            <div className="col-md-8">
              <h3 className="sec-heading">COMPLETED NOVELS</h3>
            </div>
            <div className="col-md-4">
              <div className="btn-box">
                {completed?.length > 0 && (
                  <button
                    className="view-all"
                    onClick={() => {
                      navigate("/search", {
                        state: { contentStatus: "completed" },
                      });
                    }}
                  >
                    VIEW ALL <FontAwesomeIcon icon={faAngleRight} />
                  </button>
                )}
              </div>
            </div>
          </div>
              <div className="books_wraper">
                {completed?.length > 0 && window.screen.width > 1024 ? (
                  completed?.map((item, idx) =>
                    idx < 6 ? (
                      <OngoingNovelsMapper
                        key={idx}
                        item={item}
                        isLoading={isLoading}
                        favoriteBookHandler={favoriteBookHandler}
                      />
                    ) : null
                  )
                ) : completed?.length > 0 && window.screen.width < 1024 ? (
                  completed?.map((item, idx) => (
                    <OngoingNovelsMapper
                      key={idx}
                      item={item}
                      isLoading={isLoading}
                      favoriteBookHandler={favoriteBookHandler}
                    />
                  ))
                ) : (
                  <h4 style={{ textAlign: "center" }}>No Novels Completed Yet</h4>
                )}
              </div>
            </div>
          </div>
        </div>
        {/* Completed Novels */}


        {/* Recent Chapter Updates  */}
        <p className="recent-updates-label h-d" id="recentbooks">
          Recent Chapter Updates
          <p className="table-p">TAP TO BEGIN READING</p>
        </p>


        <div className="books-table mt-3 mb-5">
          <table className="table recent-update-table table-striped rec-chap-table">
            <thead className="table-header">
              <tr>
                <th
                  scope="col"
                  className="pl-4 border-0 table-header-labels th-1"
                >
                  Book
                </th>
                <th scope="col" className="border-0 table-header-labels th-2">
                  Chapter
                </th>
                <th scope="col" className="border-0 table-header-labels th-2">
                  Time
                </th>
                <th scope="col" className="border-0"></th>
              </tr>
            </thead>
            <tbody>

              {recentchapter?.map((item, idx) => (
                // <tr key={idx} className={(idx % 2 !== 0 && "color-border"}>
                <tr key={idx} className={`${idx % 2 !== 0 && "color-border"}`}>

                  <td className="border-0 ">
                    <p className="table-labels pl-4">{item?.book?.Title} </p>
                  </td>
                  <td className="border-0 ">
                    <p className="table-labels">
                      {item?.name.split("Chapter")[1]}{" "}
                    </p>
                  </td>
                  <td className="border-0 ">
                    <p className="table-labels">
                      {updateBusiness.formatTimeToLocal(item.createdAt)}
                    </p>
                  </td>
                  <td className="border-0 read-div">
                    <p className="text-center read-p">
                      <a
                        onClick={async () => {
                          // await getChapterContent(
                          //   item?._id,
                          //   item.book?._id,
                          //   authReducer?.userData?._id,
                          //   authReducer?.accessToken
                          // );

                          navigate(
                            `/ReadBookPage/${item.book?._id}/${item._id}`,
                            {
                              replace: false,
                              state: {
                                bookName: item.book?.Title,
                                bookImage: `${item.book?.Cover?.url}`,
                                currchapter: item,
                              },
                            }
                          );
                        }}
                      >
                        READ
                      </a>
                    </p>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>


      </div>
      <Footer />
      {/* </div> */}
    </>
  );
};

const mapstatetoprops = ({ authReducer, booksReducer, libraryReducer }) => {
  return { authReducer, booksReducer, libraryReducer };
};
export default connect(mapstatetoprops, actions)(HomePage);
