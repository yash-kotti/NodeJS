// For mapping to the users.

const userToSessionIdMap = new Map();

function setUser(id, user) {
  userToSessionIdMap.set(id, user);
}
function getUser(id) {
  console.log("User map get", userToSessionIdMap);
  return userToSessionIdMap.get(id);
}
console.log("User map", userToSessionIdMap);

module.exports = { setUser, getUser };
