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

export function addDecision ({ commit, state, getters }) {
  let conditionLength = getters['decisionConditionFieldUuids'].length
  let decisionLength = getters['decisionAssignUuids'].length
  let conditions = [], decisions = []
  for (let i = 0; i < conditionLength; i++) {
    conditions.push({})
  }
  for (let i = 0; i < decisionLength; i++) {
    decisions.push({})
  }
  let decision = {
    conditions,
    decisions
  }
  commit('ADD_DECISION_ROW', { decision })
}

export function moveCondition ({ commit }, { index, left }) {
  commit('MOVE_CONDITION_INDEX', { index, left })
}

export function moveDecision ({ commit }, { index, left }) {
  commit('MOVE_DECISION_INDEX', { index, left })
}
