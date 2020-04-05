import GraphQLJSON from "graphql-type-json";
import { gql } from "@apollo/client";
import { makeExecutableSchema } from "graphql-tools";
import { merge, camelCase } from "lodash";
import { isUserAdmin } from "./role";
import * as Fuse from "fuse.js";

const typeDefs_ = gql`
  type Group {
    id: ID!
    name: String!
    acceptingMembers: Boolean
    members: [String!]
    pendingMembers: [String!]
    admins: [String!]
    is_pending_join_request: Boolean!
    owner_uid: String!
    updated_date: String!
    created_date: String!
  }

  input GroupInput {
    id: ID
    name: String
    acceptingMembers: Boolean
    members: [String!]
    pendingMembers: [String!]
    admins: [String!]
    owner_uid: String
    updated_date: String
    created_date: String
  }

  scalar JSON

  type Mutation {
    createSong(record: SongInput!): Song!
    updateSong(id: ID!, record: SongInput!): Song!
    deleteSong(id: ID!): Song!
    createSetlist(record: SetlistInput!): Setlist!
    updateSetlist(id: ID!, record: SetlistInput!): Setlist!
    deleteSetlist(id: ID!): Setlist!
    addSongToSetlist(id: ID!, song_id: ID!): JSON
    createGroup(record: GroupInput!): Group!
    updateGroup(id: ID!, record: GroupInput!): Group!
    deleteGroup(id: ID!): Group!
    joinGroup(id: ID, userUid: ID): Group!
    acceptMemberToGroup(id: ID, userUid: ID, isAdmin: Boolean): Group!
    rejectMemberToGroup(id: ID, userUid: ID): Group!
    leaveGroup(id: ID, userUid: ID): Group!
    demoteAdminInGroup(id: ID, userUid: ID): Group!
    createUser(record: UserInput!): User!
    updateUser(id: ID!, record: UserInput!): User!
    deleteUser(id: ID!): User!
    session(currentGroupId: String, workAsId: ID, clearWorkAs: Boolean): JSON
  }

  type Query {
    ping: String!
    songQuickSearch(search: String): [Song!]!
    songs(where: JSON, order_by: String): [Song!]!
    song(id: ID): Song!
    setlists(where: JSON, order_by: String): [Setlist!]!
    setlist(id: ID): Setlist!
    setlistSongs(id: ID): [Song!]!
    groups(where: JSON, order_by: String): [Group!]!
    group(id: ID): Group!
    users(where: JSON, order_by: String): [User!]!
    user(id: ID): User!
  }

  type Section {
    body: String
    title: String
    type: String
  }

  input SectionInput {
    body: String
    title: String
    type: String
  }

  type Setlist {
    id: ID!
    created_date: String!
    updated_date: String!
    owner_uid: String
    leader: String
    date: String!
    session: String
    notes: String
    share: JSON
    title: String!
    songs: [String!]
    settings: JSON
  }

  input SetlistInput {
    id: ID
    created_date: String
    updated_date: String
    owner_uid: String
    leader: String
    date: String!
    session: String
    notes: String
    share: JSON
    title: String!
    songs: [String!]
    settings: JSON
  }

  type Song {
    id: ID!
    created_date: String!
    updated_date: String!
    artist: String
    key: String!
    owner_uid: String
    sections: [Section!]
    share: JSON
    tags: [String!]
    title: String!
    youtube: String
  }

  input SongInput {
    id: ID
    created_date: String
    updated_date: String
    artist: String
    key: String!
    owner_uid: String
    sections: [SectionInput!]
    share: JSON
    tags: [String!]
    title: String!
    youtube: String
  }

  type User {
    id: ID!
    uid: String!
    email: String
    displayName: String
    role: String!
    groups: [Group!]!
    pendingGroups: [Group!]!
    currentGroupId: String
    theme: String!
    created_date: String!
    updated_date: String!
  }

  input UserInput {
    id: ID
    email: String
    displayName: String
    role: String
    currentGroupId: String
    theme: String
    created_date: String
    updated_date: String
  }
`;

const rootResolvers = {
  JSON: GraphQLJSON,
  Query: {
    ping: () => "pong",
    songQuickSearch: async (root, args, { api, user }) => {
      let songs = await api.song.list({ args: {}, user });
      //@ts-ignore
      const fuse = new Fuse(songs, {
        keys: ["title", "artist"],
      });
      return fuse.search(args.search);
    },
    setlistSongs: async (root, { id }, { api }) => {
      const setlist = await api.setlist.get(id);
      return Promise.all(setlist.songs.map((s) => api.song.get(s)));
    },
  },
  Mutation: {
    session: async (root, args, context) => {
      const { user, api } = context;

      if (!user) {
        return null;
      }

      let work_as = null;
      let { displayName = user.name || "", uid, currentGroupId } = user;

      const groups = await api.group.findGroupsByUser(user.uid);
      const pendingGroups = await api.group.findPendingGroupsByUser(user.uid);

      if (currentGroupId) {
        const foundGroups = groups.filter(({ id }) => id === currentGroupId);
        if (!foundGroups.length) {
          currentGroupId = null;
        }
      }

      if (args.currentGroupId) {
        const foundGroups = groups.filter(({ id }) => id === currentGroupId);
        if (foundGroups.length) {
          currentGroupId = args.currentGroupId;
          // we set it because its valid, and we want it to be the new one
          await api.user.update(uid, { currentGroupId });
        } // otherwise its just going to continue as is with currentGroupId
      }

      // this final result
      const res = {
        ...user,
        displayName,
        groups,
        currentGroupId:
          currentGroupId || (groups && groups[0] && groups[0].id) || null,
        pendingGroups: pendingGroups,
        work_as,
        isNewUser: groups.length === 0 && !isUserAdmin(user),
      };

      return res;
    },
    joinGroup: async (root, { id, userUid }, context) => {
      const { api, user } = context;
      const group = await api.group.get(id);

      if (!group.acceptingMembers) {
        throw new Error("Group is closed.");
      }

      // TODO might not be needed
      if (!isUserAdmin(user) && userUid) {
        // is user admin of the group?
        if (group.admins.indexOf(user.uid) === -1) {
          throw new Error("Unauthorized");
        }
      }

      if (!userUid) {
        userUid = user.uid;
      }

      const res = await api.group.joinGroup(id, group, userUid);

      return res;
    },
    acceptMemberToGroup: async (
      root,
      { id, userUid, isAdmin = false },
      context
    ) => {
      const { api, user } = context;
      const group = await api.group.get(id);

      // TODO might not be needed
      if (!isUserAdmin(user)) {
        if (group.admins.indexOf(user.uid) === -1) {
          throw new Error("Unauthorized");
        }
      }

      return api.group.acceptingMembers(id, group, userUid, isAdmin);
    },
    rejectMemberToGroup: async (root, { id, userUid }, context) => {
      const { api, user } = context;
      const group = await api.group.get(id);

      // TODO might not be needed
      if (!isUserAdmin(user)) {
        // is user admin of the group?
        if (group.admins.indexOf(user.uid) === -1) {
          throw new Error("Unauthorized");
        }
      }

      return api.group.rejectMemberToGroup(id, group, userUid);
    },
    leaveGroup: async (source, { userUid, id }, context) => {
      const { api, user } = context;
      const group = await api.group.get(id);

      // TODO might not be needed
      if (!isUserAdmin(user) && userUid) {
        if (group.admins.indexOf(user.uid) === -1) {
          throw new Error("Unauthorized");
        }
      }

      if (!userUid) {
        userUid = user.uid;
      }

      const res: any = await api.group.leaveGroup(id, group, userUid);

      return res;
    },
    demoteAdminInGroup: async (source, { userUid, id }, context) => {
      const { api, user } = context;
      const group = await api.group.get(id);

      // TODO might not be needed
      if (!isUserAdmin(user) && userUid) {
        if (group.admins.indexOf(user.uid) === -1) {
          throw new Error("Unauthorized");
        }
      }

      if (!userUid) {
        userUid = user.uid;
      }

      const res = await api.group.demoteAdminInGroup(id, group, userUid);

      return res;
    },
    addSongToSetlist: async (source, { song_id, id }, context) => {
      const { api } = context;
      const setlist = await api.setlist.get(id);
      setlist.songs.push(song_id);
      console.log(setlist);
      return api.setlist.update(id, setlist);
    },
  },
};

function createFirestoreResolvers(collectionName) {
  const pluralName = collectionName + "s";

  return {
    Query: {
      // get
      [collectionName]: (root, { id }, { api }) => {
        return api[collectionName].get(id);
      },
      //list
      [pluralName]: (root, args, { api, user }) => {
        return api[collectionName].list({ args, user });
      },
    },
    Mutation: {
      // create
      [camelCase("create_" + collectionName)]: (root, { record }, { api }) => {
        return api[collectionName].create(record);
      },
      [camelCase("update_" + collectionName)]: (
        root,
        { id, record },
        { api }
      ) => {
        return api[collectionName].update(id, record);
      },
      [camelCase("delete_" + collectionName)]: (root, { id }, { api }) => {
        return api[collectionName].delete(id);
      },
    },
  };
}

const schema_ = makeExecutableSchema({
  typeDefs: typeDefs_,
  resolvers: merge(
    rootResolvers,
    createFirestoreResolvers("song"),
    createFirestoreResolvers("setlist"),
    createFirestoreResolvers("group"),
    createFirestoreResolvers("user")
  ),
});

export default schema_;
