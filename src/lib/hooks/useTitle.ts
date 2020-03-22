import { useMutation } from "@apollo/client";
import gql from "graphql-tag";
import { useEffect } from "react";

export function useTitle(title, subtitle?) {
  const [setPageInfo] = useMutation(
    gql`
      mutation setPageInfo($title: String, $subtitle: String) {
        setPageInfo(title: $title, subtitle: $subtitle) @client
      }
    `
  );

  const [resetPageInfo] = useMutation(
    gql`
      mutation resetPageInfo {
        resetPageInfo @client
      }
    `
  );

  useEffect(() => {
    if (title) {
      setPageInfo({ variables: { title } });
    }

    if (subtitle !== undefined) {
      setPageInfo({ variables: { subtitle } });
    }

    return () => {
      resetPageInfo();
    };
  }, [title, subtitle, resetPageInfo, setPageInfo]);

  return null;
}
