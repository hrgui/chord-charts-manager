import { useMutation } from "@apollo/client";
import gql from "graphql-tag";

export function useAppBarActions() {
  const [toggleNavMenu] = useMutation(
    gql`
      mutation {
        toggleNavMenu @client
      }
    `
  );

  const [toggleControlsPanel] = useMutation(
    gql`
      mutation {
        toggleControlsPanel @client
      }
    `
  );

  const [setStickyState] = useMutation(
    gql`
      mutation setStickyState($value: Boolean) {
        setStickyState(value: $value) @client
      }
    `
  );

  const [setNavBarState] = useMutation(
    gql`
      mutation setStickyState($value: String) {
        setNavBarState(value: $value) @client
      }
    `
  );

  return {
    toggleNavMenu,
    toggleControlsPanel,
    setStickyState: value => {
      console.log('setStickyState')
      return setStickyState({ variables: { value } });
    },
    setNavBarState: value => {
      console.log('setNavBarState')
      return setNavBarState({
        variables: { value },
        refetchQueries: ["getAppBarData"]
      })
    }
      
  };
}
