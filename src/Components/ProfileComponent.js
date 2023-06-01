import React from 'react'
import CsFreeImg from "../Assets/cs-free-profile.png"
import CsProImg from "../Assets/cs-pro-profile.png"
import CsExclusiveImg from "../Assets/cs-exclusive-profile.png"

const ProfileComponent = () => {
    return (
        <div>
            <div className='layout-content'>
                <div className='my-3'>
                    <h1 className='text-center bold-text'>Sign Up Today!</h1>
                </div>
                <div className='image-section text-center'>
                    <div>
                        <img src={CsFreeImg} />
                    </div>
                    <br />
                    <div>
                        <img src={CsProImg} />
                    </div>
                    <br />
                    <div>
                        <img src={CsExclusiveImg} />
                    </div>
                    <br />
                </div>
            </div>
        </div>
    )
}

export default ProfileComponent