import React, { useEffect, useState } from 'react'
import MobileBookCardComponent from '../../../Components/Mobile/MobileBookCardComponent'
import { useSearchParams } from "react-router-dom"
import FilterModal from "../../../Components/Common/ModalBottomComponent"
import FilterComponent from '../../../Components/Mobile/FIlterComponent'
import SortComponent from "../../../Components/Mobile/SortComponent"
import Loader from "react-loader-spinner";
import { useDispatch } from "react-redux"
import { emptySearchedBooks } from '../../../store/actions/actions'


const SelectedCategory = ({ booksReducer, isLoading }) => {

  const [params] = useSearchParams()
  const [showFilters, setShowFilters] = useState(false)
  const [showSorts, setShowSorts] = useState(false)
  const { filteredBooks, searchedBooks, isSearched } = booksReducer
  const dispatch = useDispatch()

  const category = params.get("category")

  const searchedBooksVisibility = (filt, search) => {
    if (isSearched) {
      return !search.length ? <h3 className='text-center'>Your Search : Searched Text Does Not Match Any Book</h3> : <MobileBookCardComponent books={search} />
    }

    if (filt.length) {
      return <MobileBookCardComponent books={filt} />
    } else {
      return <h3 className='text-center'>No Books Found!</h3>
    }
  }

  useEffect(() => {
    return () => dispatch(emptySearchedBooks())
  }, [])

  return (

    <div className='selected-category'>
      <div className='container filter-header'>
        <div className='d-flex justify-content-between mb-3'>
          <div className='filter-header-category capitalize-text'>
            <span>{!isSearched ? category : "Search..."}</span>
          </div>
          <div className='filter-header-filters'>
            <div>
              <span onClick={() => setShowFilters(!showFilters)}>Filters <i className="fa fa-angle-down" aria-hidden="true"></i></span>
              &nbsp;
              &nbsp;
              <span onClick={() => setShowSorts(!showSorts)}>Sort <i className="fa fa-angle-down" aria-hidden="true"></i></span>
            </div>
          </div>
        </div>
      </div>

      {
        isLoading ?
          <div className="loader">
            <Loader
              type="TailSpin"
              color="darkgrey"
              height={100}
              width={100}
            />
          </div>
          :
          searchedBooksVisibility(filteredBooks, searchedBooks)
      }


      <FilterModal show={showFilters} setShow={setShowFilters} Component={<FilterComponent setShowFilters={setShowFilters} />} />
      <FilterModal show={showSorts} setShow={setShowSorts} Component={<SortComponent setShowSorts={setShowSorts} />} />


    </div>
  )
}

export default SelectedCategory