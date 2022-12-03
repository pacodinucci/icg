import Link from "next/link";
import React, { useCallback, useEffect, useState } from "react";
import { Breadcrumb, BreadcrumbItem, Card, CardBody, Container, Row } from "reactstrap";
import { getNotes } from "../apis/mycvtracker/notes";
import { useToast } from "../hooks/useToast";
import styles from "../styles/Account.module.css";
import { alerts } from "../utils/alert-utils";

import { Note, NotesResponse } from "../types/note_types";
import NoteCard from "../components/NoteCard";
import Pager from "../components/Pager";
import { useUserState } from "../hooks/useUserState";

const Notes = () => {
  const { showErrorToast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const { token } = useUserState();
  const [notes, setNotes] = useState<Note[]>([]);

  const [pagination, setPagination] = useState({
    totalpages: 0,
    currentPage: 0,
  });

  const getNotesList = useCallback(
    async (pageNumber: number, pageSize = 10) => {
      if (!token) return;
      setIsLoading(true);
      try {
        const response = (await getNotes(pageNumber, pageSize, token)) as NotesResponse;
        setPagination({ totalpages: response.totalPages, currentPage: pageNumber });
        if (!response.empty) {
          setNotes(response.content);
        } else {
          setPagination((prev) => ({ ...prev, loading: false, moreAvalible: false }));
        }
      } catch (e: any) {
        console.log(e);
        if (e.response?.status) showErrorToast(alerts[e?.response.status].message);
        else showErrorToast("Encounted an error, please try again later");
      } finally {
        setIsLoading(false);
      }
    },
    [showErrorToast, token]
  );
  useEffect(() => {
    getNotesList(1, 10);
  }, [getNotesList]);

  return (
    <Container className="fs-4 py-5">
      <Row>
        <h6 className="fs-1 my-3">Notes</h6>
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
              <BreadcrumbItem active>Notes</BreadcrumbItem>
            </Breadcrumb>
          </CardBody>
        </Card>
      </Row>
      <Row>
        {notes.map((note, index) => (
          <NoteCard note={note} key={index} />
        ))}
      </Row>
      <Pager onClickItem={getNotesList} current={pagination.currentPage} total={pagination.totalpages} />
    </Container>
  );
};

export default Notes;
