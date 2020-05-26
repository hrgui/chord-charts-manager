import React from "react";
import GroupForm from "./GroupForm";
import { useMutation, useQuery } from "@apollo/client";
import { gql } from "@apollo/client";
import { Loading } from "lib/layout/Loading";
import { useSnackbar } from "notistack";

const FullGroupFragment = gql`
  fragment FullGroupFragment on Group {
    id
    name
    acceptingMembers
    pendingMembers
    admins
    members
    updated_date
    created_date
  }
`;

const READ_QUERY = gql`
  query getGroup($id: ID!) {
    group(id: $id) {
      ...FullGroupFragment
    }
  }
  ${FullGroupFragment}
`;

const CREATE_MUTATION = gql`
  mutation createGroup($data: GroupInput!) {
    createGroup(record: $data) {
      ...FullGroupFragment
    }
  }
  ${FullGroupFragment}
`;

const UPDATE_MUTATION = gql`
  mutation updateGroup($id: ID!, $data: GroupInput!) {
    updateGroup(id: $id, record: $data) {
      ...FullGroupFragment
    }
  }
  ${FullGroupFragment}
`;

function prepareData({ id, __typename, invites, ...data }) {
  return {
    ...data,
  };
}

function GroupEditPage(props) {
  const { enqueueSnackbar } = useSnackbar();
  const [updateGroup] = useMutation(UPDATE_MUTATION);
  const { data, error, loading }: any = useQuery(READ_QUERY, {
    variables: {
      id: props.id,
    },
  });

  if (loading) {
    return <Loading />;
  }
  if (error) {
    return <div>Error! {error.message}</div>;
  }

  return (
    <GroupForm
      data={data.group}
      onSubmit={(data) =>
        updateGroup({ variables: { id: props.id, data: prepareData(data) } })
      }
      onSubmitSuccess={(_, values) => {
        props.navigate(`/admin/groups`);
        enqueueSnackbar(`Group ${values.name} saved.`, { variant: "success" });
      }}
      onSubmitError={(e) => {
        enqueueSnackbar(
          `Group could not be saved. Please check for any errors and try again.`,
          { variant: "error" }
        );
        enqueueSnackbar(<pre>{JSON.stringify(e, null, 2)}</pre>, {
          variant: "error",
        });
        console.error(e);
      }}
    />
  );
}

function GroupNewPage(props) {
  const [createGroup] = useMutation(CREATE_MUTATION);

  const { enqueueSnackbar } = useSnackbar();

  return (
    <GroupForm
      isNew
      data={{
        name: `Sample Group ${new Date().toString()}`,
      }}
      onSubmit={(data) => createGroup({ variables: { data } })}
      onSubmitSuccess={(_, values) => {
        props.navigate(`/admin/groups`);
        enqueueSnackbar(`Group ${values.name} saved.`, { variant: "success" });
      }}
      onSubmitError={(e) => {
        enqueueSnackbar(
          `Group could not be saved. Please check for any errors and try again.`,
          { variant: "error" }
        );
        enqueueSnackbar(<pre>{JSON.stringify(e, null, 2)}</pre>, {
          variant: "error",
        });
        console.error(e);
      }}
    />
  );
}

export default (props) => {
  const GroupFormPage = props.match.params.id ? GroupEditPage : GroupNewPage;

  return (
    <GroupFormPage
      navigate={props.history.push}
      id={props.match.params.id}
      {...props}
    />
  );
};
