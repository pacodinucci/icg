import Link from "next/link";
import { useCallback, useEffect, useState } from "react";
import { Breadcrumb, BreadcrumbItem, Button, Card, CardBody, Col, Container, Row } from "reactstrap";
import { getMySkills } from "../apis/mycvtracker/skills";
import { useToast } from "../hooks/useToast";
import styles from "../styles/Account.module.css";
import { alerts } from "../utils/alert-utils";
import SkillCard from "../components/SkillCard";
import { useUserState } from "../hooks/useUserState";
import { Skills } from "../types/skills_types";

const SkillCategories = () => {
  const { showErrorToast } = useToast();

  const [skills, setSkills] = useState<Skills[]>([]);
  const { token } = useUserState();

  const getSkillsList = useCallback(async () => {
    try {
      const response = await getMySkills(token);
      if (response) {
        console.log(response);
        setSkills(response);
      }
    } catch (e: any) {
      console.log(e);
      showErrorToast(alerts[e.response.status].message);
    }
  }, [showErrorToast, token]);
  useEffect(() => {
    getSkillsList();
  }, [getSkillsList]);
  return (
    <Container className="fs-4 py-5">
      <Row>
        <h6 className="fs-1 my-3">Skill Categories</h6>
      </Row>
      <Row>
        <Card>
          <CardBody>
            <Breadcrumb>
              <BreadcrumbItem>
                <Link className={styles.link} href="/account">
                  Home
                </Link>
              </BreadcrumbItem>
              <BreadcrumbItem active>Skill Categories</BreadcrumbItem>
            </Breadcrumb>
          </CardBody>
        </Card>
      </Row>
      <Card className="my-3">
        <CardBody>
          <Row>
            <span>Duis leo ante, vulputate at nunc non, maximus ultrices metus.</span>
          </Row>
          <Row>
            <Col>
              <Button color="danger">New Category</Button>
            </Col>
          </Row>
        </CardBody>
      </Card>
      <Container className={styles.resumeContainer}>
        {skills.map((skill, idx) => {
          return <SkillCard skill={skill} key={idx} />;
        })}
      </Container>
    </Container>
  );
};

export default SkillCategories;
