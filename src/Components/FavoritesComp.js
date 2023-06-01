
import React, { useEffect } from "react";

import OngoingNovelsMapper from "./OngoingNovelsMapper";



function FavoritesComp({ title, books, from, favoriteBookHandler }) {

  // const favoriteBookHandler = (item) => {

  //   const data = {
  //     bookId: item,
  //   };


  //   favoriteThisBook(data, accessToken, "favoritedBooks")
  // };

// console.log('books FavoritesComp',books)

  return (
    <div className="section-div ongoing_novel aa ">
      <div className="section-heading-div">
        <p className="section-heading">{title || "MY FAVORITES"}</p>
      </div>

      <div className="books_sec">
        <div className="container-1240">
          <div className="books_wraper">
              {books?.map((item, idx) => (
                <OngoingNovelsMapper
                  key={idx}
                  item={item}
                  favoriteBookHandler={favoriteBookHandler}
                  from={from}
                />
              ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default FavoritesComp;
