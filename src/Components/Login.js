import React, { useState } from 'react'
import google_img from "../Assets/Images/google.png";
import email_img from "../Assets/Images/email (2).png";
import discord_img2 from "../Assets/Images/discord (2).png";
import LogoBorders from "../Assets/cs-logo-borders.png"
import LockscreenFooter from "../Assets/read-book-lock-footer.png"
import axios from "axios"
import { useGoogleLogin } from '@react-oauth/google';
import { googleLogin } from '../store/actions/actions';
import { useDispatch } from 'react-redux';
import { baseUrl } from '../config';
import { useNavigate } from 'react-router-dom';
import Header from "../Components/Header"


const Login = () => {

    const [openModal, setOpenModal] = useState(false)

    const dispatch = useDispatch()
    const navigate = useNavigate()

    // Google Login Starts

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
        };
        dispatch(googleLogin(userInfo, onLoginFailed, onLoginSuccess));

    };

    const onLoginFailed = (response) => {
        console.log(response, "response error")
    };

    const onLoginSuccess = () => {
    };

    // Google Login End 

    return (
        <div className="loging-mean-sc">
            <Header className="d-none" openModal={openModal} setOpenModal={setOpenModal} />
            <div className="border">
                <p></p>
            </div>
            <div className="cs-img">
                <img src={LogoBorders} />
            </div>
            {/* <div className="cs-img">
                <img src={Logo} className="header-logo" alt="header-logo" /></div> */}

            <div className="logn-screen">
                <h2 style={{ color: "black", marginTop: "30px" }}>

                    Login or Sign up to continue reading.
                </h2>
                <p className="modal1text">some books may require an active subcription after logging in. </p>

                <div className="log-sign-btn">
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
                            setOpenModal(!openModal)
                            // setIsVisibleModal(false);
                            // setIsVisibleSignInSignUpModal(true);
                            // setMode("login");
                        }}
                        className="email-logIn-div"
                    >
                        <span className="email-Icon">
                            <img src={email_img} style={{ width: "35px", height: "auto" }} alt="email_icon" />
                        </span>
                        <p className="email-login-p">LOGIN WITH EMAIL</p>
                    </div>
                </div>

                <div className="text-color mt-4">
                    <p>Don't have an account?</p>
                </div>
                <div
                 onClick={() => {
                    setOpenModal(!openModal)
                    // setIsVisibleModal(false);
                    // setIsVisibleSignInSignUpModal(true);
                    // setMode("login");
                }}
                    // onClick={() => {
                    //     setIsVisibleModal(false);
                    //     setIsVisibleSignInSignUpModal(true);
                    //     setMode("signup");
                    // }}
                    className="create-account-div"
                >
                    <p className="create-account-p">CREATE ACCOUNT</p>

                </div>
            </div>
            <div className="text-center ab mt-4">
                <img src={LockscreenFooter} />
            </div>

        </div>
    )
}

export default Login

