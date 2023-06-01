import React, { useEffect, useState } from "react";
import Header from "../Components/Header";
import StarRatings from "react-star-ratings";
import moment from "moment";
import Footer from "../Components/Footer";
import { connect } from "react-redux";
import { useLocation, useNavigate, useHistory } from "react-router-dom";
import ReviewsMapper from "../Components/ReviewsMapper";
import * as actions from "../store/actions/actions";
import { toast } from "react-toastify";
import Loader from "react-loader-spinner";
import axios from "axios";
import OngoingNovelsMapper from "../Components/OngoingNovelsMapper";
import ReactPaginate from "react-paginate";
import BookBusiness from "../Business/BookBusiness";

import { getAllBooks } from "../store/actions/actions";

import pencilIcon from '../Assets/pen-icon.png'
import quesIcon from '../Assets/question-icon.png'

import { baseUrl } from "../config";

function Books({
  authReducer,
  booksReducer,
  getChapterTitles,
  postReview,
  favoriteThisBook,
  getsBook,
}) {
  const location = useLocation();
  const navigate = useNavigate();
  const book = location?.state?.book;
  const accessToken = authReducer?.accessToken;
  const bookId = location.state.book?._id;
  const [data, setdata] = useState();
  const [reverse, setReverse] = useState(false);
  const [chapterTitles, setChaptertitles] = useState([]);
  const [review, setReview] = useState("");
  const isLogin = authReducer?.isLogin;
  const [rating, setRating] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [Loading, setLoading] = useState(false);
  const [avgRate, setavgRate] = useState(0);
  const [page, setpage] = useState(1);
  const [chapt, setchapt] = useState([]);
  const [recommended, setrecommended] = useState([]);

  const filterRecommended = () => {
    const fiolteredBooks = booksReducer?.books.filter((e) => {
      return e?.category?.name === book.category?.name;
    })
    setrecommended(fiolteredBooks)
  }

  
  let CHECK = 0;
  const [allReviews, setAllReviews] = useState([]);

  useEffect(() => {
      filterRecommended();
    // setdata(booksReducer.books.filter(e=>{return e._id==bookId}))
    // if (book.totalRates) {
      //   book.avgRate = book.totalRates;
      // }
    localStorage.setItem("book_data", JSON.stringify(location.state));
    setLoading(true);

    getChapterTitles(bookId, accessToken).then((e) => {
      setLoading(false);

      setChaptertitles(e);

      localStorage.setItem("chaptersTitles", JSON.stringify(e));
    });
    getbook();
    window.scroll(0, 0);
  }, []);

  useEffect(()=>{
    getAllBooks();
  },[])

  const getbook = async () => {
    const response = await axios.get(
      `${baseUrl}/api/book/getSingleBook?book=${bookId}&user=${authReducer?.userData?._id}`
    );
      console.log('response getbook  ',response.data.data);
    setdata(response.data.data);
  };
  useEffect(() => {
    setAllReviews(data?.comments);
    setavgRate(data?.avgRate);
  }, [data]);

  useEffect(() => {
    setchapt(chapterTitles.slice(0, 20));
  }, [chapterTitles]);

  var pageCount;
  const value = parseInt(chapterTitles.length / 20);

  if (chapterTitles.length == value * 10) {
    pageCount = value;
  } else {
    pageCount = parseInt(chapterTitles.length / 20) + 1;
  }

  //Table of Content False Page
  if (
    //Table of contents will list a false page if the chapter list is divisible by 20 (TASIL has 4360 chapters so it's exactly 218 pages but it has a 219th page for chapter list.)
    (chapterTitles.length / 20) % 2 ==
    0
  ) {
    pageCount = pageCount - 1;
  }

  const [text, setText] = useState("");
  useEffect(() => {
    if (text.length > 0) {
      setTimeout(function () {
        const filteredData = chapterTitles.filter((item) => {
          return item.name == `Chapter ${text}`;
        });

        setchapt(filteredData);
      }, 1000);
    } else {
      getChapterTitles(bookId, accessToken).then((e) => {
        setChaptertitles(e);
      });
    }
  }, [text]);

  const handlePageClick = (e) => {
    const selectedPage = e.selected;
    setpage(selectedPage + 1);
  };

  useEffect(() => {
    setchapt(chapterTitles.slice((page - 1) * 20, (page - 1) * 20 + 20));
  }, [page]);

  //   useEffect(()=>{
  //     getChapterContent(
  //       booksReducer?.chaptersTitles[0]?._id,
  //       book?._id,
  //       authReducer?.userData?._id,
  //       authReducer?.accessToken
  //     );

  // },[booksReducer.chaptersTitles])

  const _onPressCommentSend = () => {
    const data = {
      bookId: bookId,
      comment: review,
      rate: rating,
    };
    setIsLoading(true);

    postReview(data, accessToken, onSuccessPostReview).then(() => {
      getbook();
      setIsLoading(false);
    });
  };

  const onSuccessPostReview = () => {
    const newReview = {
      bookId: bookId,
      comment: review,
      rate: rating,
      userId: {
        profile_img: {
          name: authReducer?.userData?.profilePic,
        },

        username:
          authReducer?.userData?.username || authReducer?.userData?.firstName,
      },
    };
    console.log('userId ',newReview);
    let copyReviews = [...allReviews];
    copyReviews[copyReviews.length] = newReview;

    // setAllReviews(copyReviews);
    setReview("");
    setRating(0);
  };

  // useEffect(() => {
  //   setdata(
  //     booksReducer.books.filter((e) => {
  //       return e._id == bookId;
  //     })[0]
  //   );
  // }, [booksReducer.books]);
  //   useEffect(()=>{
  //     var total = 0;
  //     var count = 0;
  // allReviews.map(e=>{
  //   total += e.rate;
  //   count++;

  // })
  // if(count !=0){
  //   // setavgRate(total/count)
  // }

  //   },[allReviews,booksReducer.book])

  // useEffect(()=>{},[data])
  const favoriteBookHandler = (item) => {
    const data = {
      bookId: item,
    };

    favoriteThisBook(data, accessToken, "favoritedBooks");
  };

  var sameBook_recentChapters = undefined;
  if (booksReducer?.recentChapters) {
    sameBook_recentChapters = booksReducer?.recentChapters.filter((item) => {
      if (item?.book?.Title === book?.Title) {
        return item;
      }
    });
  }

  let cursorPointer = {
    cursor: "pointer",
  };

  console.log("read .data",data );

  return (
    <>
      <Header />
      {!Loading ? (
        <div className="book-page layout-content">
          <div className="container  container_book_desc singleBook">
            <div className="book-desc-box books_page">
              <div className="row">
                <div className="col-md-3 col-sm-3 col-3 book-img-col">
                  <img
                    src={`${
                      book?.Cover?.url ? book?.Cover?.url : book?.image?.url
                    }`}
                    className="book-image"
                    alt="Cover pic"
                  ></img>
                </div>
                <div className="col-md-9 col-sm-9 col-9 bookPgTopLeftCont">
                  <h1 className="book-head"> {book?.Title}</h1>
                  <div className="row">
                    <div className="col-lg-11 col-md-9 box-desc-row desktop_BookDesp desktop">
                      <div
                        className="urban dFlexCenter"
                        style={cursorPointer}
                        onClick={() => navigate("/search", { state: book })}
                      >
                        <span>
                          <svg
                            className="svg-inline-header-cat-icon"
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24px 24px"
                          >
                            <path
                              className="st0"
                              d="M3,0h4.2c1.7,0,3.1,1.5,3.1,3.1v4.2c0,1.7-1.5,3.1-3.1,3.1H3c-1.6,0.1-3.1-1.2-3.1-2.9V3.1C-0.1,1.5,1.4,0,3,0 z"
                            ></path>
                            <path
                              className="st0"
                              d="M16.7,0h4.2c1.7,0,3.2,1.5,3.2,3.1v4.2c0,1.7-1.5,3.1-3.1,3.1h-4.2c-1.7,0-3.1-1.5-3.1-3.1V3.1 C13.6,1.5,14.9,0,16.7,0z"
                            ></path>
                            <path
                              className="st0"
                              d="M3,13.7h4.2c1.7,0,3.1,1.5,3.1,3.1v4.2c0,1.7-1.5,3.1-3.1,3.1H3c-1.6,0.1-3.1-1.3-3.1-2.9v-4.2 C-0.1,15,1.4,13.7,3,13.7z"
                            ></path>
                            <path
                              className="st0"
                              d="M16.7,13.7h4.2c1.7,0,3.1,1.5,3.1,3.1v4.2c0,1.7-1.5,3.1-3.1,3.1h-4.2c-1.7,0-3.1-1.5-3.1-3.1v-4.2 C13.6,15,14.9,13.7,16.7,13.7z"
                            ></path>
                          </svg>
                        </span>
                        <span className="head">{book?.category?.name || book?.categories?.name}</span>
                      </div>
                      <div className="day">
                        <span>
                          <span className="icon">
                            {/* <img src={pencilIcon} alt='pencil icon' /> */}
                            <i className='fas fa-clock'></i>
                          </span>
                          <span className="head"> Last Updated: {BookBusiness.formatTimeToLocal(book?.updatedAt)}</span>
                          <span className="icon">
                            {/* <img src={quesIcon} alt='pencil icon' /> */}
                              <i class="fas fa-question-circle"></i>
                          </span>
                        </span>
                      </div>
                      <div className="chapter">
                        <span>
                          {" "}
                          <svg
                            className="mp-book-chapter-icon"
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 12 16"
                          >
                            <path d="M3,12h8c0.6,0,1-0.4,1-1V1c0-0.6-0.4-1-1-1H2C0.9,0,0,0.9,0,2v11c0,1.7,1.3,3,3,3h8c0.6,0,1-0.4,1-1 s-0.4-1-1-1H3c-0.6,0-1-0.4-1-1S2.4,12,3,12z"></path>
                          </svg>
                        </span>
                        <span className="head">{`${book?.chapters} Chapters`}</span>
                      </div>
                    </div>

                    <div className="col-md-1"></div>
                  </div>
                  <div className="desc-box-ratings">
                    <span className="stars">
                      {/* <i className="fas fa-star"></i>
                    <i className="fas fa-star"></i>
                    <i className="fas fa-star"></i>
                    <i className="fas fa-star"></i>
                    <i className="fas fa-star"></i> */}
                    {
                      console.log('book ',book)
                    }
                      <StarRatings
                        // rating={data?.avgRate}
                        rating={book?.avgRate ? book?.avgRate : data?.avgRate}
                        starRatedColor="orange"
                        numberOfStars={5}
                        starSpacing="2px"
                        name="rating"
                      />
                    </span>
                    <span className="rate">{`${
                        book?.avgRate ? 
                        (
                          parseInt(book?.avgRate) +
                          "." +
                          parseInt((book?.avgRate % 1).toFixed(1).substring(2))
                        )
                        :
                        (
                          parseInt(data?.avgRate) +
                          "." +
                          parseInt((data?.avgRate % 1).toFixed(1).substring(2))
                        )
                    }`}</span>
                    {/* <span className="rating">{`${data?.comments?.length}  RATINGS`}</span> */}
                    <span className="rating">{`${ book?.comments ? book?.comments?.length : data?.comments?.length }  RATINGS`}</span>
                  </div>

                  <div className="read-buttons">
                    {
                      <button className="read-btn">
                        <a
                          href="/#"
                          onClick={async (e) => {
                            e.preventDefault();
                            e.stopPropagation();

                            if (chapterTitles[0]?._id != undefined) {
                              navigate(
                                `/ReadBookPage/${book?._id}/${chapterTitles[0]?._id}`,
                                {
                                  replace: false,
                                  state: {
                                    chapterTitles: chapterTitles[0]?._id,
                                    bookId: book?._id,
                                    bookName: book?.Title,
                                    bookImage: `${
                                      book?.Cover
                                        ? book?.Cover?.url
                                        : book?.image?.url
                                    }`,
                                    chapterTitles: chapterTitles,
                                    data_navigation: location.state,
                                  },
                                }
                              );
                            } else {
                              toast.info("Invalid chapter Id");
                            }
                          }}
                        >
                          Read now
                        </a>
                      </button>
                    }

                    <span
                      className="heart"
                      onClick={() => {
                        if (!authReducer.isLogin) {
                          toast.info("Login Required!");
                        } else {
                          favoriteBookHandler(book._id);
                          setdata((prevState) => ({
                            ...prevState,
                            isLike: !prevState?.isLike,
                          }));
                        }
                      }}
                    >
                      {data?.isLike ? (
                        <i
                          className="fa-solid fa-heart"
                          style={{ color: "red" }}
                        ></i>
                      ) : (
                        <i className="far fa-heart"></i>
                      )}
                    </span>
                  </div>
                </div>
                {/* <div className="col-md-12 col-12 mobile_BookDesp">
                  <div className="col-lg-8 col-md-9 col-12 box-desc-row">
                    <div className="urban dFlexCenter ">
                      <span className="spanSvgMobDesc">
                        <svg
                          className="svg-inline-header-cat-icon"
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 24px 24px"
                        >
                          <path
                            className="st0"
                            d="M3,0h4.2c1.7,0,3.1,1.5,3.1,3.1v4.2c0,1.7-1.5,3.1-3.1,3.1H3c-1.6,0.1-3.1-1.2-3.1-2.9V3.1C-0.1,1.5,1.4,0,3,0 z"
                          ></path>
                          <path
                            className="st0"
                            d="M16.7,0h4.2c1.7,0,3.2,1.5,3.2,3.1v4.2c0,1.7-1.5,3.1-3.1,3.1h-4.2c-1.7,0-3.1-1.5-3.1-3.1V3.1 C13.6,1.5,14.9,0,16.7,0z"
                          ></path>
                          <path
                            className="st0"
                            d="M3,13.7h4.2c1.7,0,3.1,1.5,3.1,3.1v4.2c0,1.7-1.5,3.1-3.1,3.1H3c-1.6,0.1-3.1-1.3-3.1-2.9v-4.2 C-0.1,15,1.4,13.7,3,13.7z"
                          ></path>
                          <path
                            className="st0"
                            d="M16.7,13.7h4.2c1.7,0,3.1,1.5,3.1,3.1v4.2c0,1.7-1.5,3.1-3.1,3.1h-4.2c-1.7,0-3.1-1.5-3.1-3.1v-4.2 C13.6,15,14.9,13.7,16.7,13.7z"
                          ></path>
                        </svg>
                      </span>
                      <span className="head">{book?.category?.name}</span>
                    </div>
                    <div className="day">
                      <span>
                        <i className="fas fa-pencil-alt"></i>
                        <span className="head">5 CH. / Day </span>
                        <i className="fas fa-question-circle"></i>
                      </span>
                    </div>
                    <div className="chapter">
                      <span>
                        {" "}
                        <svg
                          className="mp-book-chapter-icon"
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 12 16"
                        >
                          <path d="M3,12h8c0.6,0,1-0.4,1-1V1c0-0.6-0.4-1-1-1H2C0.9,0,0,0.9,0,2v11c0,1.7,1.3,3,3,3h8c0.6,0,1-0.4,1-1 s-0.4-1-1-1H3c-0.6,0-1-0.4-1-1S2.4,12,3,12z"></path>
                        </svg>
                      </span>
                      <span className="head">{`${book?.chapters} Chapters`}</span>
                    </div>
                  </div>
                </div> */}
                <div className="col-12 BookDes_mobile">
                      <div
                        className="urban dFlexCenter"
                        style={cursorPointer}
                        onClick={() => navigate("/search", { state: book })}
                      >
                        <span>
                          <svg
                            className="svg-inline-header-cat-icon"
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24px 24px"
                          >
                            <path
                              className="st0"
                              d="M3,0h4.2c1.7,0,3.1,1.5,3.1,3.1v4.2c0,1.7-1.5,3.1-3.1,3.1H3c-1.6,0.1-3.1-1.2-3.1-2.9V3.1C-0.1,1.5,1.4,0,3,0 z"
                            ></path>
                            <path
                              className="st0"
                              d="M16.7,0h4.2c1.7,0,3.2,1.5,3.2,3.1v4.2c0,1.7-1.5,3.1-3.1,3.1h-4.2c-1.7,0-3.1-1.5-3.1-3.1V3.1 C13.6,1.5,14.9,0,16.7,0z"
                            ></path>
                            <path
                              className="st0"
                              d="M3,13.7h4.2c1.7,0,3.1,1.5,3.1,3.1v4.2c0,1.7-1.5,3.1-3.1,3.1H3c-1.6,0.1-3.1-1.3-3.1-2.9v-4.2 C-0.1,15,1.4,13.7,3,13.7z"
                            ></path>
                            <path
                              className="st0"
                              d="M16.7,13.7h4.2c1.7,0,3.1,1.5,3.1,3.1v4.2c0,1.7-1.5,3.1-3.1,3.1h-4.2c-1.7,0-3.1-1.5-3.1-3.1v-4.2 C13.6,15,14.9,13.7,16.7,13.7z"
                            ></path>
                          </svg>
                        </span>
                        <span className="head text-truncate">{book?.category?.name || book?.categories?.name}</span>
                      </div>
                      <div className="day">
                          <span className="icon">
                            {/* <img src={pencilIcon} alt='pencil icon' /> */}
                            <i className='fas fa-clock'></i>
                          </span>
                          <span className="head text-truncate"> Last Updated: {BookBusiness.formatTimeToLocal(book?.updatedAt)}</span>
                          <span className="icon">
                            {/* <img src={quesIcon} alt='pencil icon' /> */}
                            <i class="fas fa-question-circle"></i>
                          </span>
                      </div>
                      <div className="chapter">
                        <span>
                          {" "}
                          <svg
                            className="mp-book-chapter-icon"
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 12 16"
                          >
                            <path d="M3,12h8c0.6,0,1-0.4,1-1V1c0-0.6-0.4-1-1-1H2C0.9,0,0,0.9,0,2v11c0,1.7,1.3,3,3,3h8c0.6,0,1-0.4,1-1 s-0.4-1-1-1H3c-0.6,0-1-0.4-1-1S2.4,12,3,12z"></path>
                          </svg>
                        </span>
                        <span className="head text-truncate">{`${book?.chapters} Chapters`}</span>
                      </div>
                </div>

                <ul className="nav nav-tabs book-tabs">
                  <li className="nav-item">
                    <a className="nav-link active" data-toggle="tab" href="#about">
                      About
                    </a>
                  </li>
                  <li className="nav-item">
                    <a className="nav-link" data-toggle="tab" href="#toc">
                      Table of contents
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <div className="container containerBookPage">
            <div className="tab-content a-t_content">
              <div className="tab-pane fade active show about_content" id="about">
                <h1 className="description-head">description</h1>
                <p className="description-text">{book?.Description}</p>
                <h1 className="description-head">Recommended Reads</h1>
                
                <div className="books_sec">
                  <div className="container-1240">
                    <div className="books_wraper">
                        {recommended.map((item) => {
                          return (
                            <OngoingNovelsMapper
                              item={item}
                              data_navigation={location.state}
                            />
                          );
                        })}
                    </div>
                  </div>
                </div>
                
                {/* 
              <div className="books">
                <h1 className="books-head">Recommended Reads</h1>
                <img
                  src="/static/media/book-card.38056e30.png"
                  className="book"
                ></img>
              </div> */}
                <div></div>
                <div className="review">
                  <h1 className="review-head desktop_review_heading">
                    reviews
                  </h1>
                  <div className="row review-row">
                    <div className="col-md-6 revoew-col">
                      <h1 className="review-head">Rate this Novel</h1>
                      <div className="stars stars-2 novalRating_Bookpg">
                        <StarRatings
                          rating={rating}
                          changeRating={(r) => {
                            if (!isLogin) {
                              toast.info("Login Required!");
                              return;
                            }
                            setRating(r);
                          }}
                          starHoverColor={"orange"}
                          starRatedColor="orange"
                          numberOfStars={5}
                          starSpacing="2px"
                          name="rating"
                        />
                      </div>

                      <h3 className="review-subhead">{`${
                        book?.comments ? book?.comments?.length : data?.comments?.length
                      } Reviews (${
                        book?.avgRate?.toFixed(1) ||
                        book?.totalRates?.toFixed(1) || data?.avgRate?.toFixed(1)
                      })`}</h3>
                    </div>
                    <div className="col-md-6">
                      <div className="form-group">
                        <textarea
                          value={review}
                          className="form-control"
                          onChange={(e) => setReview(e.target.value)}
                          placeholder="Leave a review with a comment..."
                          rows="3"
                          id="comment"
                          required
                        ></textarea>
                        {!isLogin ? (
                          <small style={{ color: "red" }}>
                            Sign in to leave a comment
                          </small>
                        ) : (
                          ""
                        )}
                      </div>
                      {isLogin ? (
                        <button
                          className="review-btn"
                          disabled={isLoading}
                          onClick={() => {
                            if (!isLogin) {
                              toast.info("Login Required!");
                              return;
                            } else if (
                              data?.comments?.filter((item) => {
                                console.log('else if1 data ',data)
                                return (
                                  item.userId._id === authReducer.userData._id
                                  );
                                }).length > 0
                            ) {
                              toast.info("Already Reviewed!");
                            } else if (parseInt(review?.length) === 0) {
                              console.log('else if2 data ',data)
                              return;
                            } else {
                              _onPressCommentSend();
                            }
                          }}
                        >
                          Send
                        </button>
                      ) : (
                        <button
                          className="btn btn-submit"
                          type="button"
                          onClick={() => {
                            toast.info("Login Required!");
                          }}
                        >
                          Sign In
                        </button>
                      )}
                    </div>
                  </div>
                  {/* <ul className="nav nav-tabs review-tabs">
                  <li className="nav-item">
                    <a className="nav-link active" data-toggle="tab" href="#Liked">
                      Liked
                    </a>
                  </li>
                  <li className="nav-item">
                    <a className="nav-link" data-toggle="tab" href="#Newest">
                      Newest
                    </a>
                  </li>
                </ul> */}
                  <div className="tab-content liked-content">
                    <h1 className="review-head mob_review_heading">
                      reviews <sup> {`${book?.comments?.length}`} </sup>{" "}
                    </h1>
                    <div className="tab-pane fade active show" id="Liked">
                      {allReviews?.map((ele) => (
                        <ReviewsMapper item={ele} />
                      ))}

                      {/* <div className="comment-box">
                      <div className="row">
                        <div className="col-md-1 col-2">
                          <img
                            src="https://images.unsplash.com/photo-1556157382-97eda2d62296?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80 "
                            className="profile-image"
                          ></img>
                        </div>
                        <div className="col-md-11 col-9">
                          <h3 className="comment-box-head">
                            ImNotNarcissistic{" "}
                            <span>
                              <img
                                className="comment-head-img"
                                src="https://cdn-icons-png.flaticon.com/512/2190/2190552.png"
                              ></img>{" "}
                              <img
                                className="comment-head-img"
                                src="https://cdn-icons.flaticon.com/png/512/2566/premium/2566494.png?token=exp=1641277749~hmac=35dffb9fd4f99b007132ef425f322f44"
                              ></img>
                            </span>
                          </h3>
                          <span className="stars stars-3">
                            <i className="fas fa-star"></i>
                            <i className="fas fa-star"></i>
                            <i className="fas fa-star"></i>
                            <i className="fas fa-star"></i>
                            <i className="fas fa-star"></i>
                          </span>
                          <p className="comment">
                            Lorem Ipsum is simply dummy text of the printing and
                            typesetting industry.
                          </p>
                          <div className="row comment-row">
                            <div className="col-md-5">
                              <ul className="comment-list">
                                <li>The Strongest Son-in-Law (城中餐厅)</li>
                                <li>The Strongest Son-in-Law (城中餐厅)</li>
                                <li>The Strongest Son-in-Law (城中餐厅)</li>
                              </ul>
                            </div>
                            <div className="col-md-6">
                              <span className="more-comment">
                                <a href="/#">
                                  <i className="fas fa-chevron-down"></i>
                                </a>
                              </span>
                            </div>
                          </div>
                          <div className="row comment-row-2">
                            <div className="col-md-4 col-3">
                              <span className="time">9mth</span>
                            </div>
                            <div className="col-md-7 col-8">
                              <span className="like">
                                <i className="far fa-thumbs-up"></i>
                                149
                              </span>
                              <span className="comment">
                                <i className="far fa-comment"></i>
                              </span>
                              <span>
                                <a href="/#" className="dots">
                                  ...
                                </a>
                              </span>
                            </div>
                          </div>
                          <span className="replies">
                            <i className="fas fa-comment"></i> VIEW 40 REPLIES
                          </span>
                        </div>
                      </div>
                    </div> */}
                    </div>
                    <div className="tab-pane fade" id="Newest">
                      ...
                    </div>
                  </div>
                </div>
              </div>
              <div className="tab-pane fade toc_content" id="toc">
                <div className="row toc-top-row ">
                  <div className="col-lg-7 col-md-6 col-6 padLeft_0_col tabOfCon_latRel_text">
                    <span className="l-r-head">Latest Release:</span>
                    <span
                      className="l-r-head l-r-headcolor"
                      style={{ "margin-left": "10px", cursor: "pointer" }}
                      onClick={() => {
                        navigate(
                          `/ReadBookPage/${book._id}/${
                            chapterTitles[chapterTitles.length - 1]?._id
                          }`,
                          {
                            replace: false,
                            state: {
                              bookName: book?.Title,
                              bookImage: `${book?.Cover?.url}`,
                              chapterTitles: chapterTitles,
                            },
                          }
                        );
                      }}
                    >
                      {reverse == false
                        ? `${chapterTitles[chapterTitles?.length - 1]?.name}`
                        : `${chapterTitles[0]?.name}`}
                    </span>
                    <span className="l-r-head l-r-subhead">
                      {moment(
                        chapterTitles[chapterTitles?.length - 1]?.createdAt
                      ).fromNow()}
                    </span>
                  </div>
                  <div className="col-lg-5 col-md-6 col-6 desktop_chpList_IconFilter">
                    <div className="tab_searchFilter_main">
                      <input
                        className="searchTabOfCon desktopSearchTabOfConBox"
                        value={text}
                        placeholder="search a title or number..."
                        onChange={(e) => setText(e.target.value)}
                      />
                      <div
                        className="btnLeftSearch_tabOfCon"
                        onClick={() => {
                          const arr = [...chapterTitles];
                          setChaptertitles(arr.reverse());
                          setReverse(!reverse);
                          setpage(1)
                        }}
                      >
                        {/* <a href="" onClick={()=>{
                        setChaptertitles(chapterTitles.reverse())
                        }} className="indenticon"> */}
                        <i className="fas fa-indent"></i>
                        {/* </a> */}
                      </div>
                    </div>
                  </div>
                </div>

                <h3 className="a-t-subhead desktop_chpList_IconFilter">
                  Chapter List
                </h3>

                <div className="mob_chpList_IconFilter">
                  <h3 className="a-t-subhead">Chapter List</h3>
                  <div className="tab_searchFilter_main">
                    <input
                      className="searchTabOfCon desktopSearchTabOfConBox"
                      value={text}
                      placeholder="search a title or number..."
                      onChange={(e) => setText(e.target.value)}
                    />
                    <div
                      className="btnLeftSearch_tabOfCon"
                      onClick={() => {
                        const arr = [...chapterTitles];
                        setChaptertitles(arr.reverse());
                      }}
                    >
                      {/* <a href="" onClick={()=>{
                        setChaptertitles(chapterTitles.reverse())
                        }} className="indenticon"> */}
                      <i className="fas fa-indent"></i>
                      {/* </a> */}
                    </div>
                  </div>
                </div>

                <div className="mobSearchTabOfConBox">
                  <input
                    className="searchTabOfCon"
                    value={text}
                    placeholder="search a title or number..."
                    onChange={(e) => setText(e.target.value)}
                  />
                </div>

                <div className="row a-t_row">
                  {(chapt[0]?.name === "Chapter 1" && sameBook_recentChapters
                    ? [
                        ...sameBook_recentChapters,
                        ...chapt.filter((item) => {
                          if (
                            item?._id !==
                            sameBook_recentChapters.find(
                              (_item) => _item?._id === item?._id
                            )?._id
                          ) {
                            return item;
                          }
                        }),
                      ]
                    : chapt
                  )?.map((ele, idx) => {
                    if (idx % 2 === 0) {
                      CHECK = CHECK + 1;
                    }

                    return (
                      <div
                        className={`row ${
                          CHECK % 2 === 0 && "bg-color tabOfCon_bgColor"
                        } `}
                      >
                        <div className="col-md-2 col-2 col_numCouuntsTabOfCon">
                          <span className="numbercount numCouuntsTabOfCon">
                            {(page - 1) * 20 + 1 + idx}
                          </span>
                        </div>
                        <div className="col-lg-10 col-md-10 col-10">
                          <h1
                            className="volume-head"
                            style={{ "margin-left": "10px", cursor: "pointer" }}
                            onClick={() => {
                              navigate(
                                `/ReadBookPage/${book._id}/${ele?._id}`,
                                {
                                  replace: false,
                                  state: {
                                    bookName: book?.Title,
                                    bookImage: `${book?.Cover?.url}`,
                                    chapterTitles: chapterTitles,
                                  },
                                }
                              );
                            }}
                          >
                            {ele?.name}
                          </h1>
                          <h3 className="volume-time">
                            {moment(ele?.createdAt).fromNow()}
                          </h3>
                        </div>
                      </div>
                    );
                  })}
                </div>
                <div className="tr_pagination">
                  <ReactPaginate
                    previousLabel={
                      <span className="pagPrev">
                        <i style={{ "font-size": "24px" }} className="fas">
                          &#xf104;
                        </i>
                        <span>PREV</span>
                      </span>
                    }
                    nextLabel={
                      <span className="pagNext">
                        <span>NEXT</span>
                        <i style={{ "font-size": "24px" }} className="fas">
                          &#xf105;
                        </i>
                      </span>
                    }
                    breakLabel={"..."}
                    breakClassName={"break-me"}
                    pageCount={pageCount}
                    marginPagesDisplayed={2}
                    pageRangeDisplayed={2}
                    onPageChange={handlePageClick}
                    containerClassName={"pagination"}
                    subContainerClassName={"pages pagination"}
                    activeClassName={"active"}
                    forcePage={page - 1}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="loader layout-content">
          <Loader type="TailSpin" color="darkgrey" height={100} width={100} />
        </div>
      )}

      <Footer />
    </>
  );
}

const mapStateToProps = ({ authReducer, booksReducer }) => {
  return {
    authReducer,
    booksReducer,
  };
};
export default connect(mapStateToProps, actions)(Books);
