import * as React from "react";
import Link from "lib/layout/Link";

interface SetlistTitleCellProps {
  value?: string;
  data?: any;
}

class SetlistTitleCell extends React.Component<any, any> {
  render() {
    const { value, data } = this.props;
    return <Link to={`/setlist/${data.id}`}>{value}</Link>;
  }
}

export default SetlistTitleCell;
