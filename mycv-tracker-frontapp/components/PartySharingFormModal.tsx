import React, {  useState } from "react";
import {
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,

  Input,
  Button,

  Row,
  Form,
  FormGroup,

  Label,
} from "reactstrap";
import { useUserState } from "../hooks/useUserState";

import { ShareResumePayload, shareResume } from "../apis/mycvtracker/resume";
import { useToast } from "../hooks/useToast";
import { alerts } from "../utils/alert-utils";


type Props = {
  selectedId: number;
  isOpen: boolean;
  onDismiss: () => void;
  updatePartySharingList: ()=> void
};

const DEFAULT_FORM_VALUE = {
  partyName: "",
  partyEmail: "",
  content: "",
}

const PartySharingFormModal = ({ onDismiss, isOpen, selectedId, updatePartySharingList }: Props) => {
  const { token } = useUserState();
  const { showErrorToast, showSuccessToast } = useToast();

  const [form, setForm] = useState<ShareResumePayload>(DEFAULT_FORM_VALUE);
  const [inSubmitting, setInSubmitting] = useState<boolean>(false);

  const handleChangeInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    setForm((prev) => ({ ...prev, [event.target.name]: event.target.value }));
  };


  const handleShareResume = async (event: React.FormEvent<HTMLFormElement>) => {
    try {
      setInSubmitting(true);

      event.preventDefault();
      await shareResume(selectedId, form,token);
      showSuccessToast("Successfully share the resume for party")
      await updatePartySharingList()
      setForm(DEFAULT_FORM_VALUE)
      onDismiss();
    } catch (e: any) {
      console.log(e);
      if (e.response?.status)
        showErrorToast(alerts[e?.response.status].message);
      else showErrorToast("Encounted an error, please try again later");
    }

    setInSubmitting(false);
  };

  return (
    <Modal isOpen={isOpen} toggle={onDismiss} animation="false" size="md">
      <ModalHeader toggle={onDismiss}>
        <div className="fs-3">
          <b>Sharing Resume</b>
        </div>
      </ModalHeader>
      <ModalBody>
        <Form onSubmit={handleShareResume}>
          <FormGroup>
            <Label for="partyName">Party Name</Label>
            <Input
              id="partyName"
              name="partyName"
              placeholder="Party Name"
              onChange={handleChangeInput}
              value={form.partyName}
              type="text"
            />
          </FormGroup>
          <FormGroup>
            <Label for="partyEmail">Party Email</Label>
            <Input
              id="partyEmail"
              name="partyEmail"
              placeholder="Party Email"
              onChange={handleChangeInput}
              value={form.partyEmail}
              type="email"
            />
          </FormGroup>

          <FormGroup>
            <Label for="content">Content</Label>
            <Input
              id="content"
              name="content"
              type="textarea"
              onChange={handleChangeInput}
              value={form.content}
            />
          </FormGroup>

          <Row className="mx-1">
            <Button color="primary" disabled={ inSubmitting }>{ !inSubmitting ? "Share" : "Sharing..." }</Button>
          </Row>
        </Form>
      </ModalBody>
      <ModalFooter />
    </Modal>
  );
};

export default PartySharingFormModal;
