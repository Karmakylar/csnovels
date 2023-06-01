import React from "react";

const LibraryNovelsMapper = ({ item }) => {
    var str = item.title
  return (
    // <div className="col-md-12">
    <div className="books-display">
      <img src={item?.Cover?.url} alt="book display"/>
      <p className="book-title">
          {str.length > 20 && str.substring(0,20)}...
      </p>
      <p>{item.chapters}</p>
    </div>
    // </div>
  );
};

export default LibraryNovelsMapper;
