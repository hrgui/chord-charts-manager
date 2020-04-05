import * as React from "react";
import { SetlistListContainer } from "../SetlistsListPage";
import { useTranslation } from "react-i18next";

export interface IAddToSetlistFormProps {
  song_id?: string;
  navigate: (str) => any;
}

export default function AddToSetlistForm(props: IAddToSetlistFormProps) {
  const { song_id, navigate } = props;
  const { t } = useTranslation();

  return (
    <>
      <div>{t("song:add_to_setlist/instructions")}</div>
      <SetlistListContainer
        addToSetlistMode
        song_id={song_id}
        onRequestClose={() => navigate("/songs")}
      />
    </>
  );
}
