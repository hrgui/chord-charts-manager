import { useEffect } from "react";
import { useStoreActions } from "app/store";

export function useTitle(title: string, subtitle?: string) {
  const { setPageInfo, resetPageInfo } = useStoreActions(
    actions => actions.uiState
  );

  useEffect(() => {
    if (title) {
      setPageInfo({ title });
    }

    if (subtitle !== undefined) {
      setPageInfo({ subtitle });
    }

    return () => {
      resetPageInfo();
    };
  }, [title, subtitle, resetPageInfo, setPageInfo]);

  return null;
}
