import * as React from "react";
import classnames from "classnames";
import { useGlobalSongSettings } from "lib/hooks/useGlobalSongSettings";
import { useGlobalSongActions } from "lib/hooks/useGlobalSongActions";
import Youtube from "react-youtube";
import * as qs from "qs";

export const YoutubeView = ({ value, className }: { value; className? }) => {
  let getYoutubeId = youtubeUrl => {
    if (youtubeUrl.indexOf("://youtu.be/") !== -1) {
      const parts = youtubeUrl.split("/");
      return parts[parts.length - 1];
    }

    var params = qs.parse(youtubeUrl.split("?")[1]);

    if (params.v) {
      return params.v;
    }

    return null;
  };

  let youtubeId = value ? getYoutubeId(value) : null;

  if (!youtubeId) {
    return null;
  }

  return (
    <div
      data-testid="youtube-container"
      className={classnames(className, "print-hidden")}
    >
      <Youtube videoId={youtubeId} opts={{ height: "240px", width: "426px" }} />
    </div>
  );
};

export function ConnectedYoutubeView({ value, className }) {
  const { youtubeHidden } = useGlobalSongSettings() || {};
  const { toggleYoutube } = useGlobalSongActions() || {};

  if (!value) {
    return null;
  }

  return (
    <YoutubeViewer
      className={classnames(className, {
        "youtube-view-hidden": youtubeHidden
      })}
      value={value}
      onClose={toggleYoutube}
    />
  );
}

function YoutubeViewer({ value, className }: any) {
  return <YoutubeView className={className} value={value} />;
}

export default ConnectedYoutubeView;
