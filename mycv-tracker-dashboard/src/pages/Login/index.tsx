import React, {
  memo
} from "react";

import {
  Container,
  Button
} from "reactstrap";

import TopNavigation from "components/TopNavigation";

import {
  login
} from "service/auth";

const LoginPage = () : JSX.Element => {

  const onLoginClick = () : void => {
    login();
  };

  return (
    <div>
      <TopNavigation />

      <div>
        <Container>
          <div>
            Welcome, please login
          </div>

          <Button
            onClick={ onLoginClick }
            size="md"
            color="primary">Login</Button>
        </Container>
      </div>
    </div>
  );
};

export default memo(LoginPage);
