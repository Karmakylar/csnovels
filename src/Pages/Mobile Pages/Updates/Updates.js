import React, { useEffect, useState } from 'react'
import { useNavigate } from "react-router-dom"
import Header from '../../../Components/Header'
import Footer from '../../../Components/Footer'
import updateBusiness from "../../../Business/UpdatesBusiness"
import { apiUrl } from '../../../config'
import axios from 'axios'

const Updates = () => {

    const navigate = useNavigate()

    const [recentchapter, setrecentchapter] = useState([]);

    const getrecentchapters = async () => {
        const res = await axios.get(`${apiUrl}/chapter/recentlyCreateChapters`);
        setrecentchapter(res.data.data);
    };

    useEffect(() => {
        getrecentchapters();
    }, [])

    return (
        <div>
            <Header />
            <div className='layout-content'>
                <div className='mt-3 pb-1 text-center recent-chap-box'>
                    <h4>Recent Chapter Updates</h4>
                    <small>TAP TO BEGIN READING</small>
                </div>
                <table className='updates-table-mobile table table-striped'>
                    
                    {recentchapter?.map((chap) => {
                        return (
                            <tr>
                                <td>{chap.book.Title}</td>
                                <td className='bold-text' onClick={() => {
                                    navigate(
                                        `/ReadBookPage/${chap.book?._id}/${chap._id}`,
                                        {
                                            replace: false,
                                            state: {
                                                bookName: chap.book?.Title,
                                                bookImage: `${chap.book?.Cover?.url}`,
                                                currchapter: chap,
                                            },
                                        })
                                }
                                }>{chap?.name?.split("Chapter")[1]}</td>
                                {
                                    console.log('updateBusiness ',updateBusiness)
                                }
                                <td>{updateBusiness.formatTimeToLocal(chap.createdAt)}</td>
                            </tr>
                        )
                    })}
                </table>
            </div>
            <Footer />
        </div>
    )
}

export default Updates