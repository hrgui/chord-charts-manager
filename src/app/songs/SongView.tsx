import * as React from "react";
import SongSectionView from "./components/SongSectionView";
import ChordSelect from "./components/ChordSelect";
import { WithWidth } from "lib/layout/WithWidth";
import ConnectedYoutubeView from "./components/YoutubeView";
import classnames from "classnames";
import ReactDOM from "react-dom";
import { AppBarTitle, AppBarSubtitle } from "app/core/AppBar";
import { getOrCreateElement } from "lib/layout/portalSelector";
import { CurrentSongNavMenu } from "./CurrentSongNavMenu";
import styled from "styled-components/macro";
import { ToolbarSpacer } from "lib/layout/ToolbarSpacer";

interface SongViewProps {
  isLoading?: boolean;
  isError?: any;
  data?: any;
  settings?: any;
  classes?: any;
  lyricsDisabled?: boolean;
  chordsDisabled?: boolean;
  onChangeSettings?: any;
  screenWrap?: boolean;
}

export const SongViewKey = ({
  overrideKey,
  onChange,
  className,
  classes,
}: {
  overrideKey;
  onChange;
  className?;
  classes?;
}) => {
  return (
    <ChordSelect
      classes={classes}
      className={className}
      value={overrideKey}
      onChange={onChange}
    />
  );
};

const Container = styled.div`
  overflow: hidden;
  padding: ${({ theme }) => theme.spacing(2)}px;
  margin-top: ${({ theme }) => theme.spacing()}px;
  max-width: 100%;
`;

const StyledSongViewKey = styled(SongViewKey)``;

const StyledWrapper = styled.div`
  display: flex;

  &.Wrapper-tablet,
  &.Wrapper-Mobile {
    flex-direction: column-reverse;
  }

  .screenWrap {
    display: flex;
    flex-flow: column;
    height: calc(100vh - 96px);
    width: 100vw;
    flex-wrap: wrap;
  }
`;

const StyledConnectedYoutubeView = styled(ConnectedYoutubeView)`
  margin-left: auto;
  &.ConnectedYoutubeView-tablet,
  &.ConnectedYoutubeView-mobile {
    margin-left: 0;
    & iframe {
      width: 100% !important;
    }
  }
`;

function Song({
  sections,
  overrideKey,
  baseKey,
  sectionsSettings = {},
  setSectionSettings,
  chordsDisabled,
  lyricsDisabled,
  screenWrap,
}) {
  if (!sections) {
    return null;
  }

  return (
    <div
      className={classnames("song-view-container", { screenWrap: screenWrap })}
    >
      {sections.map((section, i) => {
        const sectionSettings: any = sectionsSettings[i] || {};

        return (
          <SongSectionView
            data-testid={`songSectionView-${i}`}
            key={`songSectionView-${i}`}
            onRequestHide={() => {
              setSectionSettings({ index: i, hide: true });
            }}
            overrideKey={overrideKey}
            songKey={baseKey}
            section={section}
            hide={sectionSettings.hide}
            chordsDisabled={chordsDisabled}
            lyricsDisabled={lyricsDisabled}
          />
        );
      })}
    </div>
  );
}

const SongView = (props: SongViewProps) => {
  let {
    data,
    isError,
    settings = {},
    lyricsDisabled: _lyricsDisabled = false,
    chordsDisabled: _chordsDisabled = false,
    screenWrap: _screenWrap = false,
    onChangeSettings = () => null,
  } = props;
  const [sectionsSettings, _setSectionSettings] = React.useState(
    settings.sectionsSettings || {}
  );
  const [overrideKey, _setOverrideKey] = React.useState(
    settings.overrideKey || (data && data.key)
  );
  const [lyricsDisabled, setLyricsDisabled] = React.useState(
    settings.lyricsDisabled || _lyricsDisabled
  );
  const [chordsDisabled, setChordsDisabled] = React.useState(
    settings.chordsDisabled || _chordsDisabled
  );
  const [screenWrap, setScreenWrap] = React.useState(
    settings.screenWrap || _screenWrap
  );

  React.useEffect(() => {
    if (!settings.overrideKey) {
      return;
    }

    if (settings.overrideKey !== overrideKey) {
      _setOverrideKey(settings.overrideKey);
    }
  }, [overrideKey, settings.overrideKey]);

  function setOverrideKey(x) {
    onChangeSettings({ overrideKey: x }, data);
    _setOverrideKey(x);
  }

  function setSectionSettings({ index, hide }) {
    const sectionSettings = {
      ...(sectionsSettings[index] || {}),
      ...{ index, hide },
    };
    const _sectionsSettings = { ...sectionsSettings, [index]: sectionSettings };
    _setSectionSettings(_sectionsSettings);
    onChangeSettings({ sectionsSettings: _sectionsSettings }, data);
  }

  function handleToggleLyricsVisibility() {
    const newLyricsState = !lyricsDisabled;
    setLyricsDisabled(newLyricsState);
    onChangeSettings({ lyricsDisabled: newLyricsState }, data);
  }

  function handleToggleChordsVisibility() {
    const newChordsState = !chordsDisabled;
    setChordsDisabled(newChordsState);
    onChangeSettings({ chordsDisabled: newChordsState }, data);
  }

  function handleToggleScreenWrap() {
    const newScreenWrapState = !screenWrap;
    setScreenWrap(newScreenWrapState);
    onChangeSettings({ screenWrap: newScreenWrapState }, data);
  }

  if (!data) {
    data = {};
  }

  if (isError) {
    console.error(isError);
    return null;
  }

  return (
    <WithWidth>
      {({ width }) => {
        const youtubeViewCpt = (
          <StyledConnectedYoutubeView
            className={classnames({
              "ConnectedYoutubeView-tablet": width === "md",
              "ConnectedYoutubeView-mobile": width === "sm" || width === "xs",
            })}
            value={data.youtube}
          />
        );

        const wrappedYoutubeViewCpt =
          width === "xl" || width === "lg"
            ? ReactDOM.createPortal(
                youtubeViewCpt,
                getOrCreateElement("#songVideo")
              )
            : youtubeViewCpt;

        return (
          <StyledWrapper
            className={classnames({
              "Wrapper-tablet": width === "md",
              "Wrapper-Mobile": width === "sm" || width === "xs",
            })}
          >
            {ReactDOM.createPortal(
              <CurrentSongNavMenu
                sectionsSettings={sectionsSettings}
                song={data}
                handleSetSectionSettings={setSectionSettings}
                chordsDisabled={chordsDisabled}
                lyricsDisabled={lyricsDisabled}
                screenWrap={screenWrap}
                onToggleScreenWrap={handleToggleScreenWrap}
                onToggleLyricsVisibility={handleToggleLyricsVisibility}
                onToggleChordsVisibility={handleToggleChordsVisibility}
              />,
              getOrCreateElement("#currentSongNavMenu")
            )}
            {ReactDOM.createPortal(
              <>
                <AppBarTitle>{data.title}</AppBarTitle>
                <AppBarSubtitle>{data.artist}</AppBarSubtitle>
              </>,
              getOrCreateElement("#songTitle")!
            )}
            {ReactDOM.createPortal(
              <StyledSongViewKey
                classes={{
                  root: "SongViewKey-root",
                  select: "SongViewKey-root",
                  icon: "SongViewKey-icon",
                }}
                overrideKey={overrideKey}
                onChange={(e) => {
                  setOverrideKey(e.target.value);
                }}
              />,
              getOrCreateElement("#songKey")!
            )}
            <Container className={classnames("printSong")}>
              <div className="print uppercase printSongBar">
                <AppBarTitle>
                  <div style={{ display: "flex" }}>
                    {data.title}{" "}
                    <div style={{ marginLeft: "auto" }}>Key: {overrideKey}</div>
                  </div>
                </AppBarTitle>
                <AppBarSubtitle>{data.artist}</AppBarSubtitle>
              </div>
              <Song
                screenWrap={screenWrap}
                lyricsDisabled={lyricsDisabled}
                chordsDisabled={chordsDisabled}
                setSectionSettings={setSectionSettings}
                baseKey={data.key}
                overrideKey={overrideKey}
                sections={data.sections}
                sectionsSettings={sectionsSettings}
              />
              <ToolbarSpacer />
            </Container>
            {wrappedYoutubeViewCpt}
          </StyledWrapper>
        );
      }}
    </WithWidth>
  );
};

export default SongView;
