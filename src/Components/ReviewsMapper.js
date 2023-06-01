
import moment from "moment";
import React from "react";
import StarRatings from "react-star-ratings";
import PLACEHOLDER from "../Assets/Images/dp-placeholder.jpg";
import { imageUrl } from "../config";

function ReviewsMapper({ item }) {
  
  return (
    <div className="comment-box">
      <div className="row">
        <div className="col-md-1 col-2 profileDpPCol">
          <img
          alt="profile-dp"
            src={
              item?.user?.profile_img !== undefined && item?.user?.profile_img !== null && item?.user?.profile_img.name !== null
                ? `${imageUrl}/${item?.user?.profile_img?.name}`
                : PLACEHOLDER
            }
            className="profile-image"
          ></img>
        </div>
        <div className="col-md-11 col-9">
          <h3 className="comment-box-head">
            <span className="userNameCommentBox">
              {`${item?.userId?.username} `}{" "}
            </span>
            <span>
              <img
              alt="comment-star"
                className="comment-head-img"
                src="https://cdn-icons-png.flaticon.com/512/2190/2190552.png"
              ></img>{" "}
              {/* <img
                className="comment-head-img"
                src="https://cdn-icons.flaticon.com/png/512/2566/premium/2566494.png?token=exp=1641277749~hmac=35dffb9fd4f99b007132ef425f322f44"
              ></img> */}
            </span>
          </h3>
          <span className="stars stars-3 ratingStars">
            <StarRatings
              rating={item.rate}

              starRatedColor="#fd8b2a"
              starDimension="20px"
              numberOfStars={5}
              starSpacing="1px"
              name="rating"
            />
          </span>
          <p className="comment userComment">{item?.comment}</p>
          {/* <div className="row comment-row">
            <div className="col-md-6">
              <span className="more-comment">
                <a href="/#">
                  <i className="fas fa-chevron-down"></i>
                </a>
              </span>
            </div>
          </div> */}
          <div className="row comment-row-2">
            <div className="col-md-4 col-12 padLeft_0_col">
              <span className="time">{`${moment(
                item?.createdAt
              ).fromNow()}`}</span>
            </div>
           
          </div>
        </div>
      </div>
    </div>
  );
}

export default ReviewsMapper;
