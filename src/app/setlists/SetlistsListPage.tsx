import * as React from "react";
import { Table } from "lib/table/Table";
import { useTitle } from "lib/hooks/useTitle";
import { WithWidth, isWidthMobile } from "lib/layout/WithWidth";
import SetlistTitleCell from "./cells/SetlistTitleCell";
import MobileSetlistTitleCell from "./cells/MobileSetlistTitleCell";
import SetlistActions from "./SetlistActions";
import Link from "lib/layout/Link";
import { useQuery, gql } from "@apollo/client";
import SetlistFragment from "./SetlistFragment";
import { useTranslation } from "react-i18next";
import { Trans } from "react-i18next";

interface SetlistsListPageProps {
  path?: string;
  isAdmin?: boolean;
}

export interface SetlistsTableProps {
  setlists;
  isLoading?;
  error?;
}

export function TitleColumnDef() {
  return {
    accessor: "title",
    Header: "Title",
    Cell: ({
      cell: {
        value,
        row: { original: data },
      },
    }) => {
      return <SetlistTitleCell value={value} data={data} />;
    },
  };
}

export function MobileTitleColumnDef() {
  return {
    accessor: "title",
    Header: "Title",
    Cell: ({
      cell: {
        value,
        row: { original: data },
      },
    }) => {
      return <MobileSetlistTitleCell value={value} data={data} />;
    },
  };
}

export function ActionsColumnDef(
  { addToSetlistMode, song_id, onRequestClose } = {
    addToSetlistMode: false,
    song_id: undefined,
    onRequestClose: () => null,
  }
) {
  return {
    Header: "Actions",
    id: "actions",
    Cell: ({
      cell: {
        row: { original: data },
      },
    }) => {
      return (
        <SetlistActions
          setlist={data}
          onRequestClose={onRequestClose}
          addToSetlistMode={addToSetlistMode}
          song_id={song_id}
        />
      );
    },
  };
}

export function DateColumnDef() {
  return {
    Header: "Date",
    accessor: "date",
  };
}

export function LeaderColumnDef() {
  return {
    accessor: "leader",
    Header: "Leader",
  };
}

export function SetlistTable({
  loading,
  data,
  isMobile,
  addToSetlistMode,
  song_id,
  onRequestClose,
  error,
}) {
  const { t } = useTranslation();

  const columns = React.useMemo(() => {
    return !isMobile
      ? [
          TitleColumnDef(),
          LeaderColumnDef(),
          DateColumnDef(),
          ActionsColumnDef({ addToSetlistMode, song_id, onRequestClose }),
        ]
      : [
          MobileTitleColumnDef(),
          ActionsColumnDef({ addToSetlistMode, song_id, onRequestClose }),
        ];
  }, [addToSetlistMode, isMobile, onRequestClose, song_id]);

  const initialState = React.useMemo(() => {
    return {
      sortBy: [{ id: "date", desc: true }],
    };
  }, []);

  const emptyAction = React.useMemo(
    () => (
      <Trans i18nKey="setlist:list/emptyAction">
        <Link to="/setlist/new">Create a new setlist</Link> and it will show up
        here.
      </Trans>
    ),
    []
  );

  return (
    <Table
      error={error}
      emptyHeader={t("setlist:list/emptyHeader")}
      emptyAction={emptyAction}
      initialState={initialState}
      isLoading={loading}
      isPageTable
      columns={columns}
      data={data}
    />
  );
}

export function SetlistListContainer({
  addToSetlistMode,
  song_id,
  onRequestClose = () => null,
}: {
  addToSetlistMode?;
  song_id?;
  onRequestClose?;
}) {
  const { error, loading, data } = useQuery(
    gql`
      query getSetlists {
        setlists {
          ...Setlist
        }
      }

      ${SetlistFragment}
    `,
    { fetchPolicy: "cache-and-network" }
  );

  const setlists = data?.setlists || [];

  return (
    <WithWidth>
      {({ width }) => {
        const isMobile = isWidthMobile(width);
        return (
          <SetlistTable
            isMobile={isMobile}
            error={error}
            loading={loading}
            data={setlists}
            song_id={song_id}
            onRequestClose={onRequestClose}
            addToSetlistMode={addToSetlistMode}
          />
        );
      }}
    </WithWidth>
  );
}

const SetlistsListPage: React.SFC<SetlistsListPageProps> = () => {
  useTitle("All Setlists", null);

  return <SetlistListContainer />;
};

export default SetlistsListPage;
