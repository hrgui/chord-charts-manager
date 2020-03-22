import * as React from "react";
import { Helmet } from "react-helmet-async";
import { useGetAppBarData } from "lib/hooks/useGetAppBarData";

interface HeadProps {}

const Head: React.SFC<HeadProps> = props => {
  const config = useGetAppBarData();

  if (!config) {
    return null;
  }

  const {
    page: { title },
    appName
  } = config;

  const titleHead =
    title === appName || !title ? title : `${title} - ${appName}`;

  return <HeadView title={titleHead} />;
};

// for some reason if we put Helmet up above, it has an infiite loop
// the fibers are different
export const HeadView = React.memo<any>(({ title }) => {
  return (
    <Helmet>
      <title>{title}</title>
    </Helmet>
  );
});

export default Head;
