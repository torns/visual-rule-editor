/*
export function someMutation (state) {
}
*/
export function SET_ENV (state, env) {
  state.values = env.values
  state.variables = env.variables
  state.sheets = env.sheets
  state.trees = env.trees
}
