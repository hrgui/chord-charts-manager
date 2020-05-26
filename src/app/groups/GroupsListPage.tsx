import React from "react";
import { gql } from "@apollo/client";
import { useQuery } from "@apollo/client";
import { Table } from "lib/table/Table";
import GroupNameCell from "./GroupNameCell";
import Link from "lib/layout/Link";

const GET_GROUPS = gql`
  {
    list: groups {
      id
      name
      acceptingMembers
    }
  }
`;

export default () => {
  const { data, error, loading } = useQuery(GET_GROUPS);

  if (loading || error) {
    return null;
  }

  return (
    <Table
      isPageTable
      emptyHeader="Empty in groups"
      emptyAction={
        <div>
          <Link to="/admin/group/new">Create a new group</Link> and it will show
          up here.
        </div>
      }
      columns={[
        {
          accessor: "id",
          Header: "ID",
          Cell: ({
            cell: {
              value,
              row: { original: data },
            },
          }) => {
            return <GroupNameCell value={value} data={data} />;
          },
        },
        {
          accessor: "name",
          Header: "Name",
          Cell: ({
            cell: {
              value,
              row: { original: data },
            },
          }) => {
            return <GroupNameCell value={value} data={data} />;
          },
        },
        {
          accessor: "acceptingMembers",
          Header: "Open",
          Cell: ({ cell: { value } }) => (value ? "Yes" : "No"),
        },
      ]}
      data={data.list}
    />
  );
};
