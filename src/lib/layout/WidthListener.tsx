import * as React from "react";
import { WithWidth } from "./WithWidth";
import { useMutation } from "@apollo/client";
import gql from "graphql-tag";

export interface WidthListenerProps {}

export function WidthPublisher({ width }) {
  const [setBreakpoint] = useMutation(gql`
    mutation setBreakpoint($value: String) {
      setWidthBreakpoint(value: $value) @client
    }
  `);

  React.useEffect(() => {
    setBreakpoint({ variables: { value: width } });
  }, [width, setBreakpoint]);
  return null;
}

export default function WidthListener(props: WidthListenerProps) {
  return (
    <WithWidth>{({ width }) => <WidthPublisher width={width} />}</WithWidth>
  );
}
