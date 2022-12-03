import Link from "next/link";
import React, { useCallback, useEffect, useState } from "react";
import { Breadcrumb, BreadcrumbItem, Card, CardBody, Container, Row } from "reactstrap";
import { getMyNotifications } from "../apis/mycvtracker/notifications";
import NotificationsTable from "../components/NotificationTable";
import { useToast } from "../hooks/useToast";
import { useUserState } from "../hooks/useUserState";
import styles from "../styles/Account.module.css";
import { alerts } from "../utils/alert-utils";
import { Notification } from "../types/notification_types";

const Notifications = () => {
  const { showErrorToast } = useToast();
  const { token } = useUserState();
  const [notifications, setNotifications] = useState<Notification[]>([]);

  const getNotificationsList = useCallback(async () => {
    try {
      const response = await getMyNotifications(token);
      if (response) {
        console.log(response);
        setNotifications(response);
      }
    } catch (e: any) {
      console.log(e);
      if (e.response?.status) showErrorToast(alerts[e?.response.status].message);
      else showErrorToast("Encounted an error, please try again later");
    }
  }, [showErrorToast, token]);
  useEffect(() => {
    getNotificationsList();
  }, [getNotificationsList]);
  return (
    <Container className="fs-4 py-5">
      <Row>
        <h6 className="fs-1 my-3">Notifications</h6>
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
              <BreadcrumbItem active>Notifications</BreadcrumbItem>
            </Breadcrumb>
          </CardBody>
        </Card>
      </Row>
      <Row>
        <h6 className="fs-3 my-3">List of Notifications</h6>
      </Row>
      <Row>{<NotificationsTable notifications={notifications} />}</Row>
    </Container>
  );
};

export default Notifications;
