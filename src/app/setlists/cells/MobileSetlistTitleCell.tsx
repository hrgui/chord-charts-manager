import * as React from "react";
import Link from "lib/layout/Link";
import { toDomDate } from "lib/utils/date";
import styled from "styled-components/macro";

interface MobileSetlistTitleCellProps {
  value?: string;
  data?: any;
}

const Container = styled.div`
  line-height: 1.5;
  padding-top: ${({ theme }) => theme.spacing()}px;
`;

class MobileSetlistTitleCell extends React.Component<any, any> {
  render() {
    const { data } = this.props;
    return (
      <Container>
        <Link to={`/setlist/${data.id}`}>{data.title}</Link>
        <div>{data.date && toDomDate(data.date)}</div>
        <div>{data.leader && data.leader}</div>
      </Container>
    );
  }
}

export default MobileSetlistTitleCell;
