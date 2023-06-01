import React from 'react'
import google_img from "../Assets/Images/google.png";
import email_img from "../Assets/Images/email (2).png";
import discord_img2 from "../Assets/Images/discord (2).png";
import LogoBorders from "../Assets/cs-logo-borders.png"
import LockscreenFooter from "../Assets/read-book-lock-footer.png"
import LockIcon from "../Assets/lock453.png"
import { useNavigate } from 'react-router-dom';

const Locked = () => {

    const navigate = useNavigate()

    return (
        <div className="loging-mean-sc">
            <div className="border">
                <p></p>
            </div>
            <div className="cs-img" >
                <img src={LogoBorders} />
            </div>
            {/* <div className="cs-img">
        <img src={Logo} className="header-logo" alt="header-logo" /></div> */}

            <div className="logn-screen">
                <img src={LockIcon} />
                <h2 style={{}}>
                    This chapter is locked.
                </h2>
                <p className="modal1text ac">Subscribe to continue reading. </p>
                <p className="sub-p">Thank you for being a part
                    of our community! To keep these
                    novels coming, many will require
                    a small subscription to read.
                    <br />
                    <br />
                    Click below to quickly subscribe
                    for as low as $9USD per month. </p>
                <div className="log-sign-btn">

                    <div
                        onClick={() => {
                            navigate("/subscription")
                        }}
                        className="email-logIn-div sub-btn"
                    >

                        <p className="email-login-p">Subscribe now!</p>
                    </div>
                </div>




            </div>
            <div className="text-center ab mt-4">
                <img src={LockscreenFooter} />
            </div>

        </div>
    )
}

export default Locked