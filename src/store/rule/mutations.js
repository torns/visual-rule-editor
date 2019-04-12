import Vue from 'vue'
/*
export function someMutation (state) {
}
*/
export function SET_RULE (state, rule) {
  state.type = rule.type
  state.uuid = rule.uuid
  switch (rule.type) {
    case 'basicRule':
      state.initial = rule.initial
      state.activities = rule.activities
      state.else = rule.else
      break
    case 'decisionRule':
      state.content = rule.content
  }
}

export function UPDATE_DECISION_RULE_CONDITION_JUDGEMENT_RIGHT_STRING (state, { condition, judgementIndex, value }) {
  // condition.children[judgementIndex].right.text = value
  let judgeRight = condition.children[judgementIndex].right
  Vue.set(judgeRight, 'text', value)
}

export function CHANGE_CONDITION_LOGIC (state, condition) {
  // condition.logic = (condition.logic === 'and' ? 'or' : 'and')
  Vue.set(condition, 'logic', (condition.logic === 'and' ? 'or' : 'and'))
}

export function UPDATE_JUDGE_JUDGEMENT (state, { contentIndex, conditionIndex, judgeIndex, judgement }) {
  // judge.judgement = judgement
  // Vue.set(judge, 'judgement', judgement)
  let judge = state.content[contentIndex].conditions[conditionIndex].children[judgeIndex]
  Vue.set(judge, 'judgement', judgement)
}

export function UPDATE_STRING_TEXT (state, { obj, value }) {
  // obj.text = value
  Vue.set(obj, 'text', value)
}

export function ADD_CONDITION_CHILD (state, { contentIndex, conditionIndex, child }) {
  let content = state.content[contentIndex]
  let condition = content.conditions[conditionIndex]
  if (!condition || !condition.children) {
    condition = {
      type: 'condition',
      logic: 'and',
      uuid: 'tmp-' + Math.random(),
      children: []
    }
    // content.conditions[conditionIndex] = condition
    Vue.set(content.conditions, conditionIndex, condition)
  }
  condition.children.push(child)
}

export function UPDATE_JUDGE_LEFT (state, { judge, left, changeJudgement }) {
  judge.left = {
    type: left.type,
    uuid: left.uuid
  }
  if (changeJudgement) {
    judge.judgement = ''
  }
}
