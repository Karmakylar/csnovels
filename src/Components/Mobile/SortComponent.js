import React, { useState } from "react";
import { useSearchParams } from "react-router-dom"


function SortComponent({ setShowSorts }) {

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
        setShowSorts(false)
    }

    return (
        <>
            <div className="sort-container my-2 p-2">
                <form onSubmit={onSubmit}>
                    <div className="text-center ">
                        <span className="py-1 px-4 rounded-pill filter-close cursor-pointer" onClick={() => setShowSorts(false)}>
                            <i className="fa fa-angle-down" aria-hidden="true"></i>
                        </span>
                    </div>
                    <div className="row filter-head">
                        <div className="col-lg-12">
                            <h1>Sort by</h1>
                        </div>
                    </div>
                    <div className="sort-filter">
                        <label for="popular" className="radioBtn"><input type="radio" id="popular" name="sort" value="popular" onChange={onChange} /><i></i><span>Popular</span></label>

                        <label for="rates" className="radioBtn"><input type="radio" id="rates" name="sort" value="rates" onChange={onChange} /><i></i><span>Rates</span></label>

                        <label for="updated" className="radioBtn"><input type="radio" id="updated" name="sort" value="updated" onChange={onChange} /><i></i><span>Updated</span></label>
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
export default SortComponent;