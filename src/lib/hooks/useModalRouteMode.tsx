import { useLocation, useHistory } from "react-router-dom";

export function useModalRouteMode() {
  const location = useLocation<any>();
  const history = useHistory();
  const isModalMode = location.state?.background;

  function handleNavigate(loc, state?) {
    if (isModalMode) {
      history.goBack();
      return;
    }
    return history.push(loc, state);
  }

  return [isModalMode, handleNavigate];
}
