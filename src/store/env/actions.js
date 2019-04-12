/*
export function someAction (context) {
}
*/
export function setEnv ({ state, commit, rootState }, env) {
  commit('SET_ENV', env)
}
