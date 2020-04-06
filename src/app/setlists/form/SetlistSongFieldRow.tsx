import * as React from "react";
import {
  IconButton,
  ButtonGroup,
  TableRow,
  TableCell,
} from "@material-ui/core";
import { useGetSongQuery } from "app/songs/hooks/useGetSongQuery";
import ChordSelect from "app/songs/components/ChordSelect";
import { Skeleton } from "@material-ui/lab";
import ArrowUpwardIcon from "@material-ui/icons/ArrowUpward";
import ArrowDownwardIcon from "@material-ui/icons/ArrowDownward";
import DeleteIcon from "@material-ui/icons/Delete";

export interface ISetlistSongFieldRowProps {
  index;
  songId;
  onSwap;
  onRemove;
  settings;
  onSongKeyChange;
}

export default function SetlistSongFieldRow(props: ISetlistSongFieldRowProps) {
  const { index, songId, onSwap, onRemove, settings, onSongKeyChange } = props;
  const { data, loading } = useGetSongQuery(songId);

  const song = data?.song || {};

  if (loading) {
    return (
      <TableRow>
        <TableCell>{index + 1}.</TableCell>
        <TableCell>
          {<Skeleton width={Math.floor(Math.random() * 100)} height={16} />}
        </TableCell>
        <TableCell>
          {<Skeleton width={Math.floor(Math.random() * 75)} height={16} />}
        </TableCell>
        <TableCell>{<Skeleton width={50} height={16} />}</TableCell>
        <TableCell>{<Skeleton width={200} height={16} />}</TableCell>
      </TableRow>
    );
  }

  return (
    <TableRow>
      <TableCell>{index + 1}.</TableCell>
      <TableCell>{song?.title?.toUpperCase() || songId}</TableCell>
      <TableCell>{song?.artist}</TableCell>
      <TableCell>
        <ChordSelect
          value={settings?.overrideKey || song?.key}
          onChange={onSongKeyChange}
        />
      </TableCell>
      <TableCell>
        <ButtonGroup>
          <IconButton size="small" onClick={(e) => onSwap(index, index - 1)}>
            <ArrowUpwardIcon fontSize="small" />
          </IconButton>
          <IconButton size="small" onClick={(e) => onSwap(index, index + 1)}>
            <ArrowDownwardIcon fontSize="small" />
          </IconButton>
          <IconButton size="small" onClick={(e) => onRemove(index)}>
            <DeleteIcon fontSize="small" />
          </IconButton>
        </ButtonGroup>
      </TableCell>
    </TableRow>
  );
}
