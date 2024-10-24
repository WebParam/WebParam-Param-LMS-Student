"use client";

import { Modal } from "react-bootstrap";
import styles from "../../../../../styles/modal/NotificationsModal.module.css";

type WarningModalProps = {
  show: boolean;
  onHide: () => void;
  onConfirm: () => void;
};

const WarningModal: React.FC<WarningModalProps> = ({ show, onHide, onConfirm }) => {
  return (
    <Modal
      className="modal fade"
      id="warningModal"
      size="lg"
      show={show}
      onHide={onHide}
      centered
      contentClassName={styles.customModalContent}
    >
      <Modal.Header className="modal-header">
        <h5 className="modal-title" id="warningModalLabel">
          Important Information
        </h5>
        <button type="button" onClick={onHide} className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </Modal.Header>
      <Modal.Body className="modal-body">
        <p>Please read the following instructions carefully before starting the assessment:</p>
        <ul>
          <li>You have 1 hour to complete the assessment.</li>
          <li>Make sure you have a stable internet connection.</li>
          <li>Do not refresh the page during the assessment.</li>
          <li>Ensure you have all necessary materials ready.</li>
        </ul>
      </Modal.Body>
      <Modal.Footer>
        <button type="button" onClick={onConfirm} className="btn btn-lg btn-dark text-light btn-outline-dark">
          I Understand
        </button>
      </Modal.Footer>
    </Modal>
  );
};

export default WarningModal;