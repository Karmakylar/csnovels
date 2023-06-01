import React from 'react';
import Modal from 'react-bootstrap/Modal';

const ModalRightComponent = ({ show, setShow, Component }) => {

    return (
        <div className='mobile-sidebar-right'>
        <Modal dialogClassName={`right-modal`} className="planModal" show={show} onHide={() => setShow(!show)}>
            {Component}
        </Modal>
        </div>
    )
}

export default ModalRightComponent