import React, { useState } from "react";
// import GoogleLogin from "react-google-login";
import Modal from "react-modal";
import Logo from "../Assets/logo-dark.png";
import google_img from "../Assets/Images/google.png";
import email_img from "../Assets/Images/email (2).png";
import discord_img2 from "../Assets/Images/discord (2).png";
import { useGoogleLogin } from '@react-oauth/google';
import axios from "axios";
import * as actions from "../store/actions/actions";
import { connect } from "react-redux";
import { baseUrl } from "../config";

function AuthModal({
  setMode,
  googleLogin,
  isVisibleModal,
  setIsVisibleModal,
  setIsVisibleSignInSignUpModal,
}) {


  const customStyles = {
    content: {
      top: "50%",
      left: "50%",
      right: "auto",
      bottom: "auto",
      marginRight: "-50%",
      transform: "translate(-50%, -50%)",
    },
  };


  const [provider, setProvider] = useState('local');
  const discordAuth = async () => {
    alert("SAD");
    // let headerss = new Headers();

    // headerss.append("Access-Control-Allow-Origin", "http://localhost:3000");
    // headerss.append("Access-Control-Request-Headers", "Content-Type");
    // headerss.append("Content-Type", "application/x-www-form-urlencoded");
    // headerss.append("Access-Control-Allow-Headers", "Accept");
    // // try {
    // //   const res = await oauth
    // //   // client_id=923179004788355082
    // //   // &redirect_uri=http%3A%2F%2Flocalhost%3A3000%2F
    // //   // &response_type=code
    // //   // &scope=email
    // //     .tokenRequest({
    // //       clientId: "923191410671378522",
    // //       redirectUri: "http://localhost:3000",
    // //       response_type: "OAuth2",
    // //       scope: "ahmed.mirza@oip.com.pk",
    // //       grantType: "authorization_code",
    // //       clientSecret: "_QyJxP33Rx9LNMSNlW5aLkzy5SjoNOwP",
    // //       access_token:"OTIxMzU4NjIwNzI4MzY5MTYy.YcMOoA.hZ19Xuo8ABL7p3B8UR7C_b4drpQ",
    // //     })
    // //     .then(console.log);
    // // } catch (error) {
    // //   console.log(error);
    // // }
    // //  var unique = Math.random()
    // // https://discord.com/oauth2/authorize?client_id=923179004788355082&redirect_uri=http://localhost:3000/&response_type=code&scope=email%20identify%20connections
    // const data = {
    //   clientId: "948154917514797097",
    //   clientSecret: "a3tn7xuYOZPHjpEC5wKl_CdObM5DWMsr",
    //   access_token:
    //     // "OTIxMzU4NjIwNzI4MzY5MTYy.YcMOoA.hZ19Xuo8ABL7p3B8UR7C_b4drpQ",
    //     "67236b8d0d54ce3b95a001444ed4ccdc1448779276a1048c90394e5708dec971",
    //   code: "standard OAuth2",
    //   scope: "email identify connections",
    //   grantType: "authorization_code",
    //   redirectUri: `https://www.google.com`,
    // };
    // // const URL =
    // //   "https://discord.com/api/oauth2/authorize?client_id=923179004788355082&redirect_uri=http://localhost:3000/&response_type=code&scope=email identify connections";
    // fetch(
    //   `http://discord.com/api/oauth2/authorize?client_id=${data.clientId}&redirect_uri=${data.redirectUri}&response_type=code&scope=${data.scope}`,
    //   {
    //     mode: "cors",
    //     headers: headerss,
    //     method: "GET",
    //   }
    // )
    //   .then(function (res) {
    //     console.log(res);
    //   })
    //   .catch(function (res) {
    //     console.log(res);
    //   });
  };


  const login = useGoogleLogin({
    onSuccess: tokenResponse => responseGoogle(tokenResponse),
  });

  const responseGoogle = async (response) => {
    // get users account info by their access token
    const { data } = await axios.get(
      'https://www.googleapis.com/oauth2/v3/userinfo',
      { headers: { Authorization: `Bearer ${response.access_token}` } },
    );

    const userInfo = {
      email: data?.email,
      firstName: data?.family_name,
      lastName: data?.given_name,
      profileImage: data?.picture,
      provider: 'google',
    };
    googleLogin(userInfo, onLoginFailed, onLoginSuccess);

  };

  const onLoginFailed = (response) => {
    console.log(response, "response error")
  };

  const onLoginSuccess = () => {
    setIsVisibleModal(false);
  };
  return (
    <Modal dialogClassName="modal-auth" isOpen={isVisibleModal} style={customStyles}>
      <div className="border">
        <p></p>
      </div>
      <div className="modal-css">
        <svg
          onClick={() => setIsVisibleModal(false)}
          data-dismiss="modal"
          xmlns="http://www.w3.org/2000/svg"
          data-name="Layer 1"
          viewBox="0 0 64 64"
        >
          <line
            x1="9.37"
            x2="54.63"
            y1="9.37"
            y2="54.63"
            fill="#333333"
            stroke="#333333"
            stroke-miterlimit="10"
            stroke-width="10"
          />
          <line
            x1="9.37"
            x2="54.63"
            y1="54.63"
            y2="9.37"
            fill="#333333"
            stroke="#333333"
            stroke-miterlimit="10"
            stroke-width="10"
          />
        </svg>
        <img src={Logo} className="header-logo" alt="header-logo" />
        <h2 style={{ color: "black", marginTop: "30px" }}>
          Welcome to CSnovels
        </h2>
        <p className="modal1text">Sign in or create an account to begin reading!</p>
        <div
          className="google-logIn-div"
          onClick={login}
        >
          <img
            alt="google-Icon"
            className="google-Icon"
            src={google_img}
            style={{ width: "35px", height: "auto" }}
          />
          <p className="google-logIn-p">LOGIN WITH GOOGLE</p>
        </div>
        <div
          // onClick={() => {
          //   discordAuth();
          // }}
          className="discord-logIn-div"
        >
          <span className="discord-Icon">
            <img src={discord_img2} alt="discord_icon" style={{ width: "35px", height: "auto" }} />
          </span>

          <p className="discord-logIn-p">
            <a href={`${baseUrl}/api/social2/auth/discord`}>
              LOGIN WITH DISCORD
            </a>
          </p>
        </div>

        <div
          onClick={() => {
            setIsVisibleModal(false);
            setIsVisibleSignInSignUpModal(true);
            setMode("login");
          }}
          className="email-logIn-div"
        >
          <span className="email-Icon">
            <img src={email_img} style={{ width: "35px", height: "auto" }} alt="email_icon" />
          </span>
          <p className="email-login-p">LOGIN WITH EMAIL</p>
        </div>

        <hr
          style={{
            color: "grey",
            backgroundColor: "grey",
            height: 0.5,
            width: "60%",
            marginTop: "80px ",
          }}
        />
        <div className="text-color mt-4">
          <p>Don't have an account?</p>
        </div>
        <div
          onClick={() => {
            setIsVisibleModal(false);
            setIsVisibleSignInSignUpModal(true);
            setMode("signup");
          }}
          className="create-account-div"
        >
          <p className="create-account-p">CREATE ACCOUNT</p>

        </div>
        <div className="signUpModal_footer">
          <ul>
            <li>
              <a>© 2022 CannedSplam</a>
            </li>
            <li> | </li>
            <li>
              <a>Terms</a>
            </li>
            <li> | </li>
            <li>
              <a>Privacy Policy</a>
            </li>
          </ul>
        </div>
      </div>
    </Modal>
  );
}

export default connect(null, actions)(AuthModal);
