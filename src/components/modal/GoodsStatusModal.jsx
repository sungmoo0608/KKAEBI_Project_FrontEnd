import React from "react";
import { Modal, Button } from "react-bootstrap";

const GoodsStatusModal = ({
  show,
  handleClose,
  handleSaveStatus,
  status,
  setStatus,
}) => {
  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>상품 상태 변경</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className="">
          <label>상품 상태 선택</label>
          <select
            className="form-control"
            value={status}
            onChange={(e) => setStatus(Number(e.target.value))}
          >
            <option value={0}>준비중</option>
            <option value={1}>판매중</option>
            <option value={9}>판매중지</option>
          </select>
        </div>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          닫기
        </Button>
        <Button variant="success" onClick={handleSaveStatus}>
          저장
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default GoodsStatusModal;
