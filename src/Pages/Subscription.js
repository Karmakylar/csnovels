import React, { useEffect, useState } from "react";
import { useLocation, useNavigate, Link } from "react-router-dom";
import Header from "../Components/Header";
import Footer from "../Components/Footer";
import { Modal } from "react-bootstrap";
import * as actions from "../store/actions/actions";
import { connect, useDispatch } from "react-redux";
import {
  Presubscription,
  getpackage,
  Updatesubscription,
  customSubscription,
  updatecustomSubscription,
} from "../store/actions/actions";
import * as types from "../store/actions/actionType";
import { toast } from "react-toastify";
import StripeCheckout from "react-stripe-checkout";
import ClipLoader from "react-spinners/ClipLoader";
import { css } from "@emotion/react";
import edit_modify_icon from "../Assets/Images/edit_modify_icon.png";
import Loader from "react-loader-spinner";

const override = css`
  display: block;
  margin: 0 auto;
  border-color: red;
`;
function Subscription({ authReducer }) {
  const dispatch = useDispatch();
  const [isopen, setisopen] = useState(false);
  const [csplusSelected, setcsplusSelected] = useState(false);
  const [packages, setpackages] = useState([]);
  const [modalcontent, setmodalcontent] = useState({});
  const [content, setcontent] = useState({});
  const [isLoading, setisLoading] = useState(false);
  // email.defaultValue = authReducer.userData.email
  // email.disabled=true
  const [amount, setAmount] = useState("0");
  const [interval, setinterval] = useState("one-time");
  const [checked, setchecked] = useState(false);
  const [product, setproduct] = useState("");
  const [load, setload] = useState(true);

  let [loading] = useState(true);
  let [color] = useState("#ffffff");
  const [updateamount, setupdateamount] = useState(false);

  var navigate = useNavigate();

  const [isSubscribe, setisSubscribe] = useState(true);
  useEffect(() => {
    setAmount(modalcontent.amount ? modalcontent.amount : "");
    setproduct(modalcontent ? modalcontent._id : "");
  }, [modalcontent]);

  const openModal = () => {
    setisopen(true);
  };
  const location = useLocation();
  const closeModal = () => {
    setcsplusSelected(false);
    setmodalcontent([]);
    setisopen(false);
  };

  const getPackages = async () => {
    const data = await getpackage(authReducer.accessToken);

    if (location?.state?.signup) {
      setpackages(data);
    } else {
      // var val = [];
      // data.map((item) => {
      //   if (!item.free) {
      //     val.push(item);
      //   }
      //   return item;
      // });
      // setpackages(val);
      setpackages(data);
    }
  };

  useEffect(() => {
    if (!authReducer.isLogin) {
      navigate("/home");
    }
    getPackages();

    // if (
    //   parseInt(authReducer.userData?.package?.amount) === 15 ||
    //   parseInt(authReducer.userData?.package?.amount) === 9
    // ) {
    //   setcustomdisabled(true);
    // }
  }, [authReducer]);

  useEffect(() => {
    if (
      parseInt(modalcontent.amount) !== 9 &&
      parseInt(modalcontent.amount) !== 15 &&
      (parseInt(amount) === 9 || parseInt(amount) === 15)
    ) {
      setisSubscribe(false);
    } else {
      setisSubscribe(true);
    }
  }, [amount, modalcontent.amount]);

  useEffect(() => {
    if (checked === false) {
      setinterval("one-time");
    } else {
      setinterval("monthly");
    }
  }, [checked]);

  async function handleToken(token) {
    setisLoading(true);

    var response;
    if (
      !authReducer.userData?.package &&
      modalcontent.product !== "Custom Product"
    ) {
      response = await Presubscription(
        token.id,
        interval,
        product,
        authReducer.accessToken
      );
    } else if (modalcontent.product !== "Custom Product") {
      response = await Updatesubscription(
        token.id,
        interval,
        product,
        authReducer.accessToken
      );
    } else if (
      !authReducer.userData?.package &&
      modalcontent.product === "Custom Product"
    ) {
      response = await customSubscription(
        token.id,
        interval,
        amount,
        authReducer.accessToken
      );
    } else if (
      authReducer.userData?.package &&
      modalcontent.product === "Custom Product"
    ) {
      response = await updatecustomSubscription(
        token.id,
        interval,
        amount,
        authReducer.accessToken
      );
    } else if (modalcontent.product === "Custom Product") {
      response = await updatecustomSubscription(
        token.id,
        interval,
        amount,
        authReducer.accessToken
      );
    }

    if (response?.data?.success) {
      // localStorage.setItem("package",JSON.stringify(response.data.data))

      dispatch({
        type: types.SUBSCRIPTION,
        payload: response?.data.data,
      });
      dispatch({
        type: "READING_STYLE",
        payload: true,
      });
      closeModal();
      setisLoading(false);

      toast.success(response.data.msg);
    } else {
      closeModal();
      setisLoading(false);

      toast.error(response.data.msg);
    }
    <ClipLoader color={color} loading={loading} css={override} size={150} />;

    setload(!load);
  }
  const date = new Date();
  console.log(authReducer?.userData, "user");
  return (
    <div>
      <Header />
      <div className="layout-content">
        <div className="container sub-sec">
          <div className="subcription">
            <h1>Subscription</h1>
            {authReducer.userData?.package &&
            !(
              authReducer.userData?.package?.amount === 15 ||
              authReducer.userData?.package?.amount === 9
            ) ? (
              <p>
                You have to cancel custom subscription first than update package
              </p>
            ) : null}
          </div>

          {/* <div className="sign-up free-account">
            <div className="free">free</div>
            <div className="free-acc">
              <h2>
                Create a free account <br></br> to being reading!*
              </h2>
              <p>
                    account is required to read novels <br></br>
                    *not all novels are free to read
              </p>
            </div>
            <div className="free-cs">
              <button
                className="btn1"
              >
                {authReducer?.userData?.subscription === (null || "free") ? "CURRENT" : "Subscribe"}
              </button>
              <h1>CS Free</h1>
            </div>
          </div> */}

          {/* <div className="sign-up current">
            <div className="free currt">
              <span className="span1"> $9</span>
            </div>
            <div className="free-acc">
              <h2>
                Get <span>unlimited</span> access<br></br> to <span>all</span> novels!
              </h2>
              <p>charged monthly OR one time payment for 30 day access</p>
            </div>
            <div className="free-cs ">
              <button className="btn1" style={{ cursor: "pointer" }}>
              {authReducer?.userData?.subscription === "CS Pro" ? "CURRENT" : "subscribe"}
                </button>
              <h1>CS PRO</h1>
            </div>
          </div> */}

          {/* <div className="sign-up upgrade">
            <div className="free dollar">
              <span className="span1"> $15</span>
            </div>
            <div className="free-acc upgrade-acc">
              <h2>GAIN EXCLUSIVE ACCESS:</h2>
              <ul className="add">
                <li>Ad free experiance</li>
                <li>Infinite scroll when reading</li>
                <li>
                  Get access to beta/stockpiled chapters and chapter in the
                  edit process
                </li>
              </ul>
              <p>charged monthly OR one time payment for 30 day access</p>
            </div>
            <div className="free-cs upgrade-cs">
              
              <button className="btn3">
              {authReducer?.userData?.subscription ===   "CS+" ? "CURRENT" : "subscribe"}
              </button>

              <h1>CS+</h1>
            </div>
          </div> */}

          {/* Packages Box Start */}

          {packages.map((item, index) => {
            if (item.free) {
              return (
                <div className="sign-up free-account">
                  <div className="free">free</div>
                  <div className="free-acc">
                    <h2>
                      Create a free account <br></br> to being reading!*
                    </h2>
                    <p>
                      account is required to read novels<br></br>
                      *not all novel free to read
                    </p>
                  </div>
                  <div className="free-cs">
                    <button
                      className="btn1"
                      onClick={() => {
                        setload(!load);
                        location.state.signup = false;
                        getPackages();
                        navigate("/home");
                      }}
                    >
                      {authReducer?.userData?.package?.name === (null || "free")
                        ? "CURRENT"
                        : "Subscribe"}
                    </button>
                    <h1>CS Free</h1>
                    {/* <h1>{item.name.toUpperCase()}</h1> */}
                  </div>
                </div>
              );
            } else if (
              (!item.free && authReducer.userData?.package === null) ||
              parseInt(authReducer.userData?.package?.amount) !== item.amount
            ) {
              return (
                <div className="sign-up upgrade">
                  <div className="free dollar">
                    <span className="span1"> ${item.amount}</span>
                  </div>
                  <div className="free-acc upgrade-acc">
                    <h2>GAIN EXCLUSIVE ACCESS:</h2>
                    <ul className="add">
                      <li>Ad free experiance</li>
                      <li>Infinite scroll when reading</li>
                      <li>
                        Get access to beta/stockpiled chapters and chapter in
                        the edit process
                      </li>
                    </ul>
                    <p>charged monthly OR one time payment for 30 day access</p>
                  </div>
                  <div className="free-cs upgrade-cs sss">
                    <button
                      className="btn3"
                      onClick={() => {
                        if (item?.name === "CS+") {
                          setcsplusSelected(true);
                        }
                        setmodalcontent(item);
                        setcontent(item);
                        openModal();
                      }}
                    >
                      {authReducer.userData?.package
                        ? item.amount > authReducer.userData?.package?.amount
                          ? "UPGRADE"
                          : "DOWNGRADE"
                        : "SUBSCRIBE"}
                    </button>

                    <h1>{item.name}</h1>
                  </div>
                </div>
              );
            } else if (
              authReducer.userData?.package?.amount > 5 &&
              authReducer.userData?.package?.amount <= 14
            ) {
              return (
                <div className="sign-up current">
                  <div className="free currt">
                    <span className="span1"> $9</span>
                  </div>
                  <div className="free-acc">
                    <h2>
                      Get unlimited access<br></br> to all novels!{" "}
                    </h2>
                    <p>charged monthly OR one time payment for 30 day access</p>
                  </div>
                  <div className="free-cs ">
                    {authReducer.userData?.package?.amount === 15 ||
                    authReducer.userData?.package?.amount === 9 ? (
                      <button className="btn1" style={{ cursor: "pointer" }}>
                        SUBSCRIBED
                      </button>
                    ) : null}
                    <h1>{item.name}</h1>
                  </div>
                </div>
              );
            } else if (authReducer.userData?.package?.amount >= 15) {
              return (
                <div className="sign-up current">
                  <div className="free currt">
                    <span className="span1"> $15</span>
                  </div>
                  <div className="free-acc">
                    <h2>
                      Get unlimited access<br></br> to all novels!
                    </h2>
                    <p>charged monthly OR one time payment for 30 day access</p>
                  </div>
                  <div className="free-cs ">
                    {authReducer.userData?.package?.amount === 15 ||
                    authReducer.userData?.package?.amount === 9 ? (
                      <button className="btn1" style={{ cursor: "pointer" }}>
                        SUBSCRIBED
                      </button>
                    ) : null}
                    <h1>{item.name}</h1>
                  </div>
                </div>
              );
            }
          })}

          {/* Packages Box End */}

          {/* {customdisabled ? (
          <div className="custom">
            <button
              type="button"
              className="btn us-active-btn custome"
              disabled
              onClick={() => {
                openModal();
                setmodalcontent({ product: "Custom Product" });
              }}
            >
              CUSTOM{" "}
            </button>
          </div>
        ) : (
          <div className="custom">
            <button
              type="button"
              className="btn us-active-btn custome"
              onClick={() => {
                openModal();
                setmodalcontent({ product: "Custom Product" });
                setupdateamount(true)
              }}
            >
              CUSTOM{" "}
            </button>
          </div>
        )}
        {customdisabled ? (
          <span className="customText">
            first cancel the subscribed package then try custom
          </span>
        ) : (
          ""
        )} */}
        </div>

        {/* <Modal
        show={stripemodal}
        onHide={() => {
          closestripeModal();
        }}
      > 
    <Modal.Header className="modal-header">
        

            <button
              type="button"
              className="close"
              data-dismiss="modal"
              onClick={closestripeModal}
            >
              &times;
            </button>
          </Modal.Header>
        <Stripe setkey={setKey} setStripemodal={setStripemodal} interval={interval}
        product={product}
        token={authReducer.accessToken}/>
      </Modal> */}

        <div className="subs-modal">
          <Modal
            show={isopen}
            onHide={() => { closeModal()}}
            className={`Modal subbsrcibe-modal ${csplusSelected ? 'modalWith-Csplus-warning' : ''}`}
          >
            <Modal.Header className="modal-header">
              <Modal.Title className="modal-title">
                {/* {!modalcontent.amount ? "Choose Amount" : ""} */}
              </Modal.Title>

              <button
                type="button"
                className="close"
                data-dismiss="modal"
                onClick={closeModal}
              >
                &times;
              </button>
            </Modal.Header>

            <Modal.Body>
              {isLoading ? (
                <div className="row">
                  <div className="loader">
                    <Loader
                      type="TailSpin"
                      color="darkgrey"
                      height={100}
                      width={100}
                    />
                  </div>
                </div>
              ) : (
                <div className="row">
                  <div className="form-group us-form">
                    <div className="modal-con">
                      {csplusSelected ? (
                        <p className="csplus-warning">
                          CS Plus features are not yet built out. Please give us
                          some time to finish the development of these feature.
                          If you still wish to upgrade your subscription to help
                          support CS Novels, it would be much appreciated. Thank
                          you!
                        </p>
                      ) : (
                        ""
                      )}
                      <div
                        onClick={() => {
                          setupdateamount(!updateamount);

                          if (modalcontent.product === "Custom Product") {
                            setmodalcontent(content);
                          } else {
                            setmodalcontent({ product: "Custom Product" });
                          }
                        }}
                        className="edittag"
                      >
                        <img
                          src={edit_modify_icon}
                          className="editlogo"
                          alt="edit"
                        />
                        I want to donate more
                      </div>
                      <div className="amountcontainer">
                        <div className="price__box">
                          {updateamount ? (
                            <input
                              type="text"
                              value={amount}
                              className="inputamount"
                              onChange={(e) => {
                                setAmount(e.target.value);
                              }}
                            />
                          ) : (
                            <h1>${modalcontent.amount}</h1>
                          )}

                          <span>/m</span>
                        </div>
                        <hr></hr>
                        <p style={{ marginTop: "-10px" }}>
                          Billing cycle will be on the {date.getDate()} of each
                          month
                        </p>
                      </div>
                    </div>
                    {/* ) : (
                  <>
                    <input
                      type="number"
                      value={amount}
                      placeholder="0"
                      onChange={(e) => {
                        setAmount(e.target.value);
                      }}
                      className="form-control"
                      id="amount"
                    />
                    <span className={!isSubscribe ? "Invalid " : ""}>
                      {!isSubscribe ? "Invalid " : "$"}
                    </span>
                  </>
                )}{" "} */}
                  </div>
                </div>
              )}
              {/* {!modalcontent.amount ? (
              <>
                <div className="row col-row">
                  <div className="col-lg-4 px-4">
                    <button
                      type="button"
                      className="btn us-active-btn"
                      onClick={(e) => {
                        setAmount(5);
                      }}
                    >
                      $5
                    </button>
                  </div>

                  <div className="col-lg-4 px-4">
                    <button
                      type="button"
                      className="btn us-active-btn"
                      onClick={(e) => {
                        setAmount(10);
                      }}
                    >
                      $10
                    </button>
                  </div>

                  <div className="col-lg-4 px-4">
                    <button
                      type="button"
                      className="btn us-active-btn"
                      onClick={(e) => {
                        setAmount(25);
                      }}
                    >
                      $25
                    </button>
                  </div>
                </div>
                <div className="row col-row">
                  <div className="col-lg-4 px-4">
                    <button
                      type="button"
                      className="btn us-active-btn"
                      onClick={(e) => {
                        setAmount(50);
                      }}
                    >
                      $50
                    </button>
                  </div>
                  <div className="col-lg-4 px-4">
                    <button
                      type="button"
                      className="btn us-active-btn"
                      onClick={(e) => {
                        setAmount(100);
                      }}
                    >
                      $100
                    </button>
                  </div>
                  <div className="col-lg-4 px-4">
                    <button
                      type="button"
                      className="btn us-active-btn"
                      onClick={(e) => {
                        setAmount(250);
                      }}
                    >
                      Custom Amount
                    </button>
                  </div>
                </div>
              </>
            ) : null} */}
              {!isLoading ? (
                <>
                  <div className="row">
                    <div className="col-md-12 lg-12 form-check-inline">
                      <h1>
                        {modalcontent.name ? modalcontent.name : "CUSTOM"}
                      </h1>

                      {/* <label className="form-check-label">
                  <input
                    type="checkbox"
                    style={{
                      height: "16px",
                      width: "16px",
                      marginRight: "10px",
                    }}
                    onChange={() => setchecked(!checked)}
                  ></input>{" "}
                  Subscribe For Monthly
                </label> */}
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-md-12 lg-12 checkbox-subscribe">
                      <div className="check-lable">
                        <input
                          type="checkbox"
                          checked={checked}
                          onChange={() => setchecked(!checked)}
                          id="check-1"
                        />
                        <span className="lock">
                          <i className="fas fa-lock-alt"></i>
                        </span>
                        <label for="check-1" className="check-1">
                          <div
                            className="my_chk"
                            onChange={() => setchecked(!checked)}
                          >
                            <span></span>
                          </div>
                          <div className="text">Subscribe For Monthly</div>
                        </label>
                      </div>
                    </div>
                  </div>
                  <div className="row subBtn-box">
                    {/* <StripeCheckout
    stripeKey = 'pk_test_51K7J3zEIGUZHqg4AQXRkFcz3FkVbBOa5MxjLqxY5z3EV5QpgJvDPmP285BvNt82FupjcBc8ZranqwU9rafxLKJTR009XtKs28i'
    token={handletoken}
    > */}
                    {/* <button
                type="button"
                className="btn us-active-btn last-btn"
                onClick={() => {
                  submit();
                }}
              >
                Continue
              </button> */}
                    {isSubscribe ? (
                      <StripeCheckout
                        stripeKey="pk_test_51K7J3zEIGUZHqg4AQXRkFcz3FkVbBOa5MxjLqxY5z3EV5QpgJvDPmP285BvNt82FupjcBc8ZranqwU9rafxLKJTR009XtKs28i"
                        // stripeKey="pk_live_51I3wozC8p7iB1sY1QKh5xU9YCXbbehcarE0elsoom9bKII4IsIl6ADPp1hsmYttnpGlC4BpKzymVdkwtCh6okcco00QHFzqKkE"
                        token={handleToken}
                        label={"CONTINUE"}
                        className="token"
                        billingAddress={true}
                        email={authReducer?.userData?.email}
                        name={authReducer?.userData?.name}
                      />
                    ) : null}
                    <p className="submittext">
                      Can cancel anytime in your profile {">"} Billing dashboard
                    </p>
                    {/* </StripeCheckout> */}
                  </div>
                </>
              ) : null}
            </Modal.Body>
            {!isLoading ? (
              <Modal.Footer>
                {csplusSelected ? (
                  <p className="modal-footer-text csplus-warning-click">
                    By completing this transaction, I understand that the
                    advertised features of this subscription tier are not yet
                    available and that paying this amount will not give me the
                    advertised features
                  </p>
                ) : (
                  <p className="modal-footer-text">
                    By clicking Continue, I hereby agree that I have read and I
                    agree and consent to the{" "}
                    <Link to="/UserAgreement">User Agreement</Link>, its
                    policies, the <Link to="/RefundPolicy">refund policy</Link>{" "}
                    and the <Link to="/PrivacyPolicy">Provacy Policy</Link>
                  </p>
                )}
              </Modal.Footer>
            ) : null}
          </Modal>
        </div>
      </div>
      <Footer />
    </div>
  );
}

const mapstatetoprops = ({ authReducer, booksReducer, libraryReducer }) => {
  return { authReducer, booksReducer, libraryReducer };
};
export default connect(mapstatetoprops, actions)(Subscription);

// export default Subscription;
