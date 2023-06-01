import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import ReactPaginate from "react-paginate";
import {
  getpackage,
  Cancelsubs,
  Canceltimesubs,
  getpackagehistory,
} from "../../store/actions/actions";
import * as types from "../../store/actions/actionType";
import * as actions from "../../store/actions/actions";
import { connect, useDispatch } from "react-redux";
import { Modal } from "react-bootstrap";
import { toast } from "react-toastify";
// import { PaymentRequestButtonElement } from "@stripe/react-stripe-js";
import { BsDownload } from "react-icons/bs";
import { Switch, FormControlLabel, FormGroup } from "@mui/material";
import cancelPlan_img from "../../Assets/Images/cancel_icon.png";

const BillingComponent = ({ authReducer }) => {
  const [packages, setpackages] = useState([]);
  const [isopen, setisopen] = useState(false);
  const [immediate, setimmediate] = useState(false);
  const [isload, setisload] = useState(true);

  const [histor, sethistor] = useState([]);
  var navigate = useNavigate();
  const dispatch = useDispatch();
  const [page, setpage] = useState(1);
  const [data, setdata] = useState([]);
  useEffect(async () => {
    if (!authReducer.isLogin) {
      navigate("/home");
    }

    // sethistor(await getpackagehistory(authReducer.accessToken));
  }, []);

  const openModal = () => {
    setisopen(true);
  };
  useEffect(() => {
    setdata(histor.slice(0, 5));
  }, [histor]);

  useEffect(() => {
    if (authReducer?.userData?.package?.interval === "one-time") {
      setimmediate(true);
    } else {
      setimmediate(false);
    }
  }, [authReducer?.userData?.package?.interval]);

  var pageCount;
  const value = parseInt(histor?.length / 5);

  if (histor?.length == value * 5) {
    pageCount = value;
  } else {
    pageCount = parseInt(histor?.length / 5) + 1;
  }

  const handlePageClick = (e) => {
    const selectedPage = e.selected;
    setpage(selectedPage + 1);
  };

  useEffect(() => {
    // setdata(histor.slice((page - 1) * 5, (page - 1) * 5 + 5));
  }, [page]);

  const closeModal = () => {
    setisopen(false);
  };

  const packagecancel = async () => {
    var response;
    if (immediate) {
      response = await Cancelsubs(authReducer.accessToken);

      dispatch({
        type: "CANCEL_SUBSCRIPTION",
        payload: null,
      });
    } else {
      response = await Canceltimesubs(authReducer.accessToken);
    }

    if (response.success) {
      toast.success(response?.msg || "Subscription Cancelled");

      sethistor(await getpackagehistory(authReducer.accessToken));
    } else {
      toast.error("Something went wrong!");
    }
    closeModal();
    setisload(!isload);

    // var response;
    // if (immediate) {
    //   response = await Cancelsubs(authReducer.accessToken);
    // } else {
    //   response = await Canceltimesubs(authReducer.accessToken);
    // }

    // if (!response.success) {

    //   dispatch({
    //     type: types.SUBSCRIPTION,
    //     payload: null,
    //   });
    //   toast.success(response?.data?.msg);
    // } else {
    //   dispatch({
    //     type: types.SUBSCRIPTION,
    //     payload: null,
    //   });

    //   toast.error(response.data.msg);
    // }
  };

  return (
    <>
      <div className="container BillingContainer containerFullMobBillPg">
        <div className="sec-3">
          <h1>Subscription</h1>
          {authReducer.userData.package ? (
            <div className="subscription">
              <div className="row feature-border alignBaseline_responsive">
                <div className="col-lg-8 col-md-8 col-sm-8 col-8 my_subs_div_1 alignBaseline_responsive">
                  <div className="col-lg-5 col-md-6 col-sm-12 col-12">
                    <div className="sub-method text-nowrap">
                      <h6>YOUR CURRENT PLAN</h6>
                    </div>
                  </div>
                  <div className="col-lg-7 col-md-6 col-sm-12 col-12">
                    <div className="sub-method">
                      <p>
                        {" "}
                        {authReducer?.userData?.package?.product?.name} , $
                        {authReducer?.userData?.package?.amount} per month
                      </p>
                    </div>
                  </div>
                </div>
                <div className="col-lg-4 col-sm-4 col-4 my_subs_div_2">
                  <div className="sub-method subscBtnMain">
                    <button
                      type="button"
                      className="btn subscBtnsBilling"
                      onClick={() => {
                        navigate("/subscription");
                      }}
                    >
                      Change plan
                    </button>
                  </div>
                </div>
              </div>
              <div className="row feature-border alignBaseline_responsive">
                <div className="col-lg-8 col-md-8 col-sm-8 col-8 my_subs_div_1 alignBaseline_responsive">
                  <div className="col-lg-5 col-md-6 col-sm-12 col-12">
                    <div className="sub-method">
                      <h6>BILLING CYCLE</h6>
                    </div>
                  </div>
                  <div className="col-lg-7 col-md-6 col-sm-12 col-12">
                    <div className="sub-method">
                      <p>
                        {/* your will be charge ${packages.amount} on {date} */}
                        {authReducer?.userData?.package?.interval ||
                          "Not Found"}
                      </p>
                    </div>
                  </div>
                </div>
                <div className="col-lg-4 col-sm-4 col-4 my_subs_div_2">
                  <div className="sub-method"></div>
                </div>
              </div>
              <div className="row feature-border alignBaseline_responsive">
                <div className="col-lg-8 col-md-8 col-sm-8 col-8 my_subs_div_1 alignBaseline_responsive">
                  <div className="col-lg-5 col-md-6 col-sm-12 col-12">
                    <div className="sub-method">
                      <h6>PAYMENT INFORMATION</h6>
                    </div>
                  </div>
                  <div className="col-lg-7 col-md-6 col-sm-12 col-12">
                    <div className="sub-method d-flex align-items-center">
                      <svg
                        style={{ width: "3.5625rem", height: "2.9375rem" }}
                        fill="#939393"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 50 50"
                        width="50px"
                        height="50px"
                      >
                        <path d="M 5 7 C 2.242188 7 0 9.242188 0 12 L 0 38 C 0 40.757813 2.242188 43 5 43 L 45 43 C 47.757813 43 50 40.757813 50 38 L 50 12 C 50 9.242188 47.757813 7 45 7 Z M 29.6875 19.40625 C 31.050781 19.40625 32.46875 19.96875 32.46875 19.96875 L 31.96875 22.40625 C 31.96875 22.40625 30.890625 21.6875 29.9375 21.6875 C 28.46875 21.6875 27.9375 22.167969 27.9375 22.8125 C 27.9375 24.074219 32.03125 24.296875 32.03125 27.125 C 32.03125 29.476563 29.113281 31.09375 27 31.09375 C 24.886719 31.09375 23.78125 30.46875 23.78125 30.46875 L 24.3125 28.09375 C 24.3125 28.09375 25.417969 28.75 27.125 28.75 C 28.828125 28.75 29.0625 28.023438 29.0625 27.71875 C 29.0625 25.914063 25 26.417969 25 22.90625 C 25 20.964844 26.585938 19.40625 29.6875 19.40625 Z M 16.46875 19.625 L 19.625 19.625 L 15.125 30.75 L 11.875 30.75 L 9.5 21.75 C 9.5 21.75 11.996094 23.023438 13.53125 26.46875 C 13.597656 26.886719 13.78125 27.5625 13.78125 27.5625 Z M 20.78125 19.625 L 23.78125 19.625 L 22 30.75 L 19.03125 30.75 Z M 36.8125 19.625 L 39.90625 19.625 L 42.1875 30.75 L 39.5 30.75 L 39.1875 29.15625 L 35.5 29.15625 L 34.90625 30.75 L 31.96875 30.75 Z M 6.25 19.65625 L 10.8125 19.65625 C 11.976563 19.65625 12.40625 20.75 12.40625 20.75 L 13.40625 25.8125 C 12.054688 21.453125 6.25 19.65625 6.25 19.65625 Z M 37.9375 22.84375 L 36.3125 27.03125 L 38.75 27.03125 Z" />
                      </svg>
                      <p className="ml-2">Card</p>
                    </div>
                  </div>
                </div>
                <div className="col-lg-4 col-sm-4 col-4 my_subs_div_2">
                  <div className="sub-method subscBtnMain">
                    <button
                      type="button"
                      className="btn subscBtnsBilling"
                      onClick={() => {
                        navigate("/subscription");
                      }}
                    >
                      Change Method
                    </button>
                  </div>
                </div>
              </div>
              <div className="row feature-border alignBaseline_responsive">
                <div className="col-lg-8 col-md-8 col-sm-8 col-8 my_subs_div_1 alignBaseline_responsive">
                  <div className="col-lg-5 col-md-6 col-sm-12 col-12">
                    <div className="sub-method">
                      <h6>CANCEL</h6>
                    </div>
                  </div>
                  <div className="col-lg-5 col-md-6 col-sm-12 col-12">
                    <div className="sub-method text-nowrap">
                      <p>Cancel at the ending of billing period</p>
                    </div>

                    {authReducer?.userData?.package?.interval !== "one-time" ? (
                      <div
                        className="sub-check"
                        style={{ "margin-bottom": "10px" }}
                      >
                        <FormGroup>
                          <FormControlLabel
                            control={
                              <Switch
                                checked={immediate}
                                onChange={() => setimmediate(!immediate)}
                              />
                            }
                            label={
                              immediate
                                ? "Immediate cancel"
                                : "Cancel at the end of billing period"
                            }
                          />
                        </FormGroup>
                      </div>
                    ) : null}
                  </div>
                </div>
                <div className="col-lg-4 col-sm-4 col-4 my_subs_div_2">
                  <div className="sub-method subscBtnMain">
                    <button
                      type="button"
                      className="btn subscBtnsBilling"
                      onClick={() => openModal()}
                    >
                      Cancel Subscription
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            // <div className="subscription">
            //   <h1>No Any package Subscribe</h1>
            //   <p>
            //     click <Link to="/subscription">here</Link> for subcription
            //   </p>
            // </div>
            <div className="subscription">
              <div className="row feature-border alignBaseline_responsive">
                <div className="col-lg-8 col-md-8 col-sm-8 col-8 my_subs_div_1 alignBaseline_responsive">
                  <div className="col-lg-5 col-md-6 col-sm-12 col-12">
                    <div className="sub-method text-nowrap">
                      <h6>YOUR CURRENT PLAN</h6>
                    </div>
                  </div>
                  <div className="col-lg-7 col-md-6 col-sm-12 col-12">
                    <div className="sub-method">
                      <p>CS FREE, Free Forever</p>
                    </div>
                  </div>
                </div>
                <div className="col-lg-4 col-sm-4 col-4 my_subs_div_2">
                  <div className="sub-method subscBtnMain">
                    <button
                      type="button"
                      className="btn subscBtnsBilling"
                      onClick={() => {
                        navigate("/subscription");
                      }}
                    >
                      Change plan
                    </button>
                  </div>
                </div>
              </div>
              <div className="row feature-border alignBaseline_responsive">
                <div className="col-lg-8 col-md-8 col-sm-8 col-8 my_subs_div_1 alignBaseline_responsive">
                  <div className="col-lg-5 col-md-6 col-sm-12 col-12">
                    <div className="sub-method">
                      <h6>BILLING CYCLE</h6>
                    </div>
                  </div>
                  <div className="col-lg-7 col-md-6 col-sm-12 col-12">
                    <div className="sub-method">
                      <p> You have no active subscription. </p>
                      <Link to="/subscription">
                        <p
                          style={{
                            fontWeight: "bold",
                            color: "black",
                            textDecoration: "underline",
                            paddingTop: "0.1rem",
                            fontSize: "0.975rem",
                          }}
                        >
                          SUBSCRIBE NOW!
                        </p>
                      </Link>
                    </div>
                  </div>
                </div>
                <div className="col-lg-4 col-sm-4 col-4 my_subs_div_2">
                  <div className="sub-method"></div>
                </div>
              </div>
              <div className="row feature-border alignBaseline_responsive">
                <div className="col-lg-8 col-md-8 col-sm-8 col-8 my_subs_div_1 alignBaseline_responsive">
                  <div className="col-lg-5 col-md-6 col-sm-12 col-12">
                    <div className="sub-method">
                      <h6>PAYMENT INFORMATION</h6>
                    </div>
                  </div>
                  <div className="col-lg-7 col-md-6 col-sm-12 col-12">
                    <div className="sub-method d-flex align-items-center">
                      <svg
                        style={{ width: "3.5625rem", height: "2.9375rem" }}
                        fill="#939393"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 50 50"
                        width="50px"
                        height="50px"
                      >
                        <path d="M 5 7 C 2.242188 7 0 9.242188 0 12 L 0 38 C 0 40.757813 2.242188 43 5 43 L 45 43 C 47.757813 43 50 40.757813 50 38 L 50 12 C 50 9.242188 47.757813 7 45 7 Z M 29.6875 19.40625 C 31.050781 19.40625 32.46875 19.96875 32.46875 19.96875 L 31.96875 22.40625 C 31.96875 22.40625 30.890625 21.6875 29.9375 21.6875 C 28.46875 21.6875 27.9375 22.167969 27.9375 22.8125 C 27.9375 24.074219 32.03125 24.296875 32.03125 27.125 C 32.03125 29.476563 29.113281 31.09375 27 31.09375 C 24.886719 31.09375 23.78125 30.46875 23.78125 30.46875 L 24.3125 28.09375 C 24.3125 28.09375 25.417969 28.75 27.125 28.75 C 28.828125 28.75 29.0625 28.023438 29.0625 27.71875 C 29.0625 25.914063 25 26.417969 25 22.90625 C 25 20.964844 26.585938 19.40625 29.6875 19.40625 Z M 16.46875 19.625 L 19.625 19.625 L 15.125 30.75 L 11.875 30.75 L 9.5 21.75 C 9.5 21.75 11.996094 23.023438 13.53125 26.46875 C 13.597656 26.886719 13.78125 27.5625 13.78125 27.5625 Z M 20.78125 19.625 L 23.78125 19.625 L 22 30.75 L 19.03125 30.75 Z M 36.8125 19.625 L 39.90625 19.625 L 42.1875 30.75 L 39.5 30.75 L 39.1875 29.15625 L 35.5 29.15625 L 34.90625 30.75 L 31.96875 30.75 Z M 6.25 19.65625 L 10.8125 19.65625 C 11.976563 19.65625 12.40625 20.75 12.40625 20.75 L 13.40625 25.8125 C 12.054688 21.453125 6.25 19.65625 6.25 19.65625 Z M 37.9375 22.84375 L 36.3125 27.03125 L 38.75 27.03125 Z" />
                      </svg>
                      <p className="ml-2">No Card on File</p>
                    </div>
                  </div>
                </div>
                <div className="col-lg-4 col-sm-4 col-4 my_subs_div_2">
                  <div className="sub-method subscBtnMain">
                    <button
                      type="button"
                      className="btn subscBtnsBilling"
                      onClick={() => {
                        navigate("/subscription");
                      }}
                    >
                      Change Method
                    </button>
                  </div>
                </div>
              </div>
              <div className="row feature-border alignBaseline_responsive">
                <div className="col-lg-8 col-md-8 col-sm-8 col-8 my_subs_div_1 alignBaseline_responsive">
                  <div className="col-lg-5 col-md-6 col-sm-12 col-12">
                    <div className="sub-method">
                      <h6>CANCEL</h6>
                    </div>
                  </div>
                  <div className="col-lg-5 col-md-6 col-sm-12 col-12">
                    <div className="sub-method text-nowrap">
                      <p>Cancel at the ending of billing period</p>
                    </div>
                  </div>
                </div>
                <div className="col-lg-4 col-sm-4 col-4 my_subs_div_2">
                  <div className="sub-method subscBtnMain">
                    <button
                      type="button"
                      className="btn subscBtnsBilling"
                      onClick={() => openModal()}
                    >
                      Cancel Subscription
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
      <div className="container containerFullMobBillPg">
        <div className="sec-4">
          <h1 className="historyHeading_bill">History</h1>
          <div className="history">
            <table className="history-edit">
              <tr className="head-edit">
                <th>INVOICE</th>
                <th>AMOUNT</th>
                <th>STATUS</th>
                <th className="historyTab_Date">DATE</th>
              </tr>
              <tbody>
                {data?.map((item) => {
                  console.log(item);
                  return (
                    <tr key={item._id}>
                      <td data-label="invoice">
                        <a href={item?.invoice}>
                          <button type="button" className="btn  invoicebtn">
                            <BsDownload
                              style={{
                                width: "40px !important",
                                height: "10px !important",
                              }}
                            />
                          </button>
                        </a>
                      </td>
                      <td data-label="amount">{item?.amount} $</td>
                      <td data-label="status">
                        {item.status !== "pending"
                          ? item?.active
                            ? "Current"
                            : "PAID"
                          : "Pending"}
                      </td>
                      <td data-label="start">
                        {item.status !== "pending"
                          ? item?.start?.split("T")[0]
                          : null}
                      </td>
                      {/* <td data-label="end">
                        {item.status !== "pending"
                          ? item?.end?.split("T")[0]
                          : null}
                      </td> */}
                    </tr>
                  );
                })}
              </tbody>
              {/* <tfoot> */}
              <tr className="tr_pagination">
                <td colSpan={4}>
                  <ReactPaginate
                    previousLabel={
                      <span className="pagPrev">
                        <i style={{ fontSize: "24px" }} className="fas">
                          &#xf104;
                        </i>
                        <span>PREV</span>
                      </span>
                    }
                    nextLabel={
                      <span className="pagNext">
                        <span>NEXT</span>
                        <i style={{ fontSize: "24px" }} className="fas">
                          &#xf105;
                        </i>
                      </span>
                    }
                    breakLabel={"..."}
                    breakClassName={"break-me"}
                    pageCount={pageCount}
                    marginPagesDisplayed={2}
                    pageRangeDisplayed={5}
                    onPageChange={handlePageClick}
                    containerClassName={"pagination"}
                    subContainerClassName={"pages pagination"}
                    activeClassName={"active"}
                  />
                </td>
              </tr>
              {/* </tfoot> */}
            </table>
          </div>
        </div>
      </div>
      <Modal
        show={isopen}
        onHide={() => closeModal()}
        className="Modal cancelSubscription_modal"
      >
        <Modal.Header className="modal-header canceltext ">
          <Modal.Title className="modal-title ">CHANGE PLAN</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="row col-row">
            {/* <p>{packages.interval === "monthly" ? "You cannot subscribe any package until the time of previous subscription in ended":"abc"}</p> */}
            <img src={cancelPlan_img}></img>
            <p>
              <span>Are you sure</span> you want to change your subscription and{" "}
              <span>lose access to locked books and/or features?</span>
            </p>
          </div>
          <div className="row col-row">
            <div className="col-lg-3 px-3"></div>
            <div className="col-lg-12 col-12 cancelModalBtn_main">
              <button
                type="button"
                className="cancelSubsModal_btns"
                onClick={(e) => {
                  closeModal();
                }}
              >
                No
              </button>

              <button
                type="button"
                className="cancelSubsModal_btns"
                onClick={(e) => {
                  packagecancel();
                }}
              >
                Yes
              </button>
            </div>

            <div className="col-lg-3 px-3"></div>
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
};

const mapstatetoprops = ({ authReducer, booksReducer, libraryReducer }) => {
  return { authReducer, booksReducer, libraryReducer };
};
export default connect(mapstatetoprops, actions)(BillingComponent);
