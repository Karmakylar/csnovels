import React from 'react'

const ReadbookLogin = () => {
    return (
        <div>
            <div className="border">
                <p></p>
            </div>

            <div className="cs-img">
                <img src={Logo} className="header-logo" alt="header-logo" /></div>

            <div className="logn-screen">
                <h2 style={{ color: "black", marginTop: "30px" }}>

                    Login or Sign up to continue reading.
                </h2>
                <p className="modal1text">some books may require an active subcription after logging in. </p>
                <div
                    className="google-logIn-div"
                // onClick={login}
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
                        <a href={`/api/social2/auth/discord`}>
                            LOGIN WITH DISCORD
                        </a>
                    </p>
                </div>

                <div
                    // onClick={() => {
                    //     setIsVisibleModal(false);
                    //     setIsVisibleSignInSignUpModal(true);
                    //     setMode("login");
                    // }}
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
            <div className="text-center mt-4">
                <img src={LockscreenFooter} />
            </div>

        </div>
    )
}

export default ReadbookLogin