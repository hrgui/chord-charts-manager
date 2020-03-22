import { useMutation, gql } from "@apollo/client";
import { useTranslation } from "react-i18next";

export function useDeleteSetlistMutation() {
  const { t } = useTranslation();
  const res = useMutation(
    gql`
      mutation deleteSetlist($id: ID!) {
        setlist: deleteSetlist(id: $id) {
          id
        }
      }
    `
  );
  const oldRes = res[0];
  res[0] = (...params) => {
    const ok = window.confirm(t(`setlist:action/confirm_delete`));

    // unhandled rejection wat
    if (!ok) {
      return Promise.resolve({ extensions: { cancelled: true } });
    }

    return oldRes(...params);
  };

  return res;
}

export default useDeleteSetlistMutation;
