import * as React from "react";
import { SongForm } from "./SongForm";
import { prepareInputForMutation } from "lib/form/prepareInputForMutation";
import { useSnackbar } from "notistack";
import { useUserData } from "lib/hooks/useUserData";
import { useMutation, gql, useQuery } from "@apollo/client";
import SongFragment from "../SongFragment";
import { useTranslation } from "react-i18next";
import { useParams, useHistory } from "react-router-dom";

export interface SongFormPageProps {
  path?: string;
  id?: string;
  navigate?: any;
  currentGroupId?: string;
}

const SongEditPage: React.SFC<SongFormPageProps> = (props) => {
  const { t } = useTranslation();
  const { enqueueSnackbar } = useSnackbar();
  const [updateSong] = useMutation(
    gql`
      mutation update($data: SongInput!, $id: ID!) {
        song: updateSong(id: $id, record: $data) {
          ...Song
        }
      }
      ${SongFragment}
    `,
    { refetchQueries: ["getSongs"] }
  );
  let { loading: isLoading, error, data } = useQuery(
    gql`
      query getOne($id: ID!) {
        song: song(id: $id) {
          ...Song
        }
      }
      ${SongFragment}
    `,
    {
      variables: {
        id: props.id,
      },
    }
  );
  data = data?.song || {};

  return (
    <SongForm
      isLoading={isLoading}
      onSubmit={(values) =>
        updateSong({
          variables: {
            id: props.id,
            data: prepareInputForMutation(values),
          },
        })
      }
      onSubmitSuccess={(res, values) => {
        enqueueSnackbar(
          t(`song:message/saveSuccess`, { song: values.title || values.id }),
          {
            variant: "success",
          }
        );
        props.navigate(`/song/${props.id}/view`);
      }}
      onSubmitError={(e) => {
        enqueueSnackbar(t(`song:message/saveError`), { variant: "error" });
        enqueueSnackbar(<pre>{JSON.stringify(e, null, 2)}</pre>, {
          variant: "error",
        });
        console.error(e);
      }}
      error={error}
      data={data}
    />
  );
};

export function getNewSongTemplate(currentGroupId) {
  return {
    title: `Untitled Song ${new Date().toString()}`,
    key: "C",
    artist: "Untitled",
    youtube: "https://www.youtube.com/watch?v=Jbe7OruLk8I",
    tags: ["english"],
    sections: [
      {
        type: "text",
        title: "Untitled Section",
        body: "A B C \n Sample test",
      },
    ],
    share: {
      [currentGroupId]: "editor",
    },
  };
}

export const CREATE_SONG_QUERY = gql`
  mutation create($data: SongInput!) {
    song: createSong(record: $data) {
      ...Song
    }
  }
  ${SongFragment}
`;

const SongNewPage: React.SFC<SongFormPageProps> = (props) => {
  const { t } = useTranslation();
  const { enqueueSnackbar } = useSnackbar();
  const [createSong] = useMutation(CREATE_SONG_QUERY, {
    refetchQueries: ["getSongs"],
  });
  const newSongTemplate = getNewSongTemplate(props.currentGroupId);
  return (
    <SongForm
      isNew
      data={newSongTemplate}
      onSubmit={(values) =>
        createSong({
          variables: {
            data: values,
          },
        })
      }
      onSubmitSuccess={(_, values) => {
        enqueueSnackbar(
          t(`song:message/saveSuccess`, { song: values.title || values.id }),
          {
            variant: "success",
          }
        );
        props.navigate(`/songs`);
      }}
      onSubmitError={(e) => {
        enqueueSnackbar(t(`song:message/saveError`), { variant: "error" });
        enqueueSnackbar(<pre>{JSON.stringify(e, null, 2)}</pre>, {
          variant: "error",
        });
        console.error(e);
      }}
    />
  );
};

export default (props) => {
  const { id } = useParams();
  const history = useHistory();
  const user = useUserData() || {};
  const SongFormPage = id ? SongEditPage : SongNewPage;

  return (
    <SongFormPage
      currentGroupId={user.currentGroupId}
      navigate={history.push}
      id={id}
      {...props}
    />
  );
};
