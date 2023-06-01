import React from "react";
import Header from "../Components/Header";
import Footer from "../Components/Footer";
import { useState, useEffect } from "react";

import LibraryNovelsMapper from "../Components/LibraryNovelsMapper";
import {connect} from 'react-redux';
import * as actions from '../store/actions/actions';
// import { booksReducer } from "../store/reducers/booksReducer";


const Library = ({libraryReducer}) => {
  const [library, setLibrary] = useState([]);

  useEffect(() => {
    setLibrary(libraryReducer);
    
    
  }, [libraryReducer]);
  
  return (
    <>
      <Header /> 
      <div className="heading-div">
        <p className="heading">Library</p>
        <div className="sub-headings">
          <p className="sh-1 mb-0">Library</p>
          <p className="sh-2 mb-0">History</p>
          <i
            className="fas fa-paint-brush"
            style={{ color: "#3b66f5", marginLeft: "700px", marginTop: "40px" }}
          ></i>
          <p className="sh-3">Edit</p>
          <p className="sh-4">Recently read</p>
        </div>
      </div>
      <div className="container">
        <div className="row">
            {library.map((item, idx) => (
              
              <LibraryNovelsMapper
                key={idx}
                item={item}
               
              />
            ))}
        </div>
      </div>
      <Footer />
    </>
  );
};

const mapstatetoprops = ({booksReducer,libraryReducer})=>{
  return {booksReducer,libraryReducer};
}
export default connect(mapstatetoprops,actions)(Library);
