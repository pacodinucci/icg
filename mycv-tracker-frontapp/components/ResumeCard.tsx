import React from "react";
import { Button, ButtonGroup, Card, CardBody, Col, DropdownItem, DropdownMenu, DropdownToggle, Input, Label, Row, UncontrolledDropdown } from "reactstrap";
import styles from "../styles/Account.module.css";
import { Resume } from "../types/resume_types";
import { BsList } from "react-icons/bs";

const ResumeCard = ({
	resume: {
		id,
		resumeTitle,
		originalPreviewExpiresAt,
		previewExpiresAt,
		originalLinkId,
		maskedLinkId,
		uploadedAt,
		listingActive,
	},
  toggleSharingResumeModal
}: {
	resume: Resume;
  toggleSharingResumeModal: (referal : number) => void
}) => {
	return (
		<Card className={` mt-4 mb-4 px-5 py-2 mx-2`}>
			<CardBody className={styles.resumeCard}>
				<Row>
					<Col>
						<span className="fs-4 ">{resumeTitle}</span>
					</Col>
				</Row>
				<Row>
					<Col>
						<span>Original Expires at</span> <br />
						<span>{originalPreviewExpiresAt}</span>
					</Col>
					<Col>
						<span>Masked Expires at</span>
						<br />
						<span>{previewExpiresAt}</span>
					</Col>
				</Row>
				<Row>
					<Col>
						<span>Original Link</span>
						<br />
						<span>{originalLinkId}</span>
					</Col>
					<Col>
						<span>Masked Link</span>
						<br />
						<span>{maskedLinkId}</span>
					</Col>
				</Row>
				<Row>
					<Col>
						<span>Uploaded at</span>
						<br />
						<span>{uploadedAt}</span>
					</Col>
					<Col>
						<span>Listing</span>
						<br />
						<span>{listingActive}</span>
					</Col>
				</Row>
			</CardBody>
      <ButtonGroup className={`my-2 ${styles.cardMenuCtrl}`}>
        <UncontrolledDropdown>
          <DropdownToggle>
            <BsList size={20} />
          </DropdownToggle>
          <DropdownMenu end className="fs-5">
            <DropdownItem>Extend masked preview</DropdownItem>
            <DropdownItem>Extend original preview</DropdownItem>
            <DropdownItem onClick={() =>toggleSharingResumeModal(id)}>View Party Sharings</DropdownItem>
            <DropdownItem>Add to Cv Box</DropdownItem>
            <DropdownItem>Categorize Skill</DropdownItem>
          </DropdownMenu>
        </UncontrolledDropdown>
      </ButtonGroup>
		</Card>
	);
};

export default ResumeCard;
