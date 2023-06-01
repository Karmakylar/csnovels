import React, { useEffect, useState } from "react";
import Logo from "../Assets/Images/csnovels-logo.png";
import icon_dark from "../Assets/icon-light.png"
import icon_light from "../Assets/icon-dark.png"
import logoMobile from "../Assets/dark-icon-logo.png";
import login_icon_mobile from "../Assets/login-icon.png"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSortDown } from "@fortawesome/free-solid-svg-icons";
import HeaderSearch from "./HeaderSearch";
import HeaderDropdown from "./HeaderDropdown";
import { useNavigate, NavLink } from "react-router-dom";
import { connect, useSelector } from "react-redux";
import SignInSignUpModal from "./SignInSignUpModal";
import AuthModal from "./AuthModal";
import ForgetPasswordModal from "./ForgetPasswordModal";
import Avatar from "@mui/material/Avatar";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useParams } from "react-router-dom";
import MobileProfile from "./Mobile/MobileProfile";
import MobileHeaderDropDown from "./Common/ModalRighComponent"

function Header({ authReducer, page, bookname_prop, themePage, chapter_prop, openModal, className }) {
  const [text, setText] = useState("");
  const [mode, setMode] = useState("login");
  useEffect(() => { }, [text]);
  const [showDropdown, setShowDropdown] = useState("");
  const navigate = useNavigate();
  const params = useParams();
  const isLogin = useSelector((state) => state?.authReducer?.isLogin);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [showSignInSignUpModal, setShowSignInSignUpModal] = useState(false);
  const [showForgetPasswordModal, setShowForgetPasswordModal] = useState(false);
  const [hoverCategoriesDropdown, setHoverCategoriesDropdown] = useState(false);
  const [clickedAvatar, setClickedAvatar] = useState(false);
  const screen767 = useMediaQuery("(max-width:767px)");
  const screen575 = useMediaQuery("(max-width:575px)");
  const screen325 = useMediaQuery("(max-width:325px)");


  useEffect(() => {
    setShowSignInSignUpModal(openModal)
  }, [openModal])

  return (
    <div
      className={className}
      style={{
        backgroundColor: themePage === "Black" ? "rgb(32, 33, 36)" : "white",
      }}
    >
      {page && page != undefined && page == "book" ? (
        <div className="row justify-content-between">
          <div className="left-header">
            <div className="logo-topleft-bookRead">
              {themePage === "Black" ? (
                <img
                  onClick={() => navigate("/")}
                  src={icon_dark}
                  className="img-fluid"
                  alt=""
                />
              ) : (
                <img
                  onClick={() => navigate("/")}
                  src={icon_light}
                  className="img-fluid"
                  alt=""
                />
              )}
            </div>
            <div className="book-title-left" onClick={() => navigate(-1)}>
              <h3
                style={{ color: themePage === "Black" ? "white" : "black" }}
              >{`${bookname_prop} / ${chapter_prop[0]?.content !== "only subscribe user read this chapters" ?
                chapter_prop[0]?.content ? chapter_prop[0]?.content : 'Loading...' : "No Access"}`}</h3>
            </div>
          </div>

          <div className="left-header right-header-nmh">
            {params.boookid && params?.chapterid ? null : (
              <HeaderSearch
                setText={setText}
                text={text}
                themePage={themePage}
              />
            )}
            {!isLogin && (
              <button onClick={() => setShowAuthModal(true)} className="btn-sm">
                SIGN IN
              </button>
            )}
          </div>
        </div>
      ) : (
        <div className="my_prof_header">
          <div className="container-fluid header-bg">
            <div className="container">
              <div className={`row no-gutters ${!screen767 && `header-items`}`}>
                {!screen767 ? (
                  <>
                    <div
                      className="myitem col-md-3"
                      onClick={() => navigate("/home")}
                    >
                      <img
                        src={Logo}
                        className="header-logo mt-1"
                        alt="header-logo"
                      />
                    </div>

                    <div className="myitem col-md-2 mt-2 catLabelMain">
                      <div className="cat-label">
                        <svg
                          id="dropdownMenuButton"
                          data-toggle="dropdown"
                          aria-haspopup="true"
                          aria-expanded="false"
                          className="svg-inline-header-cat-icon"
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 24 24"
                          onMouseEnter={() => setHoverCategoriesDropdown(true)}
                          onMouseLeave={() => setHoverCategoriesDropdown(false)}
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

                        <h5
                          className="cat-label-text"
                          type="button"
                          id="dropdownMenuButton"
                          data-toggle="dropdown"
                          aria-haspopup="true"
                          aria-expanded="false"
                          onMouseEnter={() => setHoverCategoriesDropdown(true)}
                          onMouseLeave={() => setHoverCategoriesDropdown(false)}
                        >
                          {" "}
                          Categories{" "}
                        </h5>
                        <FontAwesomeIcon
                          className="mb-1"
                          id="dropdownMenuButton"
                          data-toggle="dropdown"
                          icon={faSortDown}
                          onMouseEnter={() => setHoverCategoriesDropdown(true)}
                          onMouseLeave={() => setHoverCategoriesDropdown(false)}
                          style={
                            hoverCategoriesDropdown
                              ? { color: "#ffc240" }
                              : null
                          }
                        />
                        <div
                          className="category dropdown-menu"
                          aria-labelledby="dropdownMenuButton"
                        >
                          <a
                            className="dropdown-item"
                            onClick={(e) => {
                              e.preventDefault();
                              navigate("/search?category=urban", {
                                state: { genre: "urban" },
                              });
                            }}
                          >
                            Urban
                          </a>
                          <a
                            className="dropdown-item"
                            onClick={(e) => {
                              e.preventDefault();
                              navigate("/search?category=eastern", {
                                state: { genre: "eastern" },
                              });
                            }}
                          >
                            Eastern
                          </a>
                          <a
                            className="dropdown-item"
                            onClick={(e) => {
                              e.preventDefault();
                              navigate("/search?category=sci-fi", {
                                state: { genre: "sci-fi" },
                              });
                            }}
                          >
                            Sci-Fi
                          </a>
                          <a
                            className="dropdown-item"
                            onClick={(e) => {
                              e.preventDefault();
                              navigate("/search?category=all", {
                                state: { genre: "all" },
                              });
                            }}
                          >
                            View All
                          </a>
                        </div>
                      </div>
                    </div>

                    <div className="myitem col-md-5">
                      {" "}
                      <HeaderSearch setText={setText} text={text} />{" "}
                    </div>

                    {isLogin ? (
                      <div className="myitem col-md-2 comunity-and-user-icon">
                        <a
                          href="https://discord.gg/HwMzcdJ"
                          className="community-link"
                        >
                          community
                        </a>

                        <div
                          className="user-acc-circle-dropdown"
                          onClick={() => {
                            setShowDropdown(!showDropdown);
                            setClickedAvatar(true);
                          }}
                        >
                          <p className="user-acc-label-dropdown">
                            {authReducer?.userData?.firstName?.substring(0, 1) || authReducer?.userData?.username?.substring(0, 1)}
                          </p>
                        </div>

                        {showDropdown && (
                          <HeaderDropdown
                            closeDropDown={setShowDropdown}
                            clickedAvatar={clickedAvatar}
                            setClickedAvatar={setClickedAvatar}
                          />
                        )}
                      </div>
                    ) : (
                      <>
                        {window.screen.width <= 280 ? (
                          <div className="myitem col-md-2 comunity-and-user-icon">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              viewBox="0 0 512 512"
                              style={{ width: "70px", height: "20px" }}
                              onClick={() => setShowAuthModal(true)}
                            >
                              <path d="M416 32h-64c-17.67 0-32 14.33-32 32s14.33 32 32 32h64c17.67 0 32 14.33 32 32v256c0 17.67-14.33 32-32 32h-64c-17.67 0-32 14.33-32 32s14.33 32 32 32h64c53.02 0 96-42.98 96-96V128C512 74.98 469 32 416 32zM342.6 233.4l-128-128c-12.51-12.51-32.76-12.49-45.25 0c-12.5 12.5-12.5 32.75 0 45.25L242.8 224H32C14.31 224 0 238.3 0 256s14.31 32 32 32h210.8l-73.38 73.38c-12.5 12.5-12.5 32.75 0 45.25s32.75 12.5 45.25 0l128-128C355.1 266.1 355.1 245.9 342.6 233.4z" />
                            </svg>
                          </div>
                        ) : (
                          <>
                            <a
                              href="https://discord.gg/HwMzcdJ"
                              className="community-link"
                            >
                              community
                            </a>
                            <div className="myitem col-md-2 comunity-and-user-icon">
                              <button
                                className="header-sign-in-btn"
                                onClick={() => setShowAuthModal(true)}
                              >
                                SIGN IN
                              </button>
                            </div>
                          </>
                        )}
                      </>
                    )}
                  </>
                ) : (


                  <div className="d-flex align-items-center w-100">
                    <div
                      onClick={() => navigate("/home")}
                      style={{ width: "13%" }}
                    >
                      <img
                        src={logoMobile}
                        // className="mobile-logo"
                        alt="mobile-logo"
                      />
                    </div>

                    <div
                      className="d-flex align-items-center "
                      style={{ width: "87%" }}
                    >
                      <div style={{ width: "85%", flex: 1 }}>
                        <HeaderSearch setText={setText} text={text} />{" "}
                      </div>

                      {isLogin ? (
                        <>
                          <Avatar
                            onClick={() => {
                              setShowDropdown(!showDropdown);
                              setClickedAvatar(true);
                            }}
                            sx={
                              screen575 && !screen325
                                ? {
                                  height: "35.45px",
                                  width: "35.45px",
                                  backgroundColor: "#3890fc",
                                }
                                : screen325
                                  ? {
                                    height: "32.95px",
                                    width: "32.95px",
                                    backgroundColor: "#3890fc",
                                  }
                                  : { backgroundColor: "#3890fc" }
                            }
                          >
                            <p className="user-acc-label-dropdown capitalize-text">
                              {authReducer?.userData?.firstName?.substring(
                                0,
                                1
                              ) || authReducer?.userData?.username?.substring(0, 1)}
                            </p>
                          </Avatar>


                          {showDropdown && (
                            <MobileHeaderDropDown
                              show={showDropdown}
                              setShow={setShowDropdown}
                              Component={<MobileProfile />}
                            />
                          )}
                        </>
                      ) : (
                        <>
                          <div
                            className=""
                          // style={{
                          //   marginLeft: screen497 ? "-52px" : "-34px",
                          // }}
                          >
                            <img
                              src={login_icon_mobile}
                              onClick={() => setShowAuthModal(true)}
                            />
                          </div>
                        </>
                      )}
                    </div>
                  </div>
                )}

                <div className="tabs-header mt-4">
                  <NavLink className={(navData) => (navData.isActive ? 'active-link' : '')} to="/search">
                    Categories
                  </NavLink>
                  <NavLink className={(navData) => (navData.isActive ? 'active-link' : '')} to="/free-books">
                    Free
                  </NavLink>
                  <NavLink className={(navData) => (navData.isActive ? 'active-link' : '')} to="/updated-books">
                    Updates
                  </NavLink>
                  <NavLink className={(navData) => (navData.isActive ? 'active-link' : '')} to="/profile">
                    Profile
                  </NavLink>
                </div>
              </div>
            </div>
          </div>

          {showSignInSignUpModal && (
            <SignInSignUpModal
              mode={mode}
              setMode={setMode}
              isVisibleModal={showSignInSignUpModal}
              setShowForgetPasswordModal={setShowForgetPasswordModal}
              setIsVisibleModal={setShowSignInSignUpModal}
              setIsVisibleAuthModal={setShowAuthModal}
            />
          )}

          {showAuthModal && (
            <AuthModal
              isVisibleModal={showAuthModal}
              setIsVisibleModal={setShowAuthModal}
              setIsVisibleSignInSignUpModal={setShowSignInSignUpModal}
              setMode={setMode}
            />
          )}

          {showForgetPasswordModal && (
            <ForgetPasswordModal
              isVisibleModal={showForgetPasswordModal}
              setIsVisibleModal={setShowForgetPasswordModal}
            />
          )}
        </div>
      )}
    </div>
  );
}

const mapStateToProps = ({ authReducer }) => {
  return { authReducer };
};

export default connect(mapStateToProps, null)(Header);
