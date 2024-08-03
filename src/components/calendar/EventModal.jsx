import React, { useState, useEffect } from "react";
import { Modal, Button, Form } from "react-bootstrap";

const EventModal = ({ show, handleClose, handleSave, event }) => {
  const [label, setLabel] = useState("");
  const [title, setTitle] = useState("");
  const [location, setLocation] = useState("");
  const [start, setStart] = useState("");
  const [end, setEnd] = useState("");
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");

  useEffect(() => {
    if (event) {
      setLabel(event.label || "");
      setTitle(event.title || "");
      setLocation(event.location || "");
      setStart(event.start_time ? event.start_time.split("T")[0] : "");
      setEnd(event.end_time ? event.end_time.split("T")[0] : "");
      setStartTime(event.start_time ? event.start_time.split("T")[1] : "");
      setEndTime(event.end_time ? event.end_time.split("T")[1] : "");
    }
  }, [event]);

  const handleSubmit = () => {
    if (!label) {
      alert("카테고리를 선택하세요.");
      return;
    }
    if (!title) {
      alert("제목을 입력하세요.");
      return;
    }
    if (!start) {
      alert("시작 날짜를 선택하세요.");
      return;
    }
    if (!end) {
      alert("종료 날짜를 선택하세요.");
      return;
    }

    // 모든 필드가 유효하면 handleSave를 호출하여 저장 처리
    handleSave({
      calendar_id: event.calendar_id,
      label,
      title,
      location,
      start_time: `${start}T${startTime}`,
      end_time: `${end}T${endTime}`,
    });
    handleClose();
  };

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>
          이벤트 {event && event.calendar_id ? "수정" : "추가"}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group controlId="formEventLabel">
            <Form.Label>카테고리</Form.Label>
            <Form.Control
              as="select"
              value={label}
              onChange={(e) => setLabel(e.target.value)}
            >
              <option value="">카테고리를 선택하세요</option>
              <option value="작업">작업</option>
              <option value="휴식">휴식</option>
              <option value="수면">수면</option>
              <option value="개인생활">개인생활</option>
              <option value="건강">건강</option>
              <option value="기타">기타</option>
            </Form.Control>
          </Form.Group>
          <Form.Group controlId="formEventTitle">
            <Form.Label>제목</Form.Label>
            <Form.Control
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </Form.Group>
          <Form.Group controlId="formEventLocation">
            <Form.Label>장소</Form.Label>
            <Form.Control
              type="text"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
            />
          </Form.Group>
          <Form.Group controlId="formEventStart">
            <Form.Label>시작 날짜</Form.Label>
            <Form.Control
              type="date"
              value={start}
              onChange={(e) => setStart(e.target.value)}
            />
            <Form.Label>시작 시간</Form.Label>
            <Form.Control
              type="time"
              value={startTime}
              onChange={(e) => setStartTime(e.target.value)}
            />
          </Form.Group>
          <Form.Group controlId="formEventEnd">
            <Form.Label>종료 날짜</Form.Label>
            <Form.Control
              type="date"
              value={end}
              onChange={(e) => setEnd(e.target.value)}
            />
            <Form.Label>종료 시간</Form.Label>
            <Form.Control
              type="time"
              value={endTime}
              onChange={(e) => setEndTime(e.target.value)}
            />
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          취소
        </Button>
        <Button variant="primary" onClick={handleSubmit}>
          저장
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default EventModal;
