
const sessionIdToUserMap = new Map();

export const setUser=(id, user) => {
  sessionIdToUserMap.set(id, user);
}

const getUser=(id) =>{
  return sessionIdToUserMap.get(id);
}

/*module.exports = {
  setUser,
  getUser,
};*/

//export default {setUser,getUser,};
export default getUser;