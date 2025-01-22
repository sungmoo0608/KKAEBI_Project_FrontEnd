import React from "react";
import { Modal, Button } from "react-bootstrap";

const BoardTargetModal = ({
  show,
  handleClose,
  handleSaveTarget,
  notice_target,
  setTarget,
}) => {
  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>공지 대상 변경</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className="">
          <label>공지 대상 변경</label>
          <select
            className="form-control"
            value={notice_target}
            onChange={(e) => setTarget(Number(e.target.value))}
          >
            <option value={1}>고객</option>
            <option value={2}>관리자</option>
            <option value={3}>전체</option>
          </select>
        </div>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          닫기
        </Button>
        <Button variant="success" onClick={handleSaveTarget}>
          저장
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default BoardTargetModal;
