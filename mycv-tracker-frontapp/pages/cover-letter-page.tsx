import Image from "next/image";
import React from "react";
import { Button, Col, Container, Row } from "reactstrap";

import CoverImage from "../assets/graduate-cv-pic.png";
import styles from "../styles/cvservices.module.css";

const CoverLetterPage = () => {
  return (
    <Container className="py-4">
      <div>
        <Row className="text-center my-3">
          <h1>Cover Letter Page</h1>
        </Row>
        <Col sm={{ size: 8, offset: 2 }} lg={{ size: 6, offset: 3 }}>
          <Row className="my-2">
            <p className="my-3">
              A CV Cover Letter is what an employer reads first. Thus it has utmost importance, and it gets the
              necessary attention to your skills in relation towards any job you apply for. Cover letter writing is a
              marketing tool for the jobseeker, where it acts as an overview to promote select skills and achievements
              for the job.
            </p>

            <p className="my-3">
              At MY CV Tracker, we act as cover letter help for those struggle promoting their strengths and abilities.
              Our team of skilled CV professionals will assist you in portraying core accomplishments and abilities so
              that your skills will match with what the employers are seeking!
            </p>
            <p className="my-3">
              A CV cover letter is a concise way of telling the hiring manager why they should be interviewing you. With
              the help of our excellent and definite cover letters, you can put forth your positive professional
              attributes. Our team of experts takes your skill sets and mould them with professional jargon to produce a
              cover letter that will give you an edge over anyone else applying for the job.
            </p>
          </Row>
          <div>
            <Row>
              <Col md={7}>
                <Image src={CoverImage} height={150} alt="Graduate CV" />
              </Col>

              <Col md={5}>
                <div className="bg-primary text-white p-2">
                  <ul className={styles.unorderedList}>
                    <li>Bespoke Industry Template Cover Letter</li>
                    <li>All work reviewed and independently proofread</li>
                    <li>Letter Supplied in Word / PDF Format</li>
                    <li>Unlimited rewriting / editing for 1 month</li>
                    <li>Letter Tracker TM</li>
                  </ul>

                  <h3 className="text-center mt-2">&pound;40.00</h3>
                </div>

                <div className="d-flex justify-content-center align-items-center">
                  <Button color="primary" className="my-4" type="button">
                    ORDER HERE
                  </Button>
                </div>
              </Col>
            </Row>
          </div>
        </Col>
      </div>
    </Container>
  );
};

export default CoverLetterPage;
