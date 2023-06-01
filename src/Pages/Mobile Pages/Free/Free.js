import React, { useEffect } from 'react'
import Header from '../../../Components/Header'
import Footer from '../../../Components/Footer'
import MobileBookCardComponent from '../../../Components/Mobile/MobileBookCardComponent'
import { useSelector, useDispatch } from 'react-redux'
import { getAllBooks } from '../../../store/actions/actions'

const Free = () => {

    const dispatch = useDispatch()

    const { books } = useSelector(state => state.booksReducer)

    useEffect(() => {
        if (!books.length) dispatch(getAllBooks())
    }, [])

    const freeBooks = books?.filter(book => book.Access == "free")

    return (
        <div>
            <Header />
            <div className='layout-content'>
                <MobileBookCardComponent books={freeBooks} />
            </div>
            <Footer />
        </div>
    )
}

export default Free