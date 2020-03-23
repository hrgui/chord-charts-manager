import * as React from "react";
import Link from "lib/layout/Link";
import { Table } from "lib/table/Table";
import { useTitle } from "lib/hooks/useTitle";
import styled from "styled-components";
import { useQuery, gql } from "@apollo/client";
import SongFragment from "./SongFragment";
import { Trans } from "react-i18next";
import { useTranslation } from "react-i18next";

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

export function TitleColumnDef() {
  return {
    accessor: "title",
    Header: "Title",
    Cell: ({
      cell: {
        value,
        row: { original: data }
      }
    }) => {
      return <SongTitleCell value={value} data={data} />;
    }
  };
}

const Container = styled.div`
  line-height: 1.5;
  padding-top: ${({ theme }) => theme.spacing()}px;
`;

const StyledLink = styled(Link)`
  white-space: nowrap !important;
  text-overflow: ellipsis;
  overflow: hidden;
  display: block;
`;

class MobileSongTitleCell extends React.Component<any, any> {
  render() {
    const { data } = this.props;

    if (!data) {
      return null;
    }

    return (
      <Container>
        <StyledLink to={`/song/${data.id}/view`}>{data.title}</StyledLink>
        {data.artist && <div>{data.artist}</div>}
      </Container>
    );
  }
}

export function MobileTitleColumnDef() {
  return {
    accessor: "title",
    Header: "Title / Artist",
    Cell: ({
      cell: {
        value,
        row: { original: data }
      }
    }) => {
      return <MobileSongTitleCell value={value} data={data} />;
    }
  };
}

export function ArtistColumnDef() {
  return {
    accessor: "artist",
    Header: "Artist"
  };
}

export function KeyColumnDef() {
  return {
    accessor: "key",
    Header: "Key"
  };
}

const SongsListPage: React.SFC<SongsListPageProps> = () => {
  const { t } = useTranslation();
  const { error, loading, data } = useQuery(gql`
    {
      songs {
        ...Song
      }
    }

    ${SongFragment}
  `);
  useTitle("All Songs", null);

  return (
    <Table
      error={error}
      emptyHeader={t("song:list/emptyHeader")}
      emptyAction={
        <Trans i18nKey="song:list/emptyAction">
          <Link to="/song/new" alt="New Song">
            Create a new song
          </Link>{" "}
          and it'll show up here.
        </Trans>
      }
      columns={[TitleColumnDef(), ArtistColumnDef(), KeyColumnDef()]}
      isLoading={loading}
      isPageTable
      data={data?.songs || []}
    />
  );
};

export default SongsListPage;
