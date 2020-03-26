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
        row: { original: data }
      }
    }) => {
      return <SetlistTitleCell value={value} data={data} />;
    }
  };
}

export function MobileTitleColumnDef() {
  return {
    accessor: "title",
    Header: "Title",
    Cell: ({
      cell: {
        value,
        row: { original: data }
      }
    }) => {
      return <MobileSetlistTitleCell value={value} data={data} />;
    }
  };
}

export function ActionsColumnDef() {
  return {
    Header: "Actions",
    id: "actions",
    Cell: ({
      cell: {
        row: { original: data }
      }
    }) => {
      return <SetlistActions setlist={data} />;
    }
  };
}

export function DateColumnDef() {
  return {
    Header: "Date",
    accessor: "date"
  };
}

export function LeaderColumnDef() {
  return {
    accessor: "leader",
    Header: "Leader"
  };
}

const SetlistsListPage: React.SFC<SetlistsListPageProps> = () => {
  const { t } = useTranslation();
  const { error, loading, data } = useQuery(gql`
    {
      setlists {
        ...Setlist
      }
    }

    ${SetlistFragment}
  `);
  useTitle("All Setlists", null);

  return (
    <WithWidth>
      {({ width }) => {
        const isMobile = isWidthMobile(width);
        const columns = !isMobile
          ? [
              TitleColumnDef(),
              LeaderColumnDef(),
              DateColumnDef(),
              ActionsColumnDef()
            ]
          : [MobileTitleColumnDef(), ActionsColumnDef()];

        return (
          <Table
            error={error}
            emptyHeader={t("setlist:list/emptyHeader")}
            emptyAction={
              <Trans i18nKey="setlist:list/emptyAction">
                <Link to="/setlist/new">Create a new setlist</Link> and it will
                show up here.
              </Trans>
            }
            isLoading={loading}
            isPageTable
            columns={columns}
            data={data?.setlists || []}
          />
        );
      }}
    </WithWidth>
  );
};

export default SetlistsListPage;
