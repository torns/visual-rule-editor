/*
export function someAction (context) {
}
*/
export function setRule ({ commit }, rule) {
  commit('SET_RULE', rule)
}

export function updateDecisionConditionJudgementRightString ({ commit }, { contentIndex, conditionIndex, judgementIndex, value }) {
  commit('UPDATE_DECISION_RULE_CONDITION_JUDGEMENT_RIGHT_STRING', { contentIndex, conditionIndex, judgementIndex, value })
}
