import * as React from "react";
import {
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Divider,
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
import { useTranslation } from "react-i18next";

export function CurrentSongNavMenuPlaceholder() {
  return <div id="currentSongNavMenu" />;
}

export function SongSectionsNavMenu({
  sections,
  sectionsSettings,
  onSetSectionSettings,
}: {
  sections?;
  sectionsSettings?;
  onSetSectionSettings?;
}) {
  const { t } = useTranslation();

  if (!sections) {
    return null;
  }

  return (
    <List dense>
      <ListSubheader>{t("song:navMenu/title")}</ListSubheader>
      {sections.map((section, i) => {
        const title = section.title || `${t("song:untitledSection")}: ${i + 1}`;
        const sectionSettings = (sectionsSettings && sectionsSettings[i]) || {};

        return (
          <ListItem
            key={i}
            button
            onClick={(e) => {
              onSetSectionSettings({
                index: i,
                hide: !sectionSettings.hide,
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
  onToggleScreenWrap;
  chordsDisabled;
  lyricsDisabled;
  screenWrap;
}

export function CurrentSongNavMenu(props: CurrentSongNavMenuProps) {
  const { t } = useTranslation();
  const user = useUserData() || {};
  const isAdmin = isUserAdmin(user);
  const [deleteSong] = useDeleteSongMutation();
  const { youtubeHidden: isVideoHidden } = useGlobalSongSettings() || {};
  const { toggleYoutube } = useGlobalSongActions() || {};
  const { toggleControlsPanel } = useAppBarActions();
  const {
    onToggleChordsVisibility,
    onToggleScreenWrap,
    onToggleLyricsVisibility,
    chordsDisabled,
    lyricsDisabled,
    screenWrap,
  } = props;

  const { song, handleSetSectionSettings, sectionsSettings } = props;
  const { id } = song;

  return (
    <List dense>
      <ListSubheader>Song Controls</ListSubheader>
      <ListItemLink
        onClick={(e) => toggleControlsPanel()}
        to={`/song/${id}/edit`}
      >
        <ListItemIcon>
          <Edit />
        </ListItemIcon>
        <ListItemText primary={t("edit")} />
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
          <ListItemText primary={t("delete")} />
        </ListItem>
      )}
      <Divider />
      <ListItem
        button
        onClick={(e) => {
          toggleYoutube();
        }}
      >
        <ListItemIcon>
          {!isVideoHidden ? <ToggleOn /> : <ToggleOff />}
        </ListItemIcon>
        <ListItemText
          primary={`${t("video")}: ${!isVideoHidden ? t("on") : t("off")}`}
        />
      </ListItem>
      <ListItem
        button
        onClick={(e) => {
          onToggleScreenWrap();
        }}
      >
        <ListItemIcon>{screenWrap ? <ToggleOn /> : <ToggleOff />}</ListItemIcon>
        <ListItemText
          primary={`${t("screenWrap")}: ${screenWrap ? t("on") : t("off")}`}
        />
      </ListItem>
      <ListItem
        button
        onClick={(e) => {
          onToggleLyricsVisibility();
        }}
      >
        <ListItemIcon>
          {!lyricsDisabled ? <ToggleOn /> : <ToggleOff />}
        </ListItemIcon>
        <ListItemText
          primary={`${t("lyrics")}: ${!lyricsDisabled ? t("on") : t("off")}`}
        />
      </ListItem>
      <ListItem
        button
        onClick={(e) => {
          onToggleChordsVisibility();
        }}
      >
        <ListItemIcon>
          {!chordsDisabled ? <ToggleOn /> : <ToggleOff />}
        </ListItemIcon>
        <ListItemText
          primary={`${t("chords")}: ${!chordsDisabled ? t("on") : t("off")}`}
        />
      </ListItem>
      <SongSectionsNavMenu
        sectionsSettings={sectionsSettings}
        onSetSectionSettings={handleSetSectionSettings}
        sections={song.sections}
      />
    </List>
  );
}
