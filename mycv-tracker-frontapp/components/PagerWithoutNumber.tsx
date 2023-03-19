import React from "react";
import { Pagination, PaginationItem, PaginationLink } from "reactstrap";

type Props = {
  onClickItem: (pageNumber: number) => void;
  current: number;
  total: number;
};

const PagerWithoutNumber = ({ onClickItem, current, total }: Props) => {
  return (
    <Pagination>
      {/* <PaginationItem disabled={current <= 1}>
        <PaginationLink first onClick={() => onClickItem(1)} />
      </PaginationItem> */}
      <PaginationItem disabled={current <= 1}>
        <PaginationLink previous onClick={() => onClickItem(current - 1)} />
      </PaginationItem>
      <PaginationItem active>
        <PaginationLink>{current}</PaginationLink>
      </PaginationItem>
      <PaginationItem disabled={current + 1 > total}>
        <PaginationLink next onClick={() => onClickItem(current + 1)} />
      </PaginationItem>
      {/* <PaginationItem disabled={current >= total}>
        <PaginationLink onClick={() => onClickItem(total)} last />
      </PaginationItem> */}
    </Pagination>
  );
};

export default PagerWithoutNumber;
