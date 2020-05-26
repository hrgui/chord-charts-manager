import React from "react";
import { gql } from "@apollo/client";
import { useQuery, useMutation } from "@apollo/client";
import { Table } from "lib/table/Table";
import { useIsAuthenticated } from "lib/hooks/useIsAuthenticated";
import { Redirect } from "react-router-dom";
import { Button, Tooltip, CircularProgress } from "@material-ui/core";
import { useSnackbar } from "notistack";

const GET_GROUPS = gql`
  query getGroups {
    list: groups {
      id
      name
      is_pending_join_request
    }
  }
`;

const JOIN_GROUP = gql`
  mutation joinGroup($id: ID) {
    joinGroup(id: $id) {
      id
      name
      pendingMembers
      members
      admins
      owner_uid
    }
  }
`;

export function ActionsCell({
  cell: {
    row: { original: data },
  },
}) {
  const [joinGroup, { loading }] = useMutation(JOIN_GROUP, {
    variables: {
      id: data.id,
    },
    refetchQueries: ["getGroups"],
    awaitRefetchQueries: true,
  });

  const { enqueueSnackbar } = useSnackbar();

  if (loading) {
    return <CircularProgress size={20} />;
  }

  return (
    <Tooltip
      title={
        data.is_pending_join_request &&
        "You have a pending request for this group."
      }
    >
      <div>
        <Button
          disabled={data.is_pending_join_request}
          onClick={async (e) => {
            await joinGroup();
            enqueueSnackbar(
              "Request to join group " + data.name + " submitted"
            );
          }}
        >
          Join
        </Button>
      </div>
    </Tooltip>
  );
}

export default () => {
  const [isAuthLoading, hasAuth] = useIsAuthenticated();
  const { data, error, loading } = useQuery(GET_GROUPS);

  // useMutation

  if (!isAuthLoading && !hasAuth) {
    return (
      <Redirect
        to={{
          pathname: "/login",
          state: { redirect: "/group/signup" },
        }}
      />
    );
  }

  if (loading || error) {
    return null;
  }

  return (
    <Table
      isPageTable
      emptyHeader="No groups are available for sign up right now."
      emptyAction="Bug a group admin to join a group."
      columns={[
        {
          accessor: "name",
          Header: "Group Name",
        },
        {
          id: "Actions",
          Header: "Actions",
          Cell: ActionsCell,
        },
      ]}
      data={data.list}
    />
  );
};
