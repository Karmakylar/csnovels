import React from "react";
import { useNavigate } from "react-router-dom";

function FooterLinksMapper({ item, mode  }) {

  const navigate = useNavigate();
  
  let bookName = item?.Title || item.label;
  
  
  return (
    <a
      href={item.link?item.link: '#'}      
      
      className="link-item"
      onClick={(e) => {
        e.preventDefault();
        if (mode === "categories") {
          navigate(`/search?category=${item.label}`, { state: { genre: item?.label || item?.Title } });
        } else if (mode === "sortBy") {
          navigate(`/book`, {
            replace: false,
            state: {
              book: item,
            },
          });
        }
      }}
    >
      {bookName?.length > 20 ? `${bookName?.substring(0, 27)}...` : bookName}
    </a>
  );
}

export default FooterLinksMapper;
