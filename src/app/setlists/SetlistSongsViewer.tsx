import * as React from "react";
import ReactDOM from "react-dom";
import { SongViewContainer } from "app/songs/SongViewPage";
import { SetlistSongPagination } from "./SetlistSongPagination";
import { getOrCreateElement } from "lib/layout/portalSelector";
import { CurrentSetlistNavMenu } from "./CurrentSetlistNavMenu";

export interface SetlistSongsViewerProps {
  title?;
  setlist?;
  songs?;
  settings?;
  songIndex?;
  onIndexChange?;
  isLoading?;
  onSaveSetlistSettings?;
  hasUnsavedSettings?;
  isLyrics?;
}

export function SetlistSongsViewer({
  title,
  setlist,
  songs,
  settings,
  songIndex,
  onIndexChange,
  onSaveSetlistSettings,
  hasUnsavedSettings = false,
  isLyrics = false
}: SetlistSongsViewerProps) {
  const [_settings, setSettings] = React.useState(settings || {});
  const [_hasUnSavedSettings, setHasUnsavedSettings] = React.useState(
    hasUnsavedSettings
  );

  React.useEffect(() => {
    setHasUnsavedSettings(hasUnsavedSettings);
  }, [hasUnsavedSettings]);

  function handleChangeSettings(settingsFragment, { id }) {
    const _newSettings = {
      ..._settings,
      [id]: { ..._settings[id], ...settingsFragment }
    };
    setHasUnsavedSettings(true);
    setSettings(_newSettings);
  }

  return (
    <div>
      {ReactDOM.createPortal(
        <CurrentSetlistNavMenu
          onChangeSettings={handleChangeSettings}
          title={title}
          setlist={setlist}
          settings={_settings}
          hasUnsavedSettings={_hasUnSavedSettings}
          onSaveSetlistSettings={onSaveSetlistSettings}
        />,
        getOrCreateElement("#currentSetlistNavMenu")
      )}
      {songs.map((song, index) => (
        <SongViewContainer
          key={song}
          isActiveInSetlist={songIndex === index}
          isInSetlist={!isLyrics}
          id={song}
          settings={_settings[song]}
          onChangeSettings={handleChangeSettings}
        />
      ))}
      {ReactDOM.createPortal(
        <div style={{ display: "flex", alignItems: "center" }}>
          <SetlistSongPagination
            length={songs.length}
            currentIndex={songIndex}
            onChange={onIndexChange}
          />
        </div>,
        getOrCreateElement("#setlistControls")
      )}
    </div>
  );
}
