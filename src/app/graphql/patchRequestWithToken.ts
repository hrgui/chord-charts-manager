import { getAuthToken } from "lib/firebase/auth";
import { getDevAuthToken } from "dev/auth";

export async function patchRequestWithToken() {
  let token;
  try {
    token = await getAuthToken();
  } catch (e) {
    if (import.meta.env.NODE_ENV !== "development") {
      throw e;
    }
  }

  if (!token && import.meta.env.NODE_ENV === "development") {
    token = getDevAuthToken();
  }
  if (!token) {
    return;
  }

  return {
    headers: {
      authorization: `Bearer ${token}`,
    },
  };
}
