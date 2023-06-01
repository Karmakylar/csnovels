import React from 'react'
import { Link, useNavigate } from 'react-router-dom';
import dropdown_cs_img from "../../Assets/dropdown_cs_img.png";
import { logout } from '../../store/actions/actions';
import { useDispatch, useSelector } from "react-redux"

const MobileProfile = () => {

    const dispatch = useDispatch()
    const navigate = useNavigate();

    const { userData } = useSelector(state => state.authReducer)

    const handleLogout = (cb) => {
        new Promise((resolve, reject) => {
            resolve();
        })
            .then(() => {
                navigate("/", { replace: true });
            })
            .then(() => {
                dispatch(logout());
            })
            .then(() => {
                window.localStorage.clear();
            })
            .then(() => {
                window.location.reload();
            });
    };

    return (
        <div className='mobile-profile-sidebar'>
            <div className='my-2 pt-4 d-flex justify-content-center'>
                <div
                    className="user-acc-circle-dropdown"
                >
                    <p className="user-acc-label-dropdown">
                        {userData?.firstName?.substring(0, 1) || userData?.username?.substring(0, 1)}
                    </p>
                </div>
                &nbsp;
                &nbsp;
                <div className='d-flex flex-column'>
                    <span className='h5 m-0'>{userData?.username || userData?.firstName}</span>
                    <span>{userData?.email}</span>
                    {
                        <span><i className="fa-solid fa-star"></i> {(userData?.package?.product?.name == "free" || userData?.package?.product?.name == null) ? "CS Free" : "CS Pro"}</span>
                    }
                </div>
            </div>

            <div>
                <div>
                    {userData?.package?.product?.name !== "CS+" ? (
                        <div className="dropDownImgCS_header">
                            <img src={dropdown_cs_img} />
                        </div>
                    ) : null}
                </div>
            </div>

            <div className='mobile-profile-sidebar-links'>
                <Link to="/profile">My Profile</Link>
                {/* <Link to="/subscription">Subscription</Link> */}
                <Link to="/profile?tab=2">Favorites</Link>
                <Link to="/profile?tab=3">Bookmarks</Link>
                <Link to="/profile">Invite Friends</Link>
                <Link to="/profile">Contact Support</Link>
            </div>

            <div className='text-right m-2'>
                <button className='btn' onClick={handleLogout}>Sign Out</button>
            </div>

        </div>
    )
}

export default MobileProfile