import React, { useEffect, useState, useRef } from "react";
import "../Styles/ReadbookPage.css";
import Header from "../Components/Header";
import logo1 from "../Assets/logo1.png";
import CHECK from "../Assets/Images/check.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import InfiniteScroll from "react-infinite-scroll-component";
import * as actions from "../store/actions/actions";
import filledBookmark from "../Assets/filledbookmark.jpg";
import unfilledBookmark from "../Assets/unfilledbookmark.jpg";
import { BiLockAlt } from "react-icons/bi";
import logo_dark from "../Assets/Images/logo.png";
import {
  faTimes,
  faCog,
  faBars,
  faArrowAltCircleRight,
  faArrowAltCircleLeft,
  faAngleLeft,
  faAngleRight,
} from "@fortawesome/free-solid-svg-icons";
import { connect } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import Loader from "react-loader-spinner";
import { Modal } from "react-bootstrap";
import AddComponent from "../Components/Advertisement";
import AdSense from "react-adsense";
import { toast } from "react-toastify";
import logo_readBook from "../Assets/logo_readBook.png";

import { AiFillHome } from "react-icons/ai";
import LockedSubscribe from "../Components/Locked";
import LoginSubscribe from "../Components/Login";

function ReadBookPage({
  authReducer,
  booksReducer,
  getChapterContent,
  getChapterTitles,
  createBookmarks,
  getBookmarks,
  emptychaptercontent,
  emptychapterTitle,
}) {
  const [fontSize, setFontSize] = useState(14);
  const [chaptersTitles, setChaptersTitles] = useState(false);
  const isLogin = authReducer?.isLogin;
  const [chapterSets, setChapterSets] = useState(null);
  const [toggleContentAndOptions, setToggleContentAndOptions] = useState("");
  // const [scrollHeight, setscrollHeight] = useState(0);
  const accessToken = authReducer?.accessToken;
  const location = useLocation();
  const [chaptercontent, setChaptercontent] = useState([]);
  const [chaptersContent, setchaptersContent] = useState([]);
  const [idIsSelected, setidIsSelected] = useState(false);
  const [dataOnTop, setDataOnTop] = useState(false);
  const [popup, setpopup] = useState(false);
  const [id, setid] = useState("");
  const [Currchapter, setCurrchapter] = useState();
  const BOOK_IMAGE = location.state?.bookImage || booksReducer.book.Cover.url;
  const BOOK_NAME = location.state?.bookName || booksReducer.book.Title;
  const navigate = useNavigate();
  const bookId = window.location.pathname.split("/")[2];
  const chapterId = window.location.pathname.split("/")[3];
  const [chapterTitles, setChaptertitles] = useState([]);
  const [chaptersRange, setChaptersRange] = useState([]);
  const [data, setdata] = useState([]);
  const [hasMore, setHasMore] = useState(true);
  const [hasScroll, setHasScroll] = useState(true);
  const [selectedRange, setSelectedRange] = useState(
    JSON.parse(localStorage.getItem("selectedRange"))
  );
  const [selectedChapterId, setSelectedChapterId] = useState(null);
  const [navigationState, setNavigationState] = useState(
    JSON.parse(localStorage.getItem("book_data"))
  );
  const [paraFont, setparaFont] = useState("Montserrat, sans-serif");

  // //// ----> function for sticky name of book

  const [scrolling, setScrolling] = useState(false);
  const [scrollTop, setScrollTop] = useState(0);
  const [stickyName, setStickyName] = useState(false);

  const [themePage, setThemePage] = useState("White");

  const bookTheme = useRef();
  useEffect(() => {
    setparaFont(localStorage.getItem("paraFont"));
    // setFontSize(parseInt(localStorage.getItem('paraFontSize')));
  });
  useEffect(() => {
    function onScroll() {
      let currentPosition = window.pageYOffset;
      if (currentPosition > scrollTop) {
        // downscroll code
        setScrolling(false);
      } else {
        // upscroll code
        setScrolling(true);
      }
      setScrollTop(currentPosition <= 0 ? 0 : currentPosition);
    }
    scrollTop > 115 ? setStickyName(true) : setStickyName(false);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, [scrollTop]);

  window.addEventListener("load", (event) => {
    navigate(`/book`, {
      replace: true,
      state: {
        book: navigationState.book,
        bookId: navigationState.bookId,
        bookName: navigationState.bookName,
        bookImage: navigationState.bookImage,
      },
    });
  });
  useEffect(() => {
    // getBookData();
    if (!location.state?.chapterTitles) {
      getChapterTitles(bookId, accessToken).then((e) => {
        setChaptertitles(e);
      });
    } else {
      // setCurrchapter(
      //   location.state.chapterTitles?.filter(
      //     (e) => e._id === window.location.pathname.split("/")[3]
      //   )[0]
      // );
      setChaptertitles(location.state.chapterTitles);
    }
    if (location.state?.currchapter) {
      setCurrchapter({ ...location.state?.currchapter });
    }
    if (location.state?.selectedRange) {
      setSelectedRange(JSON.parse(localStorage.getItem("selectedRange")));
      setChaptertitles(location.state.chaptersTitles);
      localStorage.setItem(
        "selectedRange",
        JSON.stringify(location.state.selectedRange)
      );
    }
  }, []);
  // const getBookData = async ()=>{
  //   const response =  await axios.get(
  //     `https://online-books-app.herokuapp.com/api/book/getSingleBook?book=${bookId}&user=${authReducer?.userData?._id}`
  //   );
  // }
  useEffect(() => {
    if (dataOnTop) {
      const samechapter = chaptercontent.indexOf(chaptersContent);
      if (samechapter != -1) {
        chaptercontent.splice(samechapter, chaptercontent);
      } else {
        if (
          authReducer.isLogin == false ||
          authReducer?.userData?.feature?.readingStyle === false
        ) {
          chaptercontent[0] = chaptersContent;
        } else {
          chaptercontent.unshift(chaptersContent);
        }
      }
      window.scroll(0, 1);
      setChaptercontent(chaptercontent);
      setDataOnTop(false);
    } else if (idIsSelected) {
      setChaptercontent([chaptersContent]);
      window.scroll(0, 1);
      setidIsSelected(false);
    } else {
      const content = [...chaptercontent];
      if (content?.length > 0 && content[0]?.length > 0) {
        const i = content.find((item, ind) => {
          if (item[0]?.content == chaptersContent[0]?.content) {
            return ind;
          }
        });
        if (i == undefined) {
          if (authReducer?.userData?.feature?.readingStyle === true) {
            content[content.length] = chaptersContent;
            setChaptercontent(content);
          } else {
            content[content.length - 1] = chaptersContent;
            setChaptercontent(content);
          }
          // content[content.length] = chaptersContent;
          // setChaptercontent(content);
        }
      } else {
        setChaptercontent([chaptersContent]);
      }
    }
  }, [chaptersContent]);

  useEffect(() => {
    // getChapterTitles(bookId, accessToken);

    return () => {
      setChaptercontent(null);
      emptychaptercontent();
      emptychapterTitle();
    };
  }, []);
  useEffect(() => {
    let newChapterContent = "";
    if (chapterTitles[chapterTitles.length - 1]?._id == chapterId) {
      setHasMore(false);
    } else {
      setHasMore(true);
    }
    if (!isLogin && chaptercontent.length > 1) {
      newChapterContent = chaptercontent.filter((item, index) => {
        return index != 1;
      });
      if (
        isLogin &&
        chaptercontent.length > 1 &&
        authReducer?.userData?.feature?.readingStyle === false
      ) {
        newChapterContent = chaptercontent.filter((item, index) => {
          return index != 1;
        });
      }
      if (
        isLogin &&
        chaptercontent.length > 1 &&
        authReducer?.userData?.feature?.ads === false
      ) {
        newChapterContent = chaptercontent.filter((item, index) => {
          return index != 1;
        });
      }
      setChaptercontent(newChapterContent);
    }
  }, [chapterId, chapterTitles]);

  const scrollToEnd = async () => {
    var key = "";

    chapterTitles.map((e, ind) => {
      if (e?.name === chaptercontent[chaptercontent.length - 1][0]?.content) {
        key = ind;
      }
    });

    if (chapterTitles[key + 1]) {
      navigate(`/ReadBookPage/${bookId}/${chapterTitles[key + 1]._id}`, {
        replace: false,
        state: {
          bookId: bookId,
          bookName: BOOK_NAME,
          bookImage: BOOK_IMAGE,
          chapterTitles: chapterTitles,
          selectedRange: localStorage.getItem("selectedRange"),
          chaptersTitles: chaptersTitles,
        },
      });
    } else {
      toast.error("This is the last chapter");
    }
  };

  const scrollToTop = async () => {
    var key = "";
    if (chaptercontent.length !== 0) {
      chapterTitles.map((e, ind) => {
        if (e.name === chaptercontent[0][0]?.content) {
          key = ind;
        }
      });
      if (key > 0) {
        setDataOnTop(true);
        navigate(`/ReadBookPage/${bookId}/${chapterTitles[key - 1]._id}`, {
          replace: false,
          state: {
            bookId: bookId,
            bookName: BOOK_NAME,
            bookImage: BOOK_IMAGE,
            chapterTitles: chapterTitles,
            selectedRange: localStorage.getItem("selectedRange"),
            chaptersTitles: chaptersTitles,
          },
        });
        // await getChapterContent(
        //   booksReducer?.chaptersTitles[key - 1]._id,
        //   bookId,
        //   authReducer?.userData?._id,
        //   accessToken
        // );
      }
    }
  };

  if (
    (authReducer?.userData?.package?.product?.name === "CS+" ||
      authReducer?.userData?.package?.product?.name === "CS Pro") &&
    authReducer?.userData?.feature?.readingStyle === true
  ) {
    document.onscroll = function () {
      if (document.documentElement.scrollTop > 600) {
        setHasScroll(true);
      }
      if (!hasScroll) {
        return;
      }
      if (
        window.innerHeight + document.documentElement.scrollTop ==
        document.documentElement.offsetHeight
      ) {
        if (window.location.pathname.split("/")[1] === "ReadBookPage") {
          if (authReducer?.userData?.feature?.ads === false) {
            setpopup(true);
          }
          scrollToEnd();
        }
      } else if (document.documentElement.scrollTop === 0) {
        if (window.location.pathname.split("/")[1] === "ReadBookPage") {
          if (authReducer?.userData?.feature?.ads === false) {
            setpopup(true);
          }
          scrollToTop();
        }
      }
    };
  }

  const onPressYellowButton = () => {
    console.log(bookTheme.current);
    bookTheme.current.querySelectorAll(
      "#popUpreadBookPage"
    )[0].style.backgroundColor = "#dad0b5";
    bookTheme.current.querySelectorAll(
      "#book-container"
    )[0].style.backgroundColor = "#dad0b5";
    bookTheme.current.querySelectorAll(".chapter_content h3")[0].style.color =
      "#000";
    bookTheme.current.querySelectorAll(".chapter-sec h3")[0].style.color =
      "#000";
    bookTheme.current.querySelectorAll(".chapter-sec h4")[0].style.color =
      "#000";
    bookTheme.current.querySelectorAll(
      ".mobHeader_readbook"
    )[0].style.backgroundColor = "";
    bookTheme.current.style.color = "#000";
    setThemePage("Yellow");
  };

  const onPressBlackButton = () => {
    bookTheme.current.querySelectorAll(
      "#popUpreadBookPage"
    )[0].style.backgroundColor = "#333333";
    bookTheme.current.querySelectorAll(
      "#book-container"
    )[0].style.backgroundColor = "#222222";
    bookTheme.current.querySelectorAll(".chapter_content h3")[0].style.color =
      "white";
    bookTheme.current.querySelectorAll(".chapter-sec h3")[0].style.color =
      "white";
    bookTheme.current.querySelectorAll(".chapter-sec h4")[0].style.color =
      "white";
    bookTheme.current.querySelectorAll(
      ".mobHeader_readbook"
    )[0].style.backgroundColor = "#222222";
    bookTheme.current.style.color = "white";
    // $(".popUpreadBookPage .container").removeClass("yellow_bg , white_bg");
    // $(".popUpreadBookPage .container").toggleClass("black_bg");

    setThemePage("Black");
  };

  const onPressWhiteButton = () => {
    bookTheme.current.querySelectorAll("#popUpreadBookPage")[0].style = "";
    bookTheme.current.querySelectorAll("#book-container")[0].style = "";
    bookTheme.current.querySelectorAll(".chapter_content h3")[0].style = "";
    bookTheme.current.querySelectorAll(".chapter-sec h3")[0].style = "";
    bookTheme.current.querySelectorAll(".chapter-sec h4")[0].style = "";
    bookTheme.current.querySelectorAll(
      ".mobHeader_readbook"
    )[0].style.backgroundColor = "";
    bookTheme.current.style = "";

    setThemePage("White");
  };

  const _onPressFontSizeHandler = () => {
    // let size = parseInt(localStorage.getItem('paraFontSize',fontSize));
    // console.log("heloooooooooo")
    // if (size < 20 && size > 14) {
    //   $("body p").css({
    //     "font-size": size,
    //   });
    // } else {
    //   $("body p").css({
    //     "font-size": size,
    //   });
    // }
    if (fontSize < 20 && fontSize > 14) {
      localStorage.setItem("paraFontSize", fontSize);
      document.getElementById("book_content").style.fontSize = fontSize;
      let nodeList = document.querySelectorAll("p");
      for (let i = 0; i < nodeList.length; i++) {
        nodeList[i].style.fontSize = fontSize;
      }
      // $("body  p").css("font-family", "Nunito Sans, sans-serif");
    } else {
      localStorage.setItem("paraFontSize", fontSize);
      document.getElementById("book_content").style.fontSize = fontSize;
      let nodeList = document.querySelectorAll("p");
      for (let i = 0; i < nodeList.length; i++) {
        nodeList[i].style.fontSize = fontSize;
      }
    }
  };

  const _onPressApplyFont = (fontType) => {
    console.log(fontType);
    if (fontType === 1) {
      console.log(document);
      document.getElementById("book_content").style.fontFamily =
        "Nunito Sans, sans-serif";
      localStorage.setItem("paraFont", "Nunito Sans, sans-serif");
      let nodeList = document.querySelectorAll("p");
      for (let i = 0; i < nodeList.length; i++) {
        nodeList[i].style.fontFamily = "Nunito Sans, sans-serif";
      }
      // $("body  p").css("font-family", "Nunito Sans, sans-serif");
    } else {
      document.getElementById("book_content").style.fontFamily =
        "Montserrat, sans-serif";
      let nodeList = document.querySelectorAll("p");
      localStorage.setItem("paraFont", "Montserrat, sans-serif");
      for (let i = 0; i < nodeList.length; i++) {
        nodeList[i].style.fontFamily = "Montserrat, sans-serif";
      }
    }
  };

  // useEffect(() => {

  //    _onPressFontSizeHandler();
  // },[fontSize]);

  useEffect(async () => {
    if (chapterTitles?.length > 0) {
      const CHAPTERS_LENGTH = chapterTitles?.length;
      const CHAPTERS = [...chapterTitles];

      if (chapterTitles?.length - 4 < 0) {
        setChapterSets();
        setChaptersRange();
      } else {
        const CHAPTERS_SETS = new Array(
          Math.ceil(CHAPTERS_LENGTH / Math.trunc(CHAPTERS_LENGTH / 4))
        )
          .fill()
          .map((_) => CHAPTERS?.splice(0, Math.trunc(CHAPTERS_LENGTH / 4)));

        let RANGE_SETS = [];
        let lastInnerArrLength = 0;
        CHAPTERS_SETS?.map((ele, idx) => {
          RANGE_SETS.push(
            `${lastInnerArrLength + 1}-${lastInnerArrLength + ele?.length}`
          );
          lastInnerArrLength = lastInnerArrLength + ele?.length;
        });
        setChaptersRange(
          RANGE_SETS?.map((ele, idx) => ({ index: idx, set: ele }))
        );

        setChapterSets(CHAPTERS_SETS);
        if (!location.state?.selectedRange) {
          setChaptersTitles(CHAPTERS_SETS[0]);
          setSelectedRange({ index: 0, set: RANGE_SETS[0] });
          localStorage.setItem(
            "selectedRange",
            JSON.stringify({ index: 0, set: RANGE_SETS[0] })
          );
        }
        // if (location?.state?.chapterId) {
        //   setSelectedChapterId(location.state.chapterId);
        // } else {
        //   setSelectedChapterId(chapterTitles[0]?._id);
        // }
      }
    }
    if (!Currchapter) {
      setCurrchapter(
        chapterTitles?.filter(
          (d) => d._id === window.location.pathname.split("/")[3]
        )[0]
      );
    }
  }, [chapterTitles]);

  useEffect(async () => {
    getChapterContent(
      window.location.pathname.split("/")[3],
      bookId,
      authReducer?.userData?._id,
      accessToken
    ).then((e) => {
      setchaptersContent(e);
    });
  }, [window.location.pathname, selectedChapterId]);

  useEffect(() => {
    if (authReducer.isLogin) {
      setdata(
        booksReducer.bookmarks.filter((e) => {
          return e.book._id == window.location.pathname.split("/")[2];
        })
      );
    }
  }, [booksReducer?.bookmarks]);

  const closeModal = () => {
    setSelectedChapterId(id);

    setpopup(false);
  };

  useEffect(() => {
    let newList = [];
    chaptersRange?.filter((ele, idx) => {
      if (ele?.index === selectedRange?.index) {
        newList = chapterSets[idx];
      }
    });
    setChaptersTitles(newList);
    localStorage.setItem("chaptersTitles", JSON.stringify(newList));
  }, [selectedRange]);

  const bookMarkthebook = async (chapterId) => {
    if (!isLogin) {
      toast.info("Login Required!");
      return;
    } else {
      createBookmarks(bookId, chapterId, authReducer.accessToken).then((e) => {
        getBookmarks(authReducer.accessToken);
      });
    }
  };

  const BookReading = (books) => {
    // console.log(books);
    const chapterId = chapterTitles.filter((e) => {
      return e.book == bookId && e.name == books?.book[0]?.content;
    })[0]?._id;

    const chid = data.filter((item) => {
      return item.chapter.name == books?.book[0]?.content;
    });

    return (
      <>
        <h3>
          {books?.book?.length > 1 ? (
            <>
              <span
                style={{ color: themePage === "Black" ? "white" : "black" }}
              >
                {/* {`${books?.book[0]?.content} : Title`} {"   "} */}
                {`${books?.book[0]?.content}`} {"   "}
              </span>
              <span onClick={() => bookMarkthebook(chapterId)}>
                {chid[0]?.chapter?.name == books?.book[0]?.content ? (
                  <img
                    src={filledBookmark}
                    style={{ height: "30px" }}
                    className="bookmark_img"
                    alt="bookmark"
                  />
                ) : (
                  <img
                    src={unfilledBookmark}
                    style={{ height: "30px" }}
                    className="bookmark_img"
                    alt="bookmark"
                  />
                )}
                {/* {data ? (
                  books?.book[0]?.content == data?.chapter?.name ? (
                    <img src={filledBookmark} style={{ height: "30px" }} />
                  ) : (
                    <img src={unfilledBookmark} style={{ height: "30px" }} />
                  )
                ) : (
                  <img src={unfilledBookmark} style={{ height: "30px" }} />
                )} */}
              </span>
            </>
          ) : books?.book[0]?.content != undefined ? (
            <>
              {`${books?.book[0]?.content}`} {"   "}
            </>
          ) : null}
        </h3>
        <p style={{ fontFamily: paraFont, fontSize: fontSize + "px" }}>
          {books?.book?.map(
            (ele, idx) =>
              idx !== 0 && (
                <p key={idx} className="mt-2" id="book_content">
                  {ele?.content}
                </p>
              )
          )}
        </p>
      </>
    );
  };

  // console.log(location);

  let cursorPointer = {
    cursor: "pointer",
  };

  return (
    // {chapterTitles[0].book == window.location.pathname.split("/")[3] ? setHasMore(false) : ''}
    <>
      <div className="readBookPgMain" ref={bookTheme}>
        <div
          className={`deskHeader_readbook fixedHeader_readBook ${
            stickyName == true ? "stickyNameTop" : ""
          }`}
        >
          <Header
            page="book"
            logoprop={logo1}
            bookname_prop={BOOK_NAME}
            chapter_prop={booksReducer.chapterContent}
            themePage={themePage}
          />
        </div>
        <div className="read-book-body">
          <section
            className={`side_bar_func ${
              toggleContentAndOptions === "display_options"
                ? "side_bar_func_displayOptions"
                : ""
            }`}
            id="sideBtnReadBookPage"
          >
            <div className="icons_sidebar">
              <div className="mobile_prevNext_bookread">
                {authReducer.isLogin == false ||
                authReducer?.userData?.feature?.readingStyle === false ? (
                  <>
                    <button
                      className="mob_prev"
                      onClick={() => {
                        setidIsSelected(true);
                        if (
                          authReducer.isLogin == false ||
                          authReducer?.userData?.feature?.ads === false
                        ) {
                          setpopup(true);
                        }
                        scrollToTop();
                      }}
                    >
                      <span className="prevIcon">
                        <FontAwesomeIcon icon={faAngleLeft} />
                      </span>
                      <span>PREVIOUS</span>
                    </button>

                    <button
                      className="mob_next"
                      onClick={() => {
                        const cuurentChapter =
                          location.state.chapterTitles?.filter(
                            (e) => e._id === chapterId
                          )[0];
                        if (
                          cuurentChapter.index == 100 &&
                          !authReducer?.userData?.subscription
                        ) {
                          toast.error("Please Subscribe to read the book");
                        } else {
                          setidIsSelected(true);
                          if (
                            authReducer.isLogin == false ||
                            authReducer?.userData?.feature?.ads === false
                          ) {
                            setpopup(true);
                          }
                          scrollToEnd();
                        }
                      }}
                    >
                      <span>NEXT</span>
                      <span className="nextIcon">
                        <FontAwesomeIcon icon={faAngleRight} />
                      </span>
                    </button>
                  </>
                ) : null}
              </div>

              <div className="hamburger">
                <FontAwesomeIcon
                  icon={faBars}
                  onClick={() => {
                    setToggleContentAndOptions(
                      toggleContentAndOptions === "display_tables"
                        ? ""
                        : "display_tables"
                    );
                  }}
                />
              </div>
              <div className="settings">
                <FontAwesomeIcon
                  icon={faCog}
                  onClick={() => {
                    setToggleContentAndOptions(
                      toggleContentAndOptions === "display_options"
                        ? ""
                        : "display_options"
                    );
                  }}
                />
              </div>
            </div>
          </section>

          <section className="table-"></section>
          {/* ${stickyName == true ? 'stickyNameTop' : 'notSticky'} */}
          <section
            className={`section-1 my_readbook_sec1 fixedHeader_readBook ${
              stickyName == true ? "stickyNameTop" : ""
            }`}
          >
            <div className="mobHeader_readbook">
              <div>
                <div className="backBtn" onClick={() => navigate(-1)}>
                  <FontAwesomeIcon icon={faAngleLeft} />
                </div>
                <div className="logo">
                  <img
                    src={themePage === "Black" ? logo_dark : logo_readBook}
                  ></img>
                </div>
                <div onClick={() => navigate("/")}>
                  <AiFillHome />
                </div>
              </div>
            </div>
          </section>

          <section
            id="popUpreadBookPage"
            className={`chapter-sec log-sign my_readbook_sec2 ${
              toggleContentAndOptions === "display_tables"
                ? "display_tables"
                : toggleContentAndOptions === "display_options"
                ? "display_options"
                : ""
            }`}
          >
            <div className="container" id="book-container">
              {window.location.pathname.split("/")[3] ===
              chapterTitles[0]?._id ? (
                <div className="book_img">
                  <img
                    src={`${BOOK_IMAGE}`}
                    className="img-fluid"
                    alt="book-image"
                  />
                  <span className="original">Original</span>
                </div>
              ) : (
                ""
              )}
              {window.location.pathname.split("/")[3] ===
              chapterTitles[0]?._id ? (
                <div className="book_text">
                  <h3 onClick={() => navigate(-1)} style={cursorPointer}>
                    {BOOK_NAME}
                  </h3>
                  {/* <h2>
                Author: <span>easyread</span>
              </h2> */}
                  <h4>© CSNovels</h4>
                </div>
              ) : (
                ""
              )}
              {window.location.pathname.split("/")[3] ===
              chapterTitles[0]?._id ? (
                <div className="hr_book">
                  <img src={BOOK_IMAGE} className="img-fluid" alt="" />
                </div>
              ) : (
                ""
              )}

              {/* Book Content Paragraphs  */}

              {Currchapter?.permissions?.length === 0 ||
              Currchapter?.permissions?.includes(
                authReducer.userData?.package?.product?.name
              ) ? ( 
                chaptercontent?.length > 0 || chaptercontent[0]?.length > 0 ? (
                  <>
                    <div className="chapter_content">
                      <InfiniteScroll
                        dataLength={chaptercontent?.length - 1}
                        next={
                          !isLogin ||
                          authReducer?.userData?.feature?.readingStyle === false
                            ? () => ""
                            : scrollToEnd
                        }
                        hasMore={hasMore}
                        endMessage={
                          <h5 className="lastBookChp">
                            <span>This is last Chapter</span>
                          </h5>
                        }
                        loader={
                          !isLogin ||
                          authReducer?.userData?.feature?.readingStyle ===
                            false ? (
                            ""
                          ) : (
                            <div className="mt-3 mb-3 d-flex justify-content-center align-items-center">
                              <Loader
                                type="TailSpin"
                                color="darkgrey"
                                height={40}
                                width={40}
                              />
                            </div>
                          )
                        }
                      >
                        {popup ? (
                          <AdSense.Google
                            client="ca-pub-5004354455774494"
                            slot="3041517840"
                            style={{ display: "block" }}
                            format="auto"
                            responsive="true"
                            layoutKey="-gw-1+2a-9x+5c"
                          />
                        ) : null}
                        {chaptercontent?.map((item, idx) => {
                          return <BookReading key={idx} book={item} />;
                        })}
                      </InfiniteScroll>
                    </div>

                    <div
                      className="desktop_prevNext_bookread"
                      style={{ marginLeft: "85%", marginTop: "10px" }}
                    >
                      {authReducer.isLogin == false ||
                      authReducer?.userData?.feature?.readingStyle === false ? (
                        <>
                          <FontAwesomeIcon
                            icon={faArrowAltCircleLeft}
                            onClick={() => {
                              setidIsSelected(true);
                              if (
                                authReducer.isLogin == false ||
                                authReducer?.userData?.feature?.ads === false
                              ) {
                                setpopup(true);
                              }
                              scrollToTop();
                            }}
                            style={{ fontSize: "30px" }}
                          />
                          <FontAwesomeIcon
                            icon={faArrowAltCircleRight}
                            onClick={() => {
                              const cuurentChapter =
                                location.state.chapterTitles?.filter(
                                  (e) => e._id === chapterId
                                )[0];
                              if (
                                cuurentChapter.index == 100 &&
                                !authReducer?.userData?.subscription
                              ) {
                                toast.error(
                                  "Please Subscribe to read the book"
                                );
                              } else {
                                setidIsSelected(true);
                                if (
                                  authReducer.isLogin == false ||
                                  authReducer?.userData?.feature?.ads === false
                                ) {
                                  setpopup(true);
                                }
                                scrollToEnd();
                              }
                            }}
                            style={{ fontSize: "30px" }}
                          />
                        </>
                      ) : null}
                    </div>
                  </>
                ) : (
                  <>
                    <div className="mt-3 mb-3 d-flex justify-content-center align-items-center">
                      <Loader
                        type="TailSpin"
                        color="darkgrey"
                        height={40}
                        width={40}
                      />
                    </div>
                  </>
                )
              ) : (
                <>
                  {authReducer.isLogin === false ? (
                    <LoginSubscribe />
                  ) : (
                    <LockedSubscribe />
                  )}
                  {/* {" "}
                  <h1 style={{ textAlign: "center" }}>
                    {authReducer.isLogin == false
                      ? "Login & Subscribed to view new chapters"
                      : "Subscribed to view new chapters"}
                  </h1>
                  <button
                    style={{
                      marginLeft: "40%",
                      width: "20%",
                      marginTop: "10px",
                    }}
                    type="button"
                    className="btn us-active-btn"
                    onClick={() => {
                      if (authReducer.isLogin) {
                        navigate("/subscription");
                      }
                    }}
                  >
                    {authReducer.isLogin == false
                      ? "Login & Subscribe Now"
                      : "Subscribe Now"}
                  </button>{" "} */}
                </>
              )}
            </div>

            <div className="main-tables">
              <div className="table_content popupTablesReadPg visible_table">
                <div className="">
                  <h4>Table of Contents</h4>
                  <span className="close">
                    <FontAwesomeIcon
                      icon={faTimes}
                      onClick={() => {
                        setToggleContentAndOptions("");
                      }}
                    />
                  </span>
                  <span> Volume 1</span>
                </div>
                <ul className="chapter_headings">
                  {chaptersTitles?.length > 0 &&
                    chaptersTitles?.map((ele, idx) => {
                      // console.log(ele);
                      return (
                        <li key={idx}>
                          <a
                            // href={`/ReadBookPage/${bookId}/${ele?._id}`}
                            onClick={(e) => {
                              e.preventDefault();
                              setHasScroll(false);
                              if (ele.permissions.length > 0) {
                                if (
                                  ele.permissions.includes(
                                    authReducer?.userData?.package?.product
                                      ?.name
                                  )
                                ) {
                                  navigate(
                                    `/ReadBookPage/${ele.book}/${ele?._id}`,
                                    {
                                      replace: true,
                                      state: {
                                        bookId: ele.book,
                                        bookName: BOOK_NAME,
                                        bookImage: BOOK_IMAGE,
                                        chapterId: ele?._id,
                                        chapterTitles: chapterTitles,
                                        selectedRange:
                                          localStorage.getItem("selectedRange"),
                                        chaptersTitles: chaptersTitles,
                                      },
                                    }
                                  );
                                  setpopup(true);
                                } else {
                                  toast.error(
                                    "Please Subscribe to read the book LIST"
                                  );
                                  // navigate("/subscription")
                                }
                              } else {
                                setpopup(true);
                                navigate(
                                  `/ReadBookPage/${bookId}/${ele?._id}`,
                                  {
                                    replace: false,
                                    state: {
                                      bookId: bookId,
                                      bookName: BOOK_NAME,
                                      bookImage: BOOK_IMAGE,
                                      chapterId: ele?._id,
                                      chapterTitles: chapterTitles,
                                      selectedRange:
                                        localStorage.getItem("selectedRange"),
                                      chaptersTitles: chaptersTitles,
                                    },
                                  }
                                );
                              }
                              setidIsSelected(true);
                              setToggleContentAndOptions("");

                              // setSelectedChapterId(ele._id);
                              // setid(ele?._id);
                            }}
                            style={{
                              color:
                                window.location.pathname.split("/")[3] ===
                                ele?._id
                                  ? "#3b66f5"
                                  : "#000",
                              textTransform: "capitalize",
                            }}
                          >
                            {/* {`${ele?.name?.match(/(\d+)/)[0]}.`}&nbsp; &nbsp;
                        {`${ele?.title}`} */}
                            {ele.name}{" "}
                            {ele.permissions.length ? <BiLockAlt /> : null}
                          </a>
                        </li>
                      );
                    })}
                </ul>
                <div className="chapters_range read-pagination">
                  <ul>
                    {chaptersRange?.length > 0 &&
                      chaptersRange?.map((ele, idx) => (
                        <li key={idx}>
                          <a
                            className={
                              localStorage.getItem("selectedRange")?.index ===
                                ele?.index && "blue-line"
                            }
                            href="/#"
                            onClick={(e) => {
                              setSelectedRange(ele);
                              localStorage.setItem(
                                "selectedRange",
                                JSON.stringify(ele)
                              );
                              e.preventDefault();
                            }}
                          >
                            {ele.set}
                          </a>
                        </li>
                      ))}
                  </ul>
                </div>

                {/* <div className="pagine">
                <ul className="pagination">
                <li className="page-item">
                  <a className="page-link" href="javascript:void(0)" aria-label="Previous">
                    <span aria-hidden="true" className="m-0">&laquo;</span>
                  </a>
                </li>
                  <li className="page-item"><a className="page-link" href="javascript:void(0)">1</a></li>
                  <li className="page-item active"><a className="page-link" href="javascript:void(0)">2</a></li>
                  <li className="page-item"><a className="page-link" href="javascript:void(0)">3</a></li>
                  <li className="page-item">
                    <a className="page-link" href="javascript:void(0)" aria-label="Next">
                      <span aria-hidden="true" className="m-0">&raquo;</span>
                    </a>
                  </li>
                </ul>
                </div> */}
              </div>

              <div className="table_content popupTablesReadPg display_visible">
                <div className="displayOptions_popup">
                  <h4>Display Options</h4>
                  <span className="close">
                    <FontAwesomeIcon
                      icon={faTimes}
                      onClick={() => {
                        setToggleContentAndOptions("");
                      }}
                    />
                  </span>
                  <span>Background</span>
                  <div className="bg-change-main">
                    <div
                      onClick={() => onPressWhiteButton()}
                      className="white-btn bg-changer"
                    >
                      <img src={CHECK} alt="" className="img-fluid" />
                    </div>
                    <div
                      onClick={() => onPressYellowButton()}
                      className="yellow-btn bg-changer"
                    >
                      <img src={CHECK} alt="" className="img-fluid" />
                    </div>
                    <div
                      onClick={() => onPressBlackButton()}
                      className="black-btn bg-changer"
                    >
                      <img src={CHECK} alt="" className="img-fluid" />
                    </div>
                  </div>
                  <span>Font</span>
                  <div className="font-changer">
                    <div
                      className="nunito-font"
                      onClick={() => _onPressApplyFont(1)}
                    >
                      <h3>Nunito Sans</h3>
                    </div>
                    <div
                      className="merri-font"
                      onClick={() => _onPressApplyFont(2)}
                    >
                      <h3>Merriweather</h3>
                    </div>
                  </div>
                  <span>Size</span>
                  <div className="size-changer">
                    <div
                      className="increasing_size"
                      onClick={() => {
                        if (fontSize < 20) {
                          setFontSize(fontSize + 1);
                        }
                      }}
                    >
                      A+
                    </div>
                    <div className="size">{fontSize}</div>
                    <div
                      className="decreasing_size"
                      onClick={() => {
                        if (fontSize >= 14) {
                          setFontSize(fontSize - 1);
                        }
                      }}
                    >
                      A-
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>

        <Modal show={popup} onHide={() => closeModal()} className="Modal">
          <Modal.Header className="modal-header">
            <Modal.Title className="modal-title">
              {/* {!modalcontent.amount ? "Choose Amount" : ""} */}
            </Modal.Title>
            <button
              type="button"
              className="close"
              data-dismiss="modal"
              onClick={closeModal}
            >
              &times;
            </button>
          </Modal.Header>
          <Modal.Body>
            {/* <h1>Google add Here</h1> */}
            <AdSense.Google
              client="ca-pub-5004354455774494"
              slot="3041517840"
              style={{ display: "block" }}
              format="auto"
              responsive="true"
              layoutKey="-gw-1+2a-9x+5c"
            />
            {/* <AddComponent /> */}
          </Modal.Body>
        </Modal>
      </div>
    </>
  );
}

const mapStateToProps = ({ authReducer, booksReducer }) => {
  return {
    authReducer,
    booksReducer,
  };
};

export default connect(mapStateToProps, actions)(ReadBookPage);
