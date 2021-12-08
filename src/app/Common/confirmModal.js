import React from 'react'
import { Modal, Button } from 'react-bootstrap'
import HTMLReactPaser from 'html-react-parser'
import { MODAL_ACTION_CLOSE, MODAL_ACTION_CONFIRM } from 'utilities/constants'

function ConfirmModal(props) {
  const { title, content, show, onAction } = props

  return (
    <Modal
      show={show}
      size="sm"
      onHide={() => onAction(MODAL_ACTION_CLOSE)}
      backdrop="static"
      backdropClassName="confirm-modal"
      keyboard={false}
      animation={false} //fix warning
    >
      <Modal.Header closeButton>
        <Modal.Title className="modal-title">{HTMLReactPaser(title)}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {HTMLReactPaser(content)}
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={() => onAction(MODAL_ACTION_CLOSE)}>
              Close
        </Button>
        <Button variant="primary" onClick={() => onAction(MODAL_ACTION_CONFIRM)}>Understood</Button>
      </Modal.Footer>
    </Modal>
  )
}
export default ConfirmModal