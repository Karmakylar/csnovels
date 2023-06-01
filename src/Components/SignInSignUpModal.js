import React, { useState } from "react";
import Modal from "react-modal";
import { connect } from "react-redux";
import { useNavigate } from "react-router-dom";
import * as actions from "../store/actions/actions";

function SignInSignUpModal({
  mode,
  setMode,
  userLogin,
  userSignUp,
  isVisibleModal,
  setIsVisibleModal,
  setIsVisibleAuthModal,
  setShowForgetPasswordModal,
}) {
  const [isLoading, setIsLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [provider, setProvider] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [confirmPass, setConfirmPass] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [error, setError] = useState("")

  const customStyles = {
    content: {
      top: "50%",
      left: "50%",
      zIndex: 99999999,
      right: "auto",
      bottom: "auto",
      marginRight: "-50%",
      transform: "translate(-50%, -50%)",
    },
  };

  const handleSignIn = async () => {
    setIsLoading(true);
    const data = {
      email: email,
      password: password,
    };
    userLogin(data, onSuccess, setError).then(() => {
      setIsLoading(false);
    });
  };
  const navigate = useNavigate();

  const handleSignUp = () => {
    setIsLoading(true);
    const data = {
      email: email,
      password: password,
      username: username,
      provider: provider,
      confirmPassword: confirmPass,
      lastName: lastName,
      firstName: firstName,
      provider: 'local',
    };

    userSignUp(data, onSuccess, setError).then(() => {
      setIsLoading(false);
    });
  };

  const onSuccess = (status) => {

    setIsVisibleModal(false);
    if (status) {
      navigate("/subscription", { state: { signup: true } })
    }


  };

  return (
    <Modal
      isOpen={isVisibleModal}
      style={customStyles}
    >
      <div className="border">
        <p></p>
      </div>
      <div className="modal-css signin-modal">
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
            fill="none"
            stroke="#010101"
            stroke-miterlimit="10"
            stroke-width="4"
          />
          <line
            x1="9.37"
            x2="54.63"
            y1="54.63"
            y2="9.37"
            fill="none"
            stroke="#010101"
            stroke-miterlimit="10"
            stroke-width="4"
          />
        </svg>

        <h1 className="signup-top">
          <i
            className="fas fa-arrow-left mr-3"
            onClick={() => {
              setIsVisibleModal(false);
              setIsVisibleAuthModal(true);
            }}
          ></i>
          {mode === "login" ? "Sign in with Email" : "Sign up with Email"}
        </h1>
        <form className="poppup-2">
          {mode === "signup" && (
            <>
              <div className="form-group popup-form">
                <label for="pwd">USERNAME:</label>
                <input
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="form-control"
                  id="pwd"
                ></input>
              </div>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  flexDirection: "row",
                }}
              >
                <div className="form-group popup-form">
                  <label for="email">FIRST NAME:</label>
                  <input
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    type="text"
                    className="form-control"
                    id="fname"
                  ></input>
                </div>
                <div className="form-group popup-form">
                  <label for="email">LAST NAME:</label>
                  <input
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    type="text"
                    className="form-control"
                    id="lname"
                  ></input>
                </div>
              </div>
            </>
          )}
          <div className="form-group popup-form">
            <label for="email">EMAIL ADDRESS:</label>
            <input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              type="email"
              className="form-control"
              id="email"
            ></input>
          </div>

          {mode === "signup" && (
            <>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  flexDirection: "row",
                }}
              >
                <div className="form-group popup-form">
                  <label for="pwd">PASSWORD:</label>
                  <input
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    type="password"
                    className="form-control"
                    id="pwd"
                  ></input>
                </div>
                <div className="form-group popup-form">
                  <label for="pwd">CONFIRM PASSWORD:</label>
                  <input
                    value={confirmPass}
                    onChange={(e) => setConfirmPass(e.target.value)}
                    type="password"
                    className="form-control"
                    id="pwd"
                  ></input>
                </div>
              </div>
            </>
          )}
          {mode !== "signup" && (
            <div className="form-group popup-form">
              <label for="pwd">PASSWORD:</label>
              <input
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                type="password"
                className="form-control"
                id="pwd"
              ></input>
            </div>
          )}

          <span className="text-danger">{error && error}</span>

          {!isLoading ? (
            mode === "login" ? (
              <button
                onClick={handleSignIn}
                type="submit"
                className="btn btn-primary"
                style={
                  email !== "" && (/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(email))
                    && password !== ""
                    ? { color: "#fff", backgroundColor: "#0069d9", borderColor: "#0062cc" } : {}
                }
              >
                SIGN IN
              </button>
            ) : (
              <button
                onClick={handleSignUp}
                type="submit"
                className="btn btn-primary"
                style={
                  email !== "" && (/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(email))
                    && password !== ""
                    ? { color: "#fff", backgroundColor: "#0069d9", borderColor: "#0062cc" } : {}
                }
              >
                SIGN UP
              </button>
            )
          ) : (
            <div className="loading-signin">SIGINING IN</div>
          )}
        </form>
        {mode === "login" ? (
          <div className="forget">
            <a >
              <span className="forgot-pass">FORGOT PASSWORD?</span>
            </a>
            <a
              href="/#"
              onClick={(e) => {
                e.preventDefault();
                setIsVisibleModal(false);
                setShowForgetPasswordModal(true);
              }}
            >
              <span className="tap-here">TAP HERE</span>
            </a>
          </div>
        ) : null}

        <hr className="dont-have-an-acc" />
        {mode === "login" && (
          <>
            <div className="text-color">
              <p>Don't have an account? </p>
            </div>
            <div
              onClick={() => {
                setMode("signup");
                setError("");
              }}
              className="create-account-div"
            >
              <p className="create-account-p">CREATE ACCOUNT</p>
            </div>
          </>
        )}

        {mode === "signup" && (
          <>
            <div className="text-color mt-4">
              <p>Already have an account? </p>
            </div>
            <div
              onClick={() => {
                setMode("login");
                setError("");
              }}
              className="create-account-div"
            >
              <p className="create-account-p">LOG IN NOW</p>
            </div>
          </>
        )}
      </div>
    </Modal>
  );
}

const mapStateToProps = ({ authReducer }) => {
  return { authReducer };
};

export default connect(mapStateToProps, actions)(SignInSignUpModal);
