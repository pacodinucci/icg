import React from "react";
import { Button, Card, CardBody, Col, Input, Label, Row, Table } from "reactstrap";
import styles from "../styles/Account.module.css";
import { Notification } from "../types/notification_types";

const NotificationsTable = ({ notifications }: { notifications: Notification[] }) => {
  return (
    <Card>
      <CardBody>
        <Table>
          <thead>
            <tr>
              <th className="fs-5">Reference</th>
              <th className="fs-5">Name</th>
              <th className="fs-5">Event Type</th>
              <th className="fs-5">Notifications Count</th>
              <th className="fs-5">Last Tracked Time</th>
              <th className="fs-5">Context</th>
              <th className="fs-5">Actions</th>
            </tr>
          </thead>
          <tbody>
            {notifications.map((notification, idx) => {
              return (
                <tr key={idx}>
                  <td className="fs-5">{notification.agency}</td>
                  <td className="fs-5">{notification.trackedResumeName}</td>
                  <td className="fs-5">{notification.eventType}</td>
                  <td className="fs-5">{notification.notificationsCount}</td>
                  <td className="fs-5">{notification.lastTrackedTime}</td>
                  <td className="fs-5">{}</td>
                  <td className="fs-5">
                    <Button color="primary">Actions</Button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </Table>
      </CardBody>
    </Card>
  );
};

export default NotificationsTable;
