import React, { useEffect } from 'react'
import { useSearchParams } from "react-router-dom";
import { categories } from "../../../Constants/FilterBooksConstants"
import { useSelector, useDispatch } from "react-redux"
import { getAllBooks } from '../../../store/actions/actions';

const Categories = () => {

    const { books } = useSelector(state => state.booksReducer)
    const [params, setParams] = useSearchParams();
    const statusParam = params.get("status");
    const dispatch = useDispatch()

    const onExplore = (cat) => {
        setParams({ category: cat.genre, status: statusParam, mode: "selected" })
    }

    const countBooksPerCategory = (cat) => {

        if (cat.genre === "all") return books?.length

        let count = 0

        books?.forEach(book => {
            if (book.category.name === cat.genre) count++
        })

        return count
    }

    useEffect(() => {
        if (!books.length) dispatch(getAllBooks())
    }, [])



    return (
        <div>
            <div className="layout-content my-1 p-0 container">
                <div className='row' >
                    {categories.map((category) => {
                        return (
                            <div className='col-6  box row mobile-category-card' onClick={() => onExplore(category)}>
                                <div className='col-12 col-sm-6 p-0'>
                                    <p className='font-weight-bold mb-0'>{category.name}</p>
                                    <small className="text-black-50">{countBooksPerCategory(category)} books</small>
                                </div>
                                <div className='mobile-category-explore-box col-12 col-sm-6 p-0'>
                                    <p className='cursor-pointer'><small className="text-black-50">EXPLORE</small> <i className='fas fa-arrow-right'></i></p>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    )
}

export default Categories