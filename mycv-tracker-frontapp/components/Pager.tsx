import React from "react";
import { Pagination, PaginationItem, PaginationLink } from "reactstrap";

type Props = {
  onClickItem: (pageNumber: number) => void;
  current: number;
  total: number;
};

const Pager = ({ onClickItem, current, total }: Props) => {
  return (
    <Pagination>
      <PaginationItem disabled={current <= 1}>
        <PaginationLink first onClick={() => onClickItem(1)} />
      </PaginationItem>
      <PaginationItem disabled={current <= 1}>
        <PaginationLink previous onClick={() => onClickItem(current - 1)} />
      </PaginationItem>
      {current - 2 > 0 && (
        <PaginationItem>
          <PaginationLink onClick={() => onClickItem(current - 2)}>{current - 2}</PaginationLink>
        </PaginationItem>
      )}
      {current - 1 > 0 && (
        <PaginationItem>
          <PaginationLink onClick={() => onClickItem(current - 1)}>{current - 1}</PaginationLink>
        </PaginationItem>
      )}
      <PaginationItem active>
        <PaginationLink>{current}</PaginationLink>
      </PaginationItem>
      {current + 1 <= total && (
        <PaginationItem>
          <PaginationLink onClick={() => onClickItem(current + 1)}>{current + 1}</PaginationLink>
        </PaginationItem>
      )}
      {current + 2 <= total && (
        <PaginationItem>
          <PaginationLink onClick={() => onClickItem(current + 2)}>{current + 2}</PaginationLink>
        </PaginationItem>
      )}
      <PaginationItem disabled={current + 1 > total}>
        <PaginationLink next onClick={() => onClickItem(current + 1)} />
      </PaginationItem>
      <PaginationItem disabled={current >= total}>
        <PaginationLink onClick={() => onClickItem(total)} last />
      </PaginationItem>
    </Pagination>
  );
};

export default Pager;
