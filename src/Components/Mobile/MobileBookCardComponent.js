import React from 'react'
import ChapterIcon from "../../Assets/book-icon-mobile.png"
import { getBook, favoriteThisBook } from '../../store/actions/actions'
import { useNavigate, useSearchParams } from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux';
import { toast } from "react-toastify";

const MobileBookCardComponent = ({ books }) => {

    const navigate = useNavigate();
    const dispatch = useDispatch()

    const [param, setParam] = useSearchParams()

    const { isLogin, accessToken } = useSelector(state => state.authReducer)

    const favoriteBookHandler = (_id) => {
        const data = {
            bookId: _id,
        };
        dispatch(favoriteThisBook(data, accessToken, "filteredBooks"))
    };

    return (
        <div>
            <div className='container selected-category'>
                {books?.map((book) => {
                    return (
                        <>
                            <div className='row'
                            >
                                <div className='col-3 py-1'
                                    onClick={() => {
                                        getBook(book)
                                        navigate("/book", {
                                            replace: false,
                                            state: {
                                                book: book,
                                                bookId: book?._id,
                                                bookName: book?.Title,
                                                bookImage: `${book?.Cover?.url || book?.image?.url}`,
                                            },
                                        })
                                    }}
                                >
                                    <img
                                        src={book?.image?.url || book.Cover.url}
                                        className='mobile-card-image cursor-pointer'
                                    />
                                </div>
                                <div className='col-9 py-1'
                                >
                                    <h6
                                    className='cursor-pointer'
                                        onClick={() => {
                                            getBook(book)
                                            navigate("/book", {
                                                replace: false,
                                                state: {
                                                    book: book,
                                                    bookId: book?._id,
                                                    bookName: book?.Title,
                                                    bookImage: `${book?.Cover?.url || book?.image?.url}`,
                                                },
                                            })
                                        }}
                                    >{book?.Title}</h6>
                                    <div className='d-flex justify-content-between'>
                                        <div>
                                            <span onClick={() => setParam({ category: book?.categories?.name, status: param.get("status") })} className='action-cat text-black-50 capitalize-text cursor-pointer'>{book?.categories?.name}</span>
                                        </div>
                                        <div>
                                            <span>{book?.releaseSchedule !== "completed" ? "Ongoing" : "Completed"}</span>
                                        </div>
                                    </div>
                                    <div>
                                        <p className="paid-p-des">{book?.Description?.length > 70
                                            ? `${book?.Description?.substring(0, 100)}`
                                            : book?.Description}...</p>
                                    </div>
                                    <div className='d-flex justify-content-between'>
                                        <div>
                                            <img src={ChapterIcon} />
                                            &nbsp;
                                            <small>{book?.chapters} Chapters</small>
                                        </div>
                                        <div className='text-black-50'>
                                            <i className="fa-regular fa-star"></i>
                                            &nbsp;
                                            <small>{book?.totalRates}</small>
                                            &nbsp;
                                            &nbsp;
                                            <i onClick={(e) => {
                                                e.stopPropagation();

                                                if (isLogin) {
                                                    favoriteBookHandler(book._id);
                                                } else {
                                                    toast.info("Login Required!");
                                                }
                                            }} className="fa fa-heart cursor-pointer" aria-hidden="true"></i>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </>
                    )
                })}

            </div>
        </div>
    )
}

export default MobileBookCardComponent