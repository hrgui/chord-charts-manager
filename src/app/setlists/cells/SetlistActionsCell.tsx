import * as React from "react";
import SetlistActions from "../SetlistActions";

interface SetlistActionsCellProps {
  data?: any;
}

class SetlistActionsCell extends React.Component<any, any> {
  render() {
    const { data } = this.props;
    return <SetlistActions setlist={data} />;
  }
}

export default SetlistActionsCell;
