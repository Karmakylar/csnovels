import React, { useEffect, useState } from "react";
import Loader from "react-loader-spinner";
import Header from "./Header";
import MostWantedNovelsMapper from "./MostWantedNovelsMapper";
import { useLocation } from "react-router-dom";
import * as actions from "../store/actions/actions";
import Footer from "./Footer";
import { connect } from "react-redux";
import { useSearchParams } from "react-router-dom";
import InfiniteScroll from "react-infinite-scroll-component";
import { useDispatch } from "react-redux";
import { categories, content, status } from "../Constants/FilterBooksConstants"
import MobileFilterBooks from "../Pages/Mobile Pages/Categories/Categories"
import SelectedCategory from "../Pages/Mobile Pages/Categories/SelectedCategory";

function FilterBooks({
  authReducer,
  booksReducer,
  getFilteredBooks,
  favoriteThisBook,
  emptyFilteredBooks,
}) {
  const { state } = useLocation();
  const location = useLocation();
  const dispatch = useDispatch();
  const accessToken = authReducer?.accessToken;
  const [params, setParams] = useSearchParams();
  const [contentType, setContentType] = useState("all");
  const [sortBy, setSortBy] = useState(location?.state?.sortBy || "popular");
  const [isLoading, setIsLoading] = useState(false);
  const [mode, setMode] = useState(false)
  // const [mode, setMode] = useState('selected')
  const [data, setData] = useState([]);
  const [width, setWidth] = React.useState(window.innerWidth);
  const [pageNo, setPageNo] = useState(1);
  const [hasMoreData, setHasMoreData] = useState(true);
  const categoryParam = params.get("category");
  const statusParam = params.get("status");
  const modeParam = params.get("mode");
  const breakPoint = 767;

  useEffect(() => {
    if (!statusParam || statusParam === "null") {
      // Set value to all if null or undefined else keep the same value
      setParams({ category: !categoryParam ? "all" : categoryParam, status: !statusParam || statusParam === "null" ? "all" : statusParam , mode : modeParam ? modeParam : "view" })
    }
  }, [params])

  useEffect(() => {
    emptyFilteredBooks();
    _onChangeGenre();
  }, [params, sortBy]);

  useEffect(() => {
    setData(booksReducer?.filteredBooks);
  }, [booksReducer?.filteredBooks]);

  const getPaginatedData = () => {
    const data = {
      cat: categoryParam,
      status: statusParam,
      orderBy: sortBy,
      pageNo: pageNo,
      userId: authReducer?.userData?._id || undefined,
    };

    getFilteredBooks(data, accessToken, setHasMoreData);
    setPageNo(pageNo + 1);
  };

  const favoriteBookHandler = (_id) => {
    const data = {
      bookId: _id,
    };
    favoriteThisBook(data, accessToken, "filteredBooks");
  };

  const _onChangeGenre = () => {
    let PAGE_NO = 1;
    const data = {
      cat: categoryParam,
      status: statusParam,
      orderBy: sortBy,
      pageNo: PAGE_NO,
      userId: authReducer?.userData?._id || undefined,
    };

    setIsLoading(true);
    getFilteredBooks(data, accessToken, setHasMoreData).then(() => {
      setIsLoading(false);
    });
    setPageNo(PAGE_NO + 1);
  };
  function useQuery() {
    const { search } = useLocation();

    return React.useMemo(() => new URLSearchParams(search), [search]);
  }

  let query = useQuery();

  let filteredData = data?.filter(
    (item) => item?.releaseSchedule.toLowerCase() !== item?.releaseSchedule
  );

  useEffect(() => {
    const handleWindowResize = () => setWidth(window.innerWidth);
    window.addEventListener("resize", handleWindowResize);

    return () => window.removeEventListener("resize", handleWindowResize);
  }, []);

  return (
    <>
      <Header />
      <div className="search-page layout-content">
        {width > breakPoint ?

          <div className="container">
            <div className="row">
              <div className="col-md-3">
                <div className="side-bar">
                  <h1 className="sidebar-heading">Genre of Novels</h1>
                  <div className="row">
                    <div className="col-md-12">
                      <ul className="nav nav-pills nav-stacked side-bar-tabs">
                        {categories.map((category) => {
                          return (
                            <li
                              className="nav-item"
                              onClick={() => {
                                setParams({ category: category.genre, status: statusParam });
                                setContentType("all");
                                setSortBy("popular");
                                if (booksReducer?.isSearched)
                                  dispatch(actions.emptySearchedBooks());
                              }}
                            >
                              <a
                                style={{
                                  background:
                                    categoryParam === category.genre && "#3c5df5",

                                  color: categoryParam === category.genre && "white",
                                  cursor: "pointer"
                                }}
                                className={`nav-link `}
                              >
                                {category.name}
                              </a>
                            </li>
                          );
                        })}
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-md-9">
                <div className="search-page-content">
                  <h1 className="filter-heading top-main-head">Filter By</h1>
                  <div className="row top-row">
                    <div className="col-lg-7 top-col padLeft_0_col">
                      <h3 className="top-heading content-type">Content Type</h3>
                      <ul className="nav nav-pills search-top-tab serach-tabs content-type-tabs filterBtns">
                        {content.map((cont) => {
                          return (
                            <li
                              className="nav-item"
                              onClick={() => {
                                setContentType(cont.content);
                                if (booksReducer?.isSearched)
                                  dispatch(actions.emptySearchedBooks());
                              }}
                            >
                              <a
                                style={{
                                  background: contentType === cont.content && "#e8ebff",

                                  color: contentType === cont.content && "#385af4",
                                  border: "2px solid #e8ebff",
                                  cursor: "pointer"
                                }}
                                className="nav-link active"
                              >
                                {cont.name}
                              </a>
                            </li>
                          )
                        })}
                      </ul>
                    </div>
                    <div className="col-lg-5 top-col">
                      <h3 className="top-heading content-status">
                        Content Status
                      </h3>
                      <ul className="nav nav-pills search-top-tab serach-tabs filterBtns">
                        {status.map((stat) => {
                          return (
                            <li
                              className="nav-item"
                              onClick={() => {
                                setParams({ category: categoryParam, status: stat.status });
                                if (booksReducer?.isSearched)
                                  dispatch(actions.emptySearchedBooks());
                              }}
                            >
                              <a
                                style={{
                                  background:
                                    params.get("status") === stat.status &&
                                    "#e8ebff",

                                  color:
                                    params.get("status") === stat.status &&
                                    "#385af4",
                                  border: "2px solid #e8ebff",
                                  cursor: "pointer"
                                }}
                                className="nav-link active"
                              >
                                {stat.name}
                              </a>
                            </li>
                          );
                        })}
                      </ul>
                    </div>
                  </div>
                  {/*----- filter top ---*/}

                  <h1 className="sort-heading top-main-head">Sort By</h1>
                  <div className="row mb-3">
                    <div className="col-12 padLeft_0_col">
                      <ul className="nav nav-pills sorting serach-tabs filterBtns">
                        <li
                          className="nav-item"
                          onClick={() => {
                            setSortBy("popular");
                            setIsLoading(true);
                            if (booksReducer?.isSearched)
                              dispatch(actions.emptySearchedBooks());
                          }}
                        >
                          <a
                            style={{
                              background: sortBy === "popular" && "#e8ebff",

                              color: sortBy === "popular" && "#385af4",
                              border: "2px solid #e8ebff",
                              cursor: "pointer"
                            }}
                            className="nav-link active"
                          >
                            Popular
                          </a>
                        </li>
                        <li
                          className="nav-item"
                          onClick={() => {
                            setSortBy("rating");
                            setIsLoading(true);
                          }}
                        >
                          <a
                            style={{
                              background: sortBy === "rating" && "#e8ebff",

                              color: sortBy === "rating" && "#385af4",
                              border: "2px solid #e8ebff",
                              cursor: "pointer"
                            }}
                            className="nav-link"
                          >
                            Rating
                          </a>
                        </li>
                        <li
                          className="nav-item"
                          onClick={() => {
                            setSortBy("timeUpdate");
                            setIsLoading(true);
                          }}
                        >
                          <a
                            style={{
                              background: sortBy === "timeUpdate" && "#e8ebff",

                              color: sortBy === "timeUpdate" && "#385af4",
                              border: "2px solid #e8ebff",
                              cursor: "pointer"
                            }}
                            className="nav-link"
                          >
                            Time Updated
                          </a>
                        </li>
                      </ul>
                    </div>
                  </div>
                  {/* Searched Books State */}
                  <div className="bookSearch-demo">
                    <div className="section-div most_popular favBooksQa">
                      <div className="row center-most-popular-in-mobile spacing-adjust">
                        {
                          booksReducer?.searchedBooks?.length > 0
                            ? booksReducer?.searchedBooks?.map((item, idx) => {
                              return (
                                <MostWantedNovelsMapper
                                  key={idx}
                                  item={item}
                                  isLoading={isLoading}
                                  favoriteBookHandler={favoriteBookHandler}
                                />
                              );
                            })
                            : null
                        }
                      </div>
                    </div>
                  </div>
                  {/* Filtered Books State */}
                  {!booksReducer?.searchedBooks?.length ? (
                    <div className="sorting-content">
                      {isLoading ? (
                        <div className="loader">
                          <Loader
                            type="TailSpin"
                            color="darkgrey"
                            height={100}
                            width={100}
                          />
                        </div>
                      ) : (
                        query.get("status") === "ongoing"
                          ? filteredData?.length > 0
                          : data?.length > 0 && !booksReducer.isSearched
                      ) ? (
                        <InfiniteScroll
                          dataLength={
                            query.get("status") === "ongoing"
                              ? filteredData?.length
                              : data?.length
                          }
                          scrollThreshold={"200px"}
                          next={() => getPaginatedData()}
                          hasMore={false}
                          loader={
                            <div className="mt-3 mb-3 d-flex justify-content-center align-items-center">
                              <Loader
                                type="TailSpin"
                                color="darkgrey"
                                height={40}
                                width={40}
                              />
                            </div>
                          }
                        >
                          <div className="section-div filter_books">
                            <div className="books_wraper">
                              {data?.map((item, idx) => {
                                return (
                                  <MostWantedNovelsMapper
                                    state={state}
                                    key={idx}
                                    item={item}
                                    isLoading={isLoading}
                                    favoriteBookHandler={favoriteBookHandler}
                                  />
                                );
                              })}
                            </div>
                          </div>
                        </InfiniteScroll>
                      ) : (
                        <h3>{
                          !booksReducer.isSearched ?
                            "No Books Found!"
                            :
                            "Your Search : Searched Text Does Not Match Any Book"
                        }</h3>
                      )}
                    </div>
                  ) : null}
                </div>
              </div>
            </div>
          </div>
          :
          modeParam !== "selected" ?
            <MobileFilterBooks setMode={setMode}  />
            :
            <SelectedCategory booksReducer={booksReducer} isLoading={isLoading}/>
        }
      </div>
      <Footer />
    </>
  );
}

const mapStateToProps = ({ booksReducer, authReducer }) => {
  return { booksReducer, authReducer };
};
export default connect(mapStateToProps, actions)(FilterBooks);
