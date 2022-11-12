import Image from "next/image";
import React from "react";
import { Button, Col, Container, Row } from "reactstrap";

import CoverImage from "../assets/linkedin-profile-review-pic.png";

import styles from "../styles/cvservices.module.css";

const LinkedinWritingPage = () => {
  return (
    <Container className="py-4">
      <div>
        <Row className="text-center my-3">
          <h1>Linkedin Profile Writing</h1>
        </Row>
        <Row className="text-center my-3">
          <h2>Why use a Professional LinkedIn Profile Writer?</h2>
        </Row>
        <Col sm={{ size: 8, offset: 2 }} lg={{ size: 6, offset: 3 }}>
          <Row className="my-2">
            <p className="my-3">
              Setting up your LinkedIn profile but not sure how to start? Using a professional LinkedIn profile writer
              will ensure your profile looks its best, reads well, and doesn&apos;t contain any simple mistakes that
              could cost you a connection or opportunity. When it comes to job seeking, you need to think of yourself as
              a brand and LinkedIn as one of the best marketing tools. Using a professional LinkedIn profile writer will
              ensure that you are marketing yourself to prospective employers in the best possible light.
            </p>

            <p className="my-3">
              Our LinkedIn profile writing team comprises qualified and dedicated writers. Their combination of
              experience, skills and expertise will ensure that you have the highest standard LinkedIn profile content.
              We will use your skills, experience, education and achievements to fill in any blanks and construct a
              LinkedIn profile that will have top companies / recruiters in your industry wanting to connect.
            </p>
          </Row>
          <div>
            <Row>
              <Col md={7}>
                <Image src={CoverImage} height={185} alt="LinkedIn Profile Review" />
              </Col>

              <Col md={5}>
                <div className="bg-primary text-white p-2">
                  <ul className={styles.unorderedList}>
                    <li>Complete LinkedIn Profile Content writing / Branding</li>
                    <li>Look for Grammar and spelling mistakes</li>
                    <li>Keyword / Hashtag Optimisation suggestions</li>
                    <li>Networking group recommendations</li>
                    <li>Career History Mapping</li>
                    <li>Education & Qualification Mapping</li>
                    <li>Personalised LinkedIn URL</li>
                    <li>Unlimited rewriting / editing / updates for 2 months</li>
                    <li>Highlight areas of improvement</li>
                  </ul>
                  <h3 className="text-center mt-2">&pound;80.00</h3>
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

export default LinkedinWritingPage;
