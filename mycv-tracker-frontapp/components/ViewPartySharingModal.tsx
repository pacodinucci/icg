import React, { useCallback, useEffect, useState } from "react";
import {
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  Table,
} from "reactstrap";
import { useUserState } from "../hooks/useUserState";
import { useToast } from "../hooks/useToast";
import { alerts } from "../utils/alert-utils";
import { BsShare } from "react-icons/bs";
import PartySharingFormModal from "./PartySharingFormModal";
import { getPartySharings } from "../apis/mycvtracker/partySharing";
import { PartySharing, Status } from "../types/partySharing_types";
import PagerWithoutNumber from "./PagerWithoutNumber";




const badgeClass = (status: string) => {
  const baseClassName = "badge ";
  if (status === Status.CANDIDATE_REVIEW) {
    return `${baseClassName} bg-secondary`;
  }
  if (status === Status.CANDIDATE_PASSED) {
    return `${baseClassName} bg-success`;
  }

  if (status === Status.CANDIDATE_INTERVIEW_BOOKED) {
    return `${baseClassName} bg-warning`;
  }
};

type Props = {
  selectedId: number;
  isOpen: boolean;
  onDismiss: (referralId: number) => void;
};

const DEFAULT_PAGE_SIZE = 10;

const ViewPartySharingModal = ({ onDismiss, isOpen, selectedId }: Props) => {
  const { token } = useUserState();
  const { showErrorToast } = useToast();
  const [isLoading, setIsLoading] = useState(false);

  const [openSharingForm, setOpenSharingForm] = useState(false);

  const [pagination, setPagination] = useState({
    totalpages: 10,
    currentPage: 1,
  });

  const [partySharings, setPartySharings] = useState<PartySharing[]>([]);

  const getPartySharingList = useCallback(
    async (pageNumber: number, pageSize = DEFAULT_PAGE_SIZE) => {
      if (!token || !selectedId) return;
      setIsLoading(true);
      setPagination({ totalpages: 10, currentPage: pageNumber });
      try {
        const response = await getPartySharings(
          selectedId,
          pageNumber,
          pageSize,
          token
        );
        setPartySharings(response || []);
      } catch (e: any) {
        console.log(e);
        if (e.response?.status)
          showErrorToast(alerts[e?.response.status].message);
        else showErrorToast("Encounted an error, please try again later");
      } finally {
        setIsLoading(false);
      }
    },
    [selectedId, showErrorToast, token]
  );

  const handleDismissModal = () => {
    onDismiss(0);
    setPartySharings([]);
  };

  useEffect(() => {
    console.log({ selectedId });
    getPartySharingList(pagination.currentPage, DEFAULT_PAGE_SIZE);
  }, [getPartySharingList, pagination.currentPage, selectedId]);

  return (
    <Modal
      isOpen={isOpen}
      toggle={handleDismissModal}
      animation="false"
      size="lg"
    >
      <ModalHeader toggle={handleDismissModal}>
        <div className="fs-3">
          <b>Party Sharings</b>
        </div>
      </ModalHeader>
      <ModalBody>
        {isLoading && <div className="text-secondary fs-5 my-2">Loading</div>}

        {!isLoading && (
          <>
            <div className="mb-4">
              <Button
                className="fs-5"
                color="primary d-flex align-items-center"
                onClick={() => setOpenSharingForm(!openSharingForm)}
              >
                <BsShare size={15} className="me-2" />
                Share to new party
              </Button>
            </div>

            <Table striped className="fs-5">
              <thead className="border-bottom border-dark">
                <tr>
                  <th>#</th>
                  <th>Party</th>
                  <th>Status</th>
                  <th>Expiration</th>
                </tr>
              </thead>
              <tbody>
              {!isLoading && !partySharings.length && <tr  className="text-secondary text-center fs-4 my-2 w-100"><td colSpan={4}>No party sharing found</td></tr>}
                {partySharings.map((item, idx) => {
                  return (
                    <tr key={item.id}>
                      <th scope="row">{idx + 1}</th>
                      <td>{item.partyName}</td>
                      <td>
                        <span className={badgeClass(item.status)}>
                          {item.status
                            .split("_")
                            .join(" ")}
                        </span>
                      </td>
                      <td>
                        {new Date(item.expiry)
                          .toISOString()
                          .replace(/T/, " ") // replace T with a space
                          .replace(/\..+/, "")}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </Table>
          </>
        )}
      </ModalBody>
      <ModalFooter className="d-flex justify-content-end">
        <PagerWithoutNumber
          onClickItem={getPartySharingList}
          current={pagination.currentPage}
          total={pagination.totalpages}
        />
      </ModalFooter>
      <PartySharingFormModal
        isOpen={openSharingForm}
        selectedId={selectedId}
        updatePartySharingList={() =>
          getPartySharingList(pagination.currentPage, DEFAULT_PAGE_SIZE)
        }
        onDismiss={() => setOpenSharingForm(!openSharingForm)}
      />
    </Modal>
  );
};

export default ViewPartySharingModal;
