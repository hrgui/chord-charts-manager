export function isUserAdmin(user) {
  return user && user.role === "admin";
}

export function isUserWorkingAs(user) {
  return !!getWorkAsUser(user);
}

export function getWorkAsUser(user) {
  return user && user.work_as;
}
