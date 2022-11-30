import React from "react";
import { Button, Card, CardBody, Col, Input, Label, Row } from "reactstrap";
import styles from "../styles/Account.module.css";
import { Note } from "../types/note_types";

const NoteCard = ({
  note: { agency, createdDate, recruiter, toRecruiter, notes, targetList, referContent },
}: {
  note: Note;
}) => {
  return (
    <Card className="mt-4 mb-4 px-lg-5 py-lg-2">
      <CardBody className={styles.noteCard}>
        <Row>
          <Col xs={12} md={6}>
            <span className="fs-4">{agency}</span>
          </Col>
          <Col xs={12} md={6}>
            <span className="fs-6">Last Updated On: {createdDate}</span>
          </Col>
        </Row>
        <Row>
          <Col xs={12} md={6}>
            <Label>Recruiter Name</Label>
            <Input placeholder={recruiter} />
          </Col>
          <Col>
            <Label>Recruiter Email</Label>
            <Input placeholder={toRecruiter} />
          </Col>
        </Row>
        <Row>
          <Label>Notes</Label>
          <Input placeholder="Notes" />
        </Row>
        <Row>
          <Col xs={12} md={6} className="d-flex flex-column align-items-start">
            <Button color="danger">Delete</Button>
            <Input type="textarea" className="my-2" placeholder="referGroup" />
            <Button color="danger">Refer Candidates</Button>
          </Col>
          <Col xs={12} md={6} className="d-flex flex-column align-items-start my-3 my-md-0">
            <Button color="primary">Update</Button>
            <Input type="textarea" className="my-2" placeholder="referContent" />
            <Button color="primary">Campaign Candidates</Button>
          </Col>
        </Row>
      </CardBody>
    </Card>
  );
};

export default NoteCard;
