import React, {
  memo
} from "react";
import {
  Container
} from "reactstrap";

const TopNavigation = () : JSX.Element => {
  return (
    <header>
      <Container>
        Top Navigation
      </Container>
    </header>
  );
};

export default memo(TopNavigation);
