import React, { useCallback, useState } from "react";

import { Modal, ModalBody, ModalHeader, ModalFooter, Button, Input, Label } from "reactstrap";
import { sendForgotPasswordRequest } from "../apis/mycvtracker";
import { useToast } from "../hooks/useToast";

type Props = {
  isOpen: boolean;
  onDismiss: () => void;
};

const ForgotPassword = ({ isOpen, onDismiss }: Props) => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const { showSuccessToast, showErrorToast } = useToast();

  const handleClick = useCallback(
    async (_email: string) => {
      try {
        setLoading(true);
        await sendForgotPasswordRequest(_email);
        onDismiss();
        showSuccessToast("Password reset email sent.");
      } catch (e: any) {
        showErrorToast(e.message);
      } finally {
        setLoading(false);
      }
    },
    [onDismiss, showSuccessToast, showErrorToast]
  );

  const handleChangeInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value);
  };

  return (
    <Modal isOpen={isOpen} toggle={onDismiss}>
      <ModalHeader toggle={onDismiss}>Forgot Password</ModalHeader>
      <ModalBody>
        <Label for="forgotEmail">Email</Label>
        <Input name="forgotEmail" type="email" id="forgotEmail" value={email} onChange={handleChangeInput} />
      </ModalBody>
      <ModalFooter>
        <Button disabled={loading} color="primary" onClick={() => handleClick(email)}>
          Reset Password
        </Button>
      </ModalFooter>
    </Modal>
  );
};

export default ForgotPassword;
