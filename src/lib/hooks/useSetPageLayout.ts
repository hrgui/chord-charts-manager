import { useState, useEffect } from "react";
import { useAppBarActions } from "./useAppBarActions";

export function useSetPageLayout(page, deps) {
  const [loading, setLoading] = useState(true);
  const { setNavBarState } = useAppBarActions();

  useEffect(() => {
    (async () => {
      await setNavBarState(page);
      setLoading(false);
    })();

    return () => {
      setNavBarState("main");
    };
  }, [page, setNavBarState]);

  return [loading];
}
