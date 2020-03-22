import { useMutation, gql } from "@apollo/client";

export function useDeleteSetlistMutation() {
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
    const ok = window.confirm(`Are you sure you want to delete this setlist?`);

    // unhandled rejection wat
    if (!ok) {
      return Promise.resolve({ extensions: { cancelled: true } });
    }

    return oldRes(...params);
  };

  return res;
}

export default useDeleteSetlistMutation;
