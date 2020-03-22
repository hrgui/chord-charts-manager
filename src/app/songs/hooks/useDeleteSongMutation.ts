import { useMutation, gql } from "@apollo/client";
import { useTranslation } from "react-i18next";

export function useDeleteSongMutation() {
  const { t } = useTranslation();
  const res = useMutation(
    gql`
      mutation deleteSong($id: ID!) {
        song: deleteSong(id: $id) {
          id
        }
      }
    `
  );
  const oldRes = res[0];
  res[0] = (...params) => {
    const ok = window.confirm(t(`song:action/confirm_delete`));

    // unhandled rejection wat
    if (!ok) {
      return Promise.resolve({ extensions: { cancelled: true } });
    }

    return oldRes(...params);
  };

  return res;
}

export default useDeleteSongMutation;
