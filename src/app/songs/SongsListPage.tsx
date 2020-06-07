import * as React from "react";
import Link from "lib/layout/Link";
import { Table } from "lib/table/Table";
import { useTitle } from "lib/hooks/useTitle";
import { useQuery, gql } from "@apollo/client";
import SongFragment from "./SongFragment";
import { Trans } from "react-i18next";
import { useTranslation } from "react-i18next";
import SongActions from "./SongActions";

interface SongsListPageProps {
  path?: string;
  isAdmin?: boolean;
}

export interface SongsTableProps {
  onFetch;
  onGridReady?;
  afterFetch?;
  isSelectMode?: boolean;
  onSelectionChanged?;
}

class SongTitleCell extends React.Component<any, any> {
  render() {
    const { value, data } = this.props;

    if (!data) {
      return null;
    }

    return <Link to={`/song/${data.id}/view`}>{value}</Link>;
  }
}

export const GET_SONGS_QUERY = gql`
  query getSongs {
    songs {
      ...Song
    }
  }

  ${SongFragment}
`;

export function SongListContainer({
  addToSetlistMode,
  onAddSong,
}: {
  addToSetlistMode?;
  onAddSong?;
}) {
  const { t } = useTranslation();
  const { error, loading, data } = useQuery(GET_SONGS_QUERY);

  const columns = React.useMemo(() => {
    return [
      {
        accessor: "title",
        Header: "Title",
        Cell: ({
          cell: {
            value,
            row: { original: data },
          },
        }) => {
          return <SongTitleCell value={value} data={data} />;
        },
      },
      {
        accessor: "artist",
        Header: "Artist",
      },
      {
        accessor: "key",
        Header: "Key",
      },
      {
        Header: "Actions",
        id: "actions",
        Cell: ({
          cell: {
            row: { original: data },
          },
        }) => {
          return (
            <SongActions
              onAddSong={onAddSong}
              addToSetlistMode={addToSetlistMode}
              song={data}
            />
          );
        },
      },
    ];
  }, [addToSetlistMode, onAddSong]);

  const emptyAction = React.useMemo(() => {
    return (
      <Trans i18nKey="song:list/emptyAction">
        <Link to="/song/new" alt="New Song">
          Create a new song
        </Link>{" "}
        and it'll show up here.
      </Trans>
    );
  }, []);

  return (
    <Table
      error={error}
      emptyHeader={t("song:list/emptyHeader")}
      emptyAction={emptyAction}
      columns={columns}
      isLoading={loading}
      isPageTable
      data={data?.songs || []}
    />
  );
}

const SongsListPage: React.SFC<SongsListPageProps> = () => {
  useTitle("All Songs", null);
  return <SongListContainer />;
};

export default SongsListPage;
