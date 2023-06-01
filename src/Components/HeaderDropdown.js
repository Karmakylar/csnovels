import { useState, useEffect, useRef } from "react";
import StarRatings from "react-star-ratings";
import { useNavigate } from "react-router-dom";
import { connect } from "react-redux";
import * as actions from "../store/actions/actions";
import { baseUrl } from "../config";
import dropdown_cs_img from "../Assets/dropdown_cs_img.png";
import EjectIcon from "@mui/icons-material/Eject";
import useMediaQuery from "@mui/material/useMediaQuery";

function HeaderDropdown({
  closeDropDown,
  logout,
  authReducer,
  clickedAvatar,
  setClickedAvatar,
}) {
  function useComponentVisible(initialIsVisible) {
    const [isComponentVisible, setIsComponentVisible] =
      useState(initialIsVisible);
    const ref = useRef(null);

    const handleClickOutside = (event) => {
      if (ref.current && !ref.current.contains(event.target)) {
        setIsComponentVisible(false);
        setClickedAvatar(false);
      }
    };

    useEffect(() => {
      document.addEventListener("click", handleClickOutside, true);
      return () => {
        document.removeEventListener("click", handleClickOutside, true);
      };
    }, []);

    return { ref, isComponentVisible, setIsComponentVisible };
  }

  const navigate = useNavigate();
  const { ref, isComponentVisible } = useComponentVisible(true);

  const options = [
    {
      id: 1,
      name: "my profile",
      link: "profile/#1",
    },
    // {
    //   id: 2,
    //   name: "subscription",
    //   link: "subscription",
    // },
    {
      id: 3,
      name: "favorites",
      link: "profile/#2",
    },
    {
      id: 4,
      name: "bookmarks",
      link: "profile/#3",
    },
    {
      id: 5,
      name: "contact support",
      link: "",
    },
    {
      id: 6,
      name: "sign out",
      link: "",
    },
  ];
  
  const handleLogout = (cb) => {
    new Promise((resolve, reject) => {
      resolve();
    })
      .then(() => {
        navigate("/", { replace: true });
      })
      .then(() => {
        logout();
      })
      .then(() => {
        window.localStorage.clear();
      })
      .then(() => {
        window.location.reload();
      });
  };

  const screen767 = useMediaQuery("(max-width:767px)");

  // console.log(authReducer?.userData?.package?.product?.name == 'CS Pro');

  return (
    <>
      {(isComponentVisible || clickedAvatar) && (
        <div className="header-dropdown header-dropdown-small" ref={ref}>
          {screen767 && (
            <div className="d-flex w-100">
              <div style={{ flex: 0.95 }} />
              <EjectIcon
                style={{
                  color: "#333333",
                  marginTop: "-29px",
                  paddingBottom: "1px",
                }}
              />
            </div>
          )}

          <div className="dropdown-pointer" />

          {/* User Logged In Div  */}
          <div className="image-and-info-div">
            {authReducer?.userData?.profile_img ? (
              <img
                style={{
                  width: "60px",
                  height: "60px",
                  borderRadius: 50,
                }}
                alt="user-dp"
                onClick={() => closeDropDown(false)}
                src={`${baseUrl}/public/${authReducer?.userData?.profile_img?.name}`}
              />
            ) : (
              <div
                className="user-acc-circle-dropdown"
                onClick={() => closeDropDown(false)}
              >
                <p className="user-acc-label-dropdown">
                  {authReducer?.userData?.firstName?.substring(0, 1)  || authReducer?.userData?.username?.substring(0, 1)}
                </p>
              </div>
            )}

            <div
              className="user-acc-info-div"
              style={{ marginTop: screen767 ? "20px" : "" }}
            >
              <p className="username-dropdown text-white">
                {authReducer?.userData?.username ||
                  authReducer?.userData?.firstName}
              </p>
              <p
                className="user-email-dropdown text-white"
                style={{ marginTop: screen767 ? "-5px" : "" }}
              >
                {authReducer?.userData?.email}
              </p>
              {authReducer?.userData?.subscription && (
                <div className="d-flex flex-row align-items-center headerDropDownStars">
                  <StarRatings
                    starDimension={"12"}
                    rating={1}
                    starRatedColor="#ffc240"
                    numberOfStars={1}
                    name="rating"
                  />
                  <p className="user-acc-type-dropdown text-white">
                    {authReducer.userData?.package?.product?.name}
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* CS+ Advertisment  */}

          {authReducer?.userData?.package?.product?.name == "CS Pro" ? (
            <div className="dropDownImgCS_header">
              <img src={dropdown_cs_img} />
            </div>
          ) : null}

          {/* Drop Down Menu Items  */}

          {options.map((ele, idx) => {
            return (
              <p
                className={`${
                  !screen767 ? `dropdown-options-label` : `ml-1`
                } text-white text-capitalize`}
                onClick={() => {
                  if (ele?.name === "sign out") {
                    handleLogout();
                  } else if (ele?.link !== "") {
                    navigate(`/${ele?.link}`, { replace: true });
                  }
                }}
              >
                {ele.name}
              </p>
            );
          })}
        </div>
      )}
    </>
  );
}

const mapStateToProps = ({ authReducer }) => {
  return { authReducer };
};

export default connect(mapStateToProps, actions)(HeaderDropdown);
