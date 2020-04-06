import * as React from "react";
import { useSetPageLayout } from "lib/hooks/useSetPageLayout";
import { useTitle } from "lib/hooks/useTitle";
import { useParams } from "react-router-dom";
import Loading from "lib/layout/Loading";
import SongView from "./SongView";
import { useGetSongQuery } from "./hooks/useGetSongQuery";

interface SongViewContainerProps {
  id?: string;
  isInSetlist?: boolean;
  isActiveInSetlist?: boolean;
  settings?: any;
  onChangeSettings?: any;
}

export const SongViewContainer: React.SFC<SongViewContainerProps> = (props) => {
  const { loading: isLoading, error: isError, data } = useGetSongQuery(
    props.id
  );
  const {
    isInSetlist,
    isActiveInSetlist,
    settings,
    onChangeSettings = () => null,
  } = props;
  useTitle(`View Song: ${isLoading ? props.id : data?.song.title}`);

  if (isInSetlist && !isActiveInSetlist) {
    return null;
  }

  if (isLoading) {
    return <Loading />;
  }

  return (
    <>
      <SongView
        isLoading={isLoading}
        isError={isError}
        data={data?.song}
        settings={settings}
        onChangeSettings={onChangeSettings}
      />
    </>
  );
};

const SongViewPage = () => {
  const { id } = useParams();
  const [loading] = useSetPageLayout("song", [id]);
  useTitle(`View Song ${id}`); // HACK: this is to make mobile view work right, resetPageInfo causing issue

  if (loading) {
    return <Loading />;
  }

  return <SongViewContainer id={id} />;
};

export default SongViewPage;
