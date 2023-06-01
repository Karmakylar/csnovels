import React, { useEffect, useState } from "react";
import LOGO from "../Assets/Images/logo.png";
// import logo from "../Assets/Images/csnovels-logo.svg";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFacebookSquare,
  
  faDiscord,
} from "@fortawesome/free-brands-svg-icons";
import FooterLinksMapper from "./FooterLinksMapper";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import useMediaQuery from '@mui/material/useMediaQuery';

function Footer({ booksReducer }) {

  const [categories, setCategories] = useState();

  const [popular, setPopular] = useState();

  const [contact, setContact] = useState();

  useEffect(() => {

    setCategories([
      {
        _id: 1,
        label: "urban",
      },
      {
        _id: 2,
        label: "eastern",
      },
      {
        _id: 3,
        label: "sci-fi",
      },
      {
        _id: 4,
        label: "romance",
      },
    ])

    setContact([
      {
        _id: 1,
        label: "contact us",
        link: "mailto:admin@cannedsplam.com",
      },
      {
        _id: 2,
        label: "support",
        link: "mailto:admin@cannedsplam.com",
      },
      {
        _id: 3,
        label: "discord",
        link: "https://discord.gg/UPMdhcyFnM",
      },
    ])

    setPopular([
      {
        _id: 1,
        label: "popular",
      },
      {
        _id: 2,
        label: "rating",
      },
      {
        _id: 3,
        label: "last updated",
      },
    ])
    let mostPopularNovels = booksReducer?.books?.filter(
      (ele) => ele?.isPopular
    );
    let _4PopularBooks = [];
    for (let i = 0; i < mostPopularNovels?.length; i++) {
      if (i < 4) {
        _4PopularBooks.push(mostPopularNovels[i]);
      }
    }
    setPopular(_4PopularBooks);
  }, [booksReducer?.books]);


  const screen1280 = useMediaQuery('(min-width:1280px)');


  return (
    <>
      <div className="container-fluid footer-parent pt-5">
        <div className="ml-5 mr-5">
          <div className="row">
            {/* 1st column  */}
            <div className="col-lg-3 col-md-3 col-sm-3 col-12">
              <div className="footer-1st-col">
                <img src={LOGO} className="footer-logo" alt="footer-logo" style={screen1280?{marginTop: "-11px"}:{}}/>
                <div className="mobContactMenu">
                  {contact?.map((ele, idx) => (
                    <FooterLinksMapper item={ele} key={idx} />
                  ))}
                </div>
                <div className="copyrights-and-social">
                  <div className="social-icons-div">
                    <a href='https://www.facebook.com/csnovels' target='_blank'>
                    <FontAwesomeIcon
                      icon={faFacebookSquare}
                      className="social-icon"
                    />
                    </a>
                    <a href='https://discord.gg/UPMdhcyFnM' target='_blank'>
                    <FontAwesomeIcon icon={faDiscord} className="social-icon" />
                    </a>
                  </div>
                  <p className="copyright-cs">Copyright © 2021 <a href="https://www.CSnovels.com" target="_blank">CSnovels.com</a></p>
                  <p className="privacy-terms">
                   <Link to='/privacy'> privacy policy</Link> • <Link to='/terms'> terms of service</Link>
                  </p>
                </div>
              </div>
            </div>
            {/* 2nd column  */}
            <div className="col-lg-3 col-md-3 col-sm-3">
              <div className="links-container">
                <p className="links-heading">categories</p>
                {categories?.map((ele, idx) => (
                  <FooterLinksMapper mode="categories" item={ele} key={idx} />
                ))}
              </div>
            </div>

            {/* 3rd column  */}
            <div className="col-lg-3 col-md-3 col-sm-3">
              <div className="links-container">
                <p className="links-heading">popular</p>
                {popular?.map((ele, idx) =>
                  (<FooterLinksMapper mode="sortBy" item={ele} key={idx} />)
                )}
              </div>
            </div>

            {/* 4th column  */}
            <div className="col-lg-3 col-md-3 col-sm-3">
              <div className="links-container">
                <p className="links-heading">contact</p>
                {contact?.map((ele, idx) => (
                  <FooterLinksMapper item={ele} key={idx} />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

const mapstatetoprops = ({ authReducer, booksReducer }) => {
  return { authReducer, booksReducer };
};
export default connect(mapstatetoprops, null)(Footer);
