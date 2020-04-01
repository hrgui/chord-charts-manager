import * as React from "react";
import { useSetPageLayout } from "lib/hooks/useSetPageLayout";
import SetlistView from "./SetlistView";
import { Loading } from "lib/layout/Loading";
import { useTitle } from "lib/hooks/useTitle";
import { useSaveSetlistMutation } from "./hooks/useSaveSetlistMutation";
import { useSnackbar } from "notistack";
import { useGetSetlistQuery } from "./hooks/useGetSetlistQuery";

interface SetlistViewPageProps {
  path?: string;
  id?: string;
  songIndex?: string;
  navigate?: any;
  history?: any;
}

export function normalizeSongIndex(songIndex) {
  if (typeof songIndex === "string") {
    // starts off with 1
    return +songIndex - 1;
  }

  return songIndex;
}

function prepareValues({ id, __typename, ...other }) {
  return other;
}

const SetlistViewPage: React.SFC<SetlistViewPageProps> = props => {
  const { enqueueSnackbar } = useSnackbar();
  let { loading: isLoading, error: isError, data } = useGetSetlistQuery(
    props.id
  );

  data = data?.setlist;

  const [saveSetlist] = useSaveSetlistMutation(props.id);
  const curTitle =
    data && data.title
      ? `${data.title}${data.leader ? `: ${data.leader}` : ""}`
      : `Setlist ${props.id}`;

  useTitle(curTitle);
  const [isSavingSettings, setIsSavingSettings] = React.useState(false);

  async function handleSaveSetlistSettings(settings) {
    setIsSavingSettings(true);
    const _data = {
      ...data,
      settings: { ...data.settings, ...settings }
    };

    await saveSetlist({
      variables: { id: props.id, data: prepareValues(_data) }
    });

    enqueueSnackbar(`Setlist ${data.title || data.id} has been saved.`, {
      variant: "success"
    });
    setIsSavingSettings(false);
  }

  if (isLoading) {
    return <Loading />;
  }

  let { songIndex = 0 } = props;
  songIndex = normalizeSongIndex(songIndex);

  const onIndexChange = index => {
    if (index < 0) {
      index = data.songs.length - 1;
    }

    if (index >= data.songs.length) {
      index = 0;
    }

    props.history.replace(`/setlist/${props.id}/${index + 1}`);
  };

  return (
    <>
      <SetlistView
        title={curTitle}
        hasUnsavedSettings={isSavingSettings}
        onSaveSetlistSettings={handleSaveSetlistSettings}
        onIndexChange={onIndexChange}
        isLoading={isLoading}
        songIndex={songIndex}
        isError={isError}
        data={data}
      />
    </>
  );
};

export default props => {
  const { id, songIndex } = props.match.params;
  const [loading] = useSetPageLayout("setlist", [id]);

  if (loading) {
    return null;
  }

  return <SetlistViewPage id={id} songIndex={songIndex} {...props} />;
};
