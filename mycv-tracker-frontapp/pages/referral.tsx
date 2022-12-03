import Link from "next/link";
import React, { useCallback, useEffect, useState } from "react";
import { Breadcrumb, BreadcrumbItem, Button, Card, CardBody, Col, Container, Row } from "reactstrap";
import { getMyReferrals } from "../apis/mycvtracker/referrals";
import { useToast } from "../hooks/useToast";
import styles from "../styles/Account.module.css";
import { alerts } from "../utils/alert-utils";
import ReferralCard from "../components/ReferralCard";
import { useUserState } from "../hooks/useUserState";
import { Referral } from "../types/referral_types";

const Referral = () => {
  const { showErrorToast } = useToast();
  const { token } = useUserState();
  const [referrals, setReferrals] = useState<Referral[]>([]);

  const [pagination, setPagination] = useState({
    totalpages: 0,
    currentPage: 0,
  });

  const getMyReferralsList = useCallback(
    async (page: number, noOfRecords: number) => {
      try {
        const response = await getMyReferrals(page, noOfRecords, token);
        if (response) {
          console.log(response);
          setReferrals(response);
        }
      } catch (e: any) {
        console.log(e);
        if (e.response?.status) showErrorToast(alerts[e?.response.status].message);
        else showErrorToast("Encounted an error, please try again later");
      }
    },
    [showErrorToast, token]
  );
  useEffect(() => {
    getMyReferralsList(1, 10);
  }, [getMyReferralsList]);

  return (
    <Container className="fs-4 py-5">
      <Row>
        <h6 className="fs-1 my-3">Referral</h6>
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
              <BreadcrumbItem active>My Referral</BreadcrumbItem>
            </Breadcrumb>
          </CardBody>
        </Card>
      </Row>
      <Row>
        <h6 className="fs-3 my-3">List of Referrals</h6>
      </Row>
      <Card>
        <CardBody>
          <Row>
            <span>
              This section generates referral links for our portal users. At present it can generate job referral
              ,social and plain text links.
            </span>
          </Row>
          <Row>
            <Col>
              <Button color="danger">Generate Link</Button>
            </Col>
          </Row>
        </CardBody>
      </Card>
      <Container fluid className={styles.resumeContainer}>
        {referrals.map((referral, idx) => {
          return <ReferralCard referral={referral} key={idx} />;
        })}
      </Container>
    </Container>
  );
};

export default Referral;
