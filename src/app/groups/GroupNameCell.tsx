import * as React from "react";
import Link from "lib/layout/Link";

class GroupNameCell extends React.Component<any, any> {
  render() {
    const { value, data } = this.props;
    return <Link to={`/admin/group/${data.id}/edit`}>{value}</Link>;
  }
}

export default GroupNameCell;
