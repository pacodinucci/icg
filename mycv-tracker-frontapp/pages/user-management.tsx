import Link from "next/link";
import React, { useCallback, useEffect, useState } from "react";
import { Breadcrumb, BreadcrumbItem, Card, CardBody, Container, Input, Row } from "reactstrap";
import { getAuthUsers } from "../apis/mycvtracker/userManagement";
import { useToast } from "../hooks/useToast";
import styles from "../styles/Account.module.css";
import { alerts } from "../utils/alert-utils";
import UserCard from "../components/UserCard";
import { useUserState } from "../hooks/useUserState";

const UserManagement = () => {
  const { showErrorToast } = useToast();
  const { token } = useUserState();

  const [users, setUsers] = useState([]);

  const getAuthUsersList = useCallback(async () => {
    try {
      const response = await getAuthUsers(token);
      if (response) {
        console.log(response);
        setUsers(response);
      }
    } catch (e: any) {
      console.log(e);
      showErrorToast(alerts[e.response.status].message);
    }
  }, [showErrorToast, token]);
  useEffect(() => {
    getAuthUsersList();
  }, [getAuthUsersList]);

  return (
    <Container className="fs-4 py-5">
      <Row>
        <h6 className="fs-1 my-3">User Management</h6>
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
              <BreadcrumbItem active>User Management</BreadcrumbItem>
            </Breadcrumb>
          </CardBody>
        </Card>
      </Row>
      <Row>
        <h6 className="fs-4 my-3">Search for user</h6>
        <Input type="email" placeholder="Enter Email to Search" />
      </Row>
      {users.map((user, idx) => {
        return <UserCard user={user} key={idx} />;
      })}
    </Container>
  );
};

export default UserManagement;
