import React, { useState } from "react";
import Modal from "react-modal";
import { connect } from "react-redux";
import * as actions from "../store/actions/actions";

function ForgetPasswordModal({
  setIsVisibleModal,
  isVisibleModal,
  forgetPassword,
}) {
  const [isLoading, setIsLoading] = useState(false);
  const [email, setEmail] = useState("");
  const handleSubmit = async () => {
    setIsLoading(true);

    forgetPassword(email, onSuccess).then(() => {
      setIsLoading(false);
    });
  };

  const onSuccess = () => {
    setIsVisibleModal(false);
    setEmail("");
  };

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

  return (
    <Modal isOpen={isVisibleModal} style={customStyles}>
      <div className="border">
        <p></p>
      </div>
      <div className="forget-pass-modal-css ">
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
      </div>

      <h1 className="signup-top">Forget Password</h1>
      {/* <form className="poppup-2"> */}
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
      <p className="reset-info">
        A reset password link will be sent to this email address.
      </p>
      <button
        onClick={handleSubmit}
        type="button"
        disabled={isLoading}
        className="btn btn-primary submit-button"
      >
        {isLoading ? "PLEASE WAIT" : "SUBMIT"}
      </button>
      {/* </form> */}
    </Modal>
  );
}

export default connect(null, actions)(ForgetPasswordModal);
