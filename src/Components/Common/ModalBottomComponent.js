import React from 'react';
import Modal from 'react-bootstrap/Modal';

const ModalComponent = ({ show, setShow, Component }) => {

    return (
        <Modal dialogClassName="bottom-modal" show={show} onHide={() => setShow(!show)}>
            {Component}
        </Modal>
    )
}

export default ModalComponent