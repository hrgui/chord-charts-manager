import * as React from "react";
import SetlistForm from "./SetlistForm";
import { getUpcomingSunday, toDomDate } from "lib/utils/date";
import { useSnackbar } from "notistack";
import { useUserData } from "lib/hooks/useUserData";
import {
  useSaveSetlistMutation,
  useCreateSetlistMutation
} from "../hooks/useSaveSetlistMutation";
import { useGetSetlistQuery } from "../hooks/useGetSetlistQuery";
import { useModalRouteMode } from "lib/hooks/useModalRouteMode";

export interface SetlistFormPageProps {
  path?: string;
  id?: string;
  navigate?: any;
  currentGroupId?: string;
  isModalMode?: boolean;
}

function prepareValues({ id, __typename, ...other }) {
  return other;
}

const SetlistEditPage: React.SFC<SetlistFormPageProps> = props => {
  const { enqueueSnackbar } = useSnackbar();
  let { loading: isLoading, error: isError, data } = useGetSetlistQuery(
    props.id
  );
  const [updateSetlist] = useSaveSetlistMutation(props.id);

  data = data?.setlist;

  return (
    <SetlistForm
      isModalMode={props.isModalMode}
      isLoading={isLoading}
      onSubmit={values =>
        updateSetlist({
          variables: {
            id: props.id,
            data: prepareValues(values)
          }
        })
      }
      onSubmitSuccess={(_, values) => {
        enqueueSnackbar(
          `Setlist ${values.title || values.id} has been saved.`,
          {
            variant: "success"
          }
        );
        props.navigate(`/setlist/${props.id}`);
      }}
      onSubmitError={e => {
        enqueueSnackbar(
          `Setlist could not be saved. Please check for any errors and try again.`,
          { variant: "error" }
        );
        enqueueSnackbar(<pre>{JSON.stringify(e, null, 2)}</pre>, {
          variant: "error"
        });
        console.error(e);
      }}
      isError={isError}
      data={data}
    />
  );
};

const getNewSetlistTemplate = currentGroupId => {
  const sunday = toDomDate(getUpcomingSunday());
  return {
    title: `Sunday Setlist - ${sunday}`,
    date: sunday,
    songs: [],
    settings: {},
    share: {
      [currentGroupId]: "editor"
    }
  };
};

const SetlistNewPage: React.SFC<SetlistFormPageProps> = props => {
  const { enqueueSnackbar } = useSnackbar();
  const [createSetlist] = useCreateSetlistMutation();
  const setlistTemplate = getNewSetlistTemplate(props.currentGroupId);
  return (
    <SetlistForm
      isModalMode={props.isModalMode}
      isNew
      data={setlistTemplate}
      onSubmit={values =>
        createSetlist({
          variables: {
            data: values
          }
        })
      }
      onSubmitSuccess={(_, values) => {
        enqueueSnackbar(
          `Setlist ${values.title || values.id} has been saved.`,
          {
            variant: "success"
          }
        );
        props.navigate(`/setlists`);
      }}
      onSubmitError={e => {
        enqueueSnackbar(
          `Setlist could not be saved. Please check for any errors and try again.`,
          { variant: "error" }
        );
        enqueueSnackbar(<pre>{JSON.stringify(e, null, 2)}</pre>, {
          variant: "error"
        });
        console.error(e);
      }}
    />
  );
};

export default props => {
  const user = useUserData() || {};
  const { id } = props.match.params;
  const SetlistFormPage = id ? SetlistEditPage : SetlistNewPage;
  const [isModalMode, navigate] = useModalRouteMode();

  return (
    <SetlistFormPage
      isModalMode={isModalMode}
      currentGroupId={user.currentGroupId}
      id={id}
      navigate={navigate}
      {...props}
    />
  );
};
