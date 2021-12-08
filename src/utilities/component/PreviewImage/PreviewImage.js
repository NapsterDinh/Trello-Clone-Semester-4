import React from "react";
import { Modal } from "react-bootstrap";

import './PreviewImage.scss'

const PreviewImage = ({image, show, setShow}) => {
    return(
        <Modal 
        backdropClassName="modal-preview-image-backdrop"
        onHide={() => setShow(false)}
        show={show} className="modal-preview-image">
            <Modal.Header closeButton>
                <img src={image}></img>
            </Modal.Header>
            
        </Modal>
    )
}

export default PreviewImage