import { FirestoreCRUDClient } from "lib/firebase/firestore/crudClient";

export default class GroupClient extends FirestoreCRUDClient {
  constructor() {
    super("group");
  }

  /**
   * Find all users groups
   * Note: a user has to be a member and a admin
   * @param uid
   */
  async findGroupsByUser(uid) {
    const queryDocumentSnapshot = await this.db
      .collection(this.collectionName)
      .where("members", "array-contains-any", [uid])
      .get();
    return queryDocumentSnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));
  }

  /**
   * Finds all the user's pending groups.
   * @param uid
   */
  async findPendingGroupsByUser(uid) {
    const queryDocumentSnapshot = await this.db
      .collection(this.collectionName)
      .where("pendingMembers", "array-contains-any", [uid])
      .get();
    return queryDocumentSnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));
  }

  /**
   * Makes the user join the group.
   * @param id Group ID
   * @param group The Group object
   * @param userUid user UID.
   */
  joinGroup(id, group, userUid) {
    if (
      (group.pendingMembers && group.pendingMembers.indexOf(userUid) !== -1) ||
      (group.admins && group.admins.indexOf(userUid) !== -1) ||
      (group.members && group.members.indexOf(userUid) !== -1)
    ) {
      return group;
    }

    return this.update(id, {
      ...group,
      pendingMembers: [...(group.pendingMembers || []), userUid]
    });
  }

  /**
   * Accepts a member to a group.
   * @param id Group ID
   * @param group The group object
   * @param userUid User UID
   * @param asAnAdmin If the user is to be an administrator.
   */
  acceptMemberToGroup(id, group, userUid, asAnAdmin = false) {
    const { pendingMembers, members, admins } = group;
    if (
      admins.indexOf(userUid) !== -1 ||
      members.indexOf(userUid) !== -1 ||
      pendingMembers.indexOf(userUid) === -1
    ) {
      return group;
    }

    let res = {
      ...group,
      pendingMembers: pendingMembers.filter(uid => userUid !== uid),
      members: [...members, userUid]
    };

    if (asAnAdmin) {
      res.admins = [...res.admins, userUid];
    }

    return this.update(id, res);
  }

  /**
   * Rejects a member to the group.
   * @param id Group ID
   * @param group The group object
   * @param userUid User UID
   */
  rejectMemberToGroup(id, group, userUid) {
    const { pendingMembers, admins, members } = group;

    if (admins.indexOf(userUid) !== -1 || members.indexOf(userUid) !== -1) {
      return group;
    }

    return this.update(id, {
      ...group,
      pendingMembers: pendingMembers.filter(uid => userUid !== uid)
    });
  }

  /**
   * User leaves the group.
   * @param id
   * @param group
   * @param userUid
   */
  leaveGroup(id, group, userUid) {
    const { admins, members } = group;
    if (admins.indexOf(userUid) === -1 && members.indexOf(userUid) === -1) {
      return group;
    }

    return this.update(id, {
      ...group,
      members: group.members.filter(uid => uid !== userUid),
      admins: group.admins.filter(uid => uid !== userUid)
    });
  }

  /**
   * Makes the user no longer be an admin of the group
   * @param id Group ID
   * @param group The group object
   * @param userUid User UID
   */
  demoteAdminInGroup(id, group, userUid) {
    return this.update(id, {
      ...group,
      admins: group.admins.filter(uid => uid !== userUid)
    });
  }
}
