import * as React from "react";
import {
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Divider
} from "@material-ui/core";
import Edit from "@material-ui/icons/Edit";
import Delete from "@material-ui/icons/Delete";
import ToggleOff from "@material-ui/icons/ToggleOffOutlined";
import ToggleOn from "@material-ui/icons/ToggleOn";
import ListItemLink from "lib/layout/ListItemLink";
import { ListSubheader } from "lib/layout/ListSubheader";
import { isUserAdmin } from "../user/userUtils";
import { useUserData } from "lib/hooks/useUserData";
import { useGlobalSongSettings } from "lib/hooks/useGlobalSongSettings";
import { useGlobalSongActions } from "lib/hooks/useGlobalSongActions";
import { useAppBarActions } from "lib/hooks/useAppBarActions";
import useDeleteSongMutation from "./hooks/useDeleteSongMutation";

export function CurrentSongNavMenuPlaceholder() {
  return <div id="currentSongNavMenu" />;
}

export function SongSectionsNavMenu({
  sections,
  sectionsSettings,
  onSetSectionSettings
}: {
  sections?;
  sectionsSettings?;
  onSetSectionSettings?;
}) {
  if (!sections) {
    return null;
  }

  return (
    <List dense>
      <ListSubheader>View Song Controls</ListSubheader>
      {sections.map((section, i) => {
        const title = section.title || `Untitled Section id: ${i + 1}`;
        const sectionSettings = (sectionsSettings && sectionsSettings[i]) || {};

        return (
          <ListItem
            key={i}
            button
            onClick={e => {
              onSetSectionSettings({
                index: i,
                hide: !sectionSettings.hide
              });
            }}
          >
            <ListItemIcon>
              {!sectionSettings.hide ? <ToggleOn /> : <ToggleOff />}
            </ListItemIcon>
            <ListItemText primary={title} />
          </ListItem>
        );
      })}
    </List>
  );
}

export interface CurrentSongNavMenuProps {
  song;
  sectionsSettings;
  handleSetSectionSettings: ({ index, hide }) => any;
  onToggleLyricsVisibility;
  onToggleChordsVisibility;
  chordsDisabled;
  lyricsDisabled;
}

export function CurrentSongNavMenu(props: CurrentSongNavMenuProps) {
  const user = useUserData() || {};
  const isAdmin = isUserAdmin(user);
  const [deleteSong] = useDeleteSongMutation();
  const { youtubeHidden: isVideoHidden } = useGlobalSongSettings() || {};
  const { toggleYoutube } = useGlobalSongActions() || {};
  const { toggleControlsPanel } = useAppBarActions();
  const {
    onToggleChordsVisibility,
    onToggleLyricsVisibility,
    chordsDisabled,
    lyricsDisabled
  } = props;

  const { song, handleSetSectionSettings, sectionsSettings } = props;
  const { id } = song;

  return (
    <List dense>
      <ListSubheader>Song Controls</ListSubheader>
      <ListItemLink
        onClick={e => toggleControlsPanel()}
        to={`/song/${id}/edit`}
      >
        <ListItemIcon>
          <Edit />
        </ListItemIcon>
        <ListItemText primary={"Edit"} />
      </ListItemLink>
      {isAdmin && (
        <ListItem
          button
          onClick={async () => {
            const { extensions } = await deleteSong({ variables: { id: id } });
            toggleControlsPanel();

            if (extensions && extensions.cancelled) {
              return;
            }

            window.location.href = "/songs";
          }}
        >
          <ListItemIcon>
            <Delete />
          </ListItemIcon>
          <ListItemText primary={"Delete"} />
        </ListItem>
      )}
      <Divider />
      <ListItem
        button
        onClick={e => {
          toggleYoutube();
        }}
      >
        <ListItemIcon>
          {!isVideoHidden ? <ToggleOn /> : <ToggleOff />}
        </ListItemIcon>
        <ListItemText
          primary={`Video: ${!isVideoHidden ? "Show" : "Hidden"}`}
        />
      </ListItem>
      <ListItem
        button
        onClick={e => {
          onToggleLyricsVisibility();
        }}
      >
        <ListItemIcon>
          {!lyricsDisabled ? <ToggleOn /> : <ToggleOff />}
        </ListItemIcon>
        <ListItemText primary={`Lyrics: ${!lyricsDisabled ? "On" : "Off"}`} />
      </ListItem>
      <ListItem
        button
        onClick={e => {
          onToggleChordsVisibility();
        }}
      >
        <ListItemIcon>
          {!chordsDisabled ? <ToggleOn /> : <ToggleOff />}
        </ListItemIcon>
        <ListItemText primary={`Chords: ${!chordsDisabled ? "On" : "Off"}`} />
      </ListItem>
      <SongSectionsNavMenu
        sectionsSettings={sectionsSettings}
        onSetSectionSettings={handleSetSectionSettings}
        sections={song.sections}
      />
    </List>
  );
}
