import { getAuthToken } from "lib/firebase/auth";
import { getDevAuthToken } from "dev/auth";

export async function patchRequestWithToken() {
  let token;
  try {
    token = await getAuthToken();
  } catch (e) {
    if (!process.env.DEV) {
      throw e;
    }
  }

  if (!token && process.env.DEV) {
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
