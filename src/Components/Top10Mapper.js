import React from "react";
import { connect } from "react-redux";
import { useNavigate } from "react-router-dom";
import StarRatings from "react-star-ratings";
import { imageUrl } from "../config";
import * as actions from "../store/actions/actions";

function Top10Mapper({  item, index,  getBook }) {
  const navigate = useNavigate();
  console.log(item)
  return (
    <div
      className="top10Books"
      onClick={() => {
        getBook(item);
        navigate(`/book`, {
          replace: false,
          state: {
            book: item,
            bookId: item?._id,
            bookName: item?.Title,
            bookImage: `${imageUrl}/${item?.image?.name || item?.Cover?.name}`,
          },
        });
      }}
    >
      <img  src={`${ item?.Cover?.url}`} className="top10-image" alt="top10_image" />
      <p className={`top10BookColor_${index + 1}`}>
        {index + 1 < 10 ? `0${index + 1}` : index + 1}
      </p>
      <div className="top10Books-details">
        <p className="top10-book-title">{item?.Title}</p>
        <div className="rating__box">
          <p className="top10-book-genre">{item?.category?.name}</p>
          <div className="star-and-rating">
            <StarRatings
              starDimension={"12"}
              rating={0}
              starRatedColor="#ffc240"
              numberOfStars={1}
              name="rating"
            />
            <p className="top10-book-rating">{
                      parseInt(item?.avgRate) +
                      "." +
                      parseInt((item?.avgRate % 1).toFixed(1).substring(2))
                    }</p>
          </div>
        </div>
      </div>
    </div>
  );
}

const mapstatetoprops = ({ authReducer, booksReducer }) => {
  return { authReducer, booksReducer };
};
export default connect(mapstatetoprops, actions)(Top10Mapper);
