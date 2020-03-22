import {
  isAuthenticated,
  session,
  logout,
  getAuthToken
} from "lib/firebase/auth";
import { getConfig } from "../config";
import { GET_CURRENT_AUTH_STATUS } from "lib/auth/queries";
import { gql } from "@apollo/client";

const config = getConfig();

function getViewportWidth() {
  return window.innerWidth;
}

export const getInitialData = () => {
  const appName = config.appName || "";

  return {
    uiState: {
      appName,
      page: {
        title: appName,
        subtitle: null,
        __typename: "UiStatePage"
      },
      widthBreakpoint: null,
      isSticky: false,
      navBarState: "main", // mode 1, mode 2
      navMenuHidden: getViewportWidth() > 900 ? false : true,
      controlsPanelHidden: getViewportWidth() > 900 ? false : true,
      youtubeHidden: false,
      darkMode:
        window.localStorage.getItem("CHORD_CHARTS_DARK_MODE") === "true"
          ? true
          : false,
      __typename: "UiState"
    },
    authStatus: {
      currentUser: null,
      isAuthenticated: false,
      __typename: "AuthStatus"
    }
  };
};

export const typeDefs = gql`
  type UiStatePage {
    title: String
    subtitle: String
  }

  type UiState {
    darkMode: Boolean
    appName: String
    page: UiStatePage
    widthBreakpoint: String
    isSticky: Boolean
    navBarState: String
    navMenuHidden: Boolean
    youtubeHidden: Boolean
  }

  type AuthStatus {
    currentUser: JSON
    isAuthenticated: Boolean
  }

  extend type Query {
    getCurrentAuthStatus: [AuthStatus]
    uiState: UiState
  }

  extend type Mutation {
    logout: JSON
    setCurrentGroupInSession(currentGroupId: String!): JSON
    toggleDarkMode: JSON
  }
`;

export const resolvers = {
  Mutation: {
    setWidthBreakpoint: (root, { value }, { client }) => {
      console.log('setWidthBreakpoint');
      client.writeData({
        data: {
          uiState: {
            widthBreakpoint: value,
            navMenuHidden: value === "sm" || value === "xs" || value === "md",
            controlsPanelHidden:
              value === "sm" || value === "xs" || value === "md",
            __typename: "UiState"
          }
        }
      });
      return null;
    },
    setNavBarState: async (root, { value }, { client }) => {
      console.log('setNavBarState');
      try {
        client.writeData({
          data: {
            uiState: { navBarState: value, __typename: "UiState" }
          }
        });
      } catch (e) {
        console.error(e, "wat");
      }
      return null;
    },
    toggleNavMenu: (root, args, { client }) => {
      console.log('toggleNavMenu');
      const {
        uiState: { navMenuHidden }
      } = client.readQuery({
        query: gql`
          {
            uiState @client {
              navMenuHidden
            }
          }
        `
      });

      client.writeData({
        data: {
          uiState: { navMenuHidden: !navMenuHidden, __typename: "UiState" }
        }
      });
      return null;
    },
    toggleControlsPanel: (root, args, { client }) => {
      console.log('toggleControlsPanel');
      const {
        uiState: { controlsPanelHidden }
      } = client.readQuery({
        query: gql`
          {
            uiState @client {
              controlsPanelHidden
            }
          }
        `
      });

      client.writeData({
        data: {
          uiState: {
            controlsPanelHidden: !controlsPanelHidden,
            __typename: "UiState"
          }
        }
      });
      return null;
    },
    toggleYoutube: (root, args, { client }) => {
      console.log('toggleYoutube');
      const {
        uiState: { youtubeHidden }
      } = client.readQuery({
        query: gql`
          {
            uiState @client {
              youtubeHidden
            }
          }
        `
      });

      client.writeData({
        data: {
          uiState: { youtubeHidden: !youtubeHidden, __typename: "UiState" }
        }
      });
      return null;
    },
    resetPageInfo: (root, args, { client }) => {
      console.log('resetPageInfo');
      client.writeData({
        data: {
          uiState: {
            page: {
              title: config.appName,
              subtitle: null,
              __typename: "UiStatePage"
            },
            __typename: "UiState"
          }
        }
      });
      return null;
    },
    setPageInfo: (root, { title, subtitle }, { client }) => {
      console.log('setPageInfo');
      const {
        uiState: { page: oldPageData }
      } = client.readQuery({
        query: gql`
          {
            uiState @client {
              page {
                title
                subtitle
              }
            }
          }
        `
      });

      const page: any = { ...oldPageData, __typename: "UiStatePage" };

      if (title !== undefined) {
        page.title = title;
      }

      if (subtitle !== undefined) {
        page.subtitle = subtitle;
      }

      client.writeData({
        data: {
          uiState: {
            page,
            __typename: "UiState"
          }
        }
      });
      return null;
    },
    setStickyState: (root, { value }, { client }) => {
      console.log('setStickyState');
      client.writeData({
        data: {
          uiState: {
            isSticky: value,
            __typename: "UiState"
          }
        }
      });
      return null;
    },
    toggleDarkMode: (root, args, { client, getCacheKey }) => {
      console.log('toggleDarkMode');
      const {
        uiState: { darkMode }
      } = client.readQuery({
        query: gql`
          {
            uiState @client {
              darkMode
            }
          }
        `
      });
      const nextDarkModeState = !darkMode;

      client.writeData({
        data: {
          uiState: { darkMode: nextDarkModeState, __typename: "UiState" }
        }
      });

      window.localStorage.setItem(
        "CHORD_CHARTS_DARK_MODE",
        nextDarkModeState ? "true" : "false"
      );
      return null;
    },
    logout: async (root, args, { client }) => {
      console.log('logout');
      const data = await logout();
      client.clearStore();
      //TODO: ideally we dont need to reload, but it is what it is
      window.location.reload();
      return data;
    },
    setCurrentGroupInSession: async (root, args, { client }) => {
      console.log('setCurrentGroupInSession');
      await session(args.currentGroupId);
      await getAuthToken(true);
      //actions.setCurrentGroup(payload); // probably a writeQuery here?
      // TODO
      // ideally we should do something that tells us to relogin or something to that matter
      // something to refresh everything; window.location.reload for the time being is MVPish
      window.location.reload();
      return null;
    }
  },
  Query: {
    getCurrentAuthStatus: async (root, args, { client }) => {
      try {
        const user = await isAuthenticated();

        if (user) {
          const res = {
            currentUser: user,
            isAuthenticated: true,
            __typename: "OnlineStatus"
          };

          client.writeQuery({
            query: GET_CURRENT_AUTH_STATUS,
            data: res
          });

          return res;
        }
      } catch (e) {
        console.error(e);
      }

      return {
        currentUser: null,
        isAuthenticated: false,
        __typename: "OnlineStatus"
      };
    }
  }
};
