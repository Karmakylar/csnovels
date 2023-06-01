import React from "react";


function OngoingNovelsMapper({ item, onClick }) {
  
  return (
    <div className="col-lg-2 col-md-3 col-sm-4 og-books">
      <div className="og-image-and-text-container">
        <img src={item?.Cover?.url} className="og-book-image" alt="og-book-image" />
        {/* <p className="mp-cs-text">CS</p> */}
        {/* <p className="og-book-status">{item.status} </p> */}
        {/* <p className="og-book-heading">{item.heading} </p> */}
      </div>
      <p className="og-book-title">
        {window.screen.width <= 768
          ? `${item?.title?.substring(0, 25)}...`
          : item?.title?.length > 40
          ? `${item?.title.substring(0, 40)}...`
          : item?.title}
      </p>
      <div className="bookmarks-chapters-div">
        <p>{`Chapters ${item?.chapters}`}</p>
      </div>
    </div>
  );
}

export default OngoingNovelsMapper;
