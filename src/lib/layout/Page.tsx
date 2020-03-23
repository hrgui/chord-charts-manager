import * as React from "react";
import { Loading } from "./Loading";

export interface PageProps {
  isLoading?: boolean;
}

const Page = props => {
  const { isLoading, children } = props;

  if (isLoading) {
    return <Loading />;
  }

  return <>{children}</>;
};

export default Page;
