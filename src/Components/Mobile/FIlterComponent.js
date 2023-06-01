import React, { useState } from "react";
import { useSearchParams } from "react-router-dom"
import { useDispatch } from "react-redux";
import { emptySearchedBooks } from "../../store/actions/actions";

function FilterComponent({ setShowFilters }) {

    const dispatch = useDispatch()

    const [filter, setFilter] = useState(null)
    const [param, setParams] = useSearchParams()

    const category = param.get("category")
    const mode = param.get("mode")

    const onChange = (e) => {
        setFilter(e.target.value)
    }

    const onSubmit = (e) => {
        e.preventDefault()
        setParams({ category: category, status: filter, mode: mode })
        setShowFilters(false)
        dispatch(emptySearchedBooks())
    }

    return (
        <>
            <div className="my-2 p-2">
                <form onSubmit={onSubmit}>
                    <div className="text-center">
                        <span className="py-1 px-4 rounded-pill filter-close cursor-pointer" onClick={() => setShowFilters(false)}>
                            <i className="fa fa-angle-down" aria-hidden="true"></i>
                        </span>
                    </div>
                    <div className="row filter-head">
                        <div className="col-lg-12">
                            <h1>Filter by</h1>
                        </div>
                    </div>
                    {/* Will need this in future */}

                    {/* <div className="row filter-subhead">
                    <div className="col-lg-12">
                        <h1>Chapters</h1>
                    </div>
                </div> */}
                    {/* <div className="row">
                    <div className="filter-price">
                        <span>All</span>
                        <span>50</span>
                        <span>50-100</span>
                        <span>100-200</span>
                        <span>200-500</span>
                        <span>500-1000</span>
                        <span>1000</span>

                    </div>
                </div> */}
                    <div className="row filter-subhead">
                        <div className="col-lg-12">
                            <h1>Status</h1>
                        </div>
                    </div>
                    <div className="row">
                        <div className="filter-price">
                            <span>
                                <input id="all-filter" type='radio' onChange={onChange} name='sort' value="all" className="cusChkInpFilter" />
                                <label htmlFor="all-filter">All</label>
                            </span>
                            <span>
                                <input id="ongoing-filter" type='radio' onChange={onChange} name='sort' value="ongoing" className="cusChkInpFilter" />
                                <label htmlFor="ongoing-filter">Ongoing</label>
                            </span>
                            <span>
                                <input id="completed-filter" type='radio' onChange={onChange} name='sort' value="completed" className="cusChkInpFilter" />
                                <label htmlFor="completed-filter">Completed</label>
                            </span>
                        </div>
                    </div>
                    <div className="row">
                        <div className="fiter-btn">
                            <button>SUBMIT</button>
                        </div>
                    </div>
                </form>
            </div>
        </>
    );
}
export default FilterComponent;