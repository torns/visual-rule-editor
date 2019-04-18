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
  condition.children[judgementIndex].right.text = value
}

export function CHANGE_CONDITION_LOGIC (state, condition) {
  condition.logic = (condition.logic === 'and' ? 'or' : 'and')
}

export function UPDATE_JUDGE_JUDGEMENT (state, { judge, judgement, noRight }) {
  judge.judgement = judgement
  if (noRight) {
    judge.right = []
  }
}

export function UPDATE_STRING_TEXT (state, { obj, value }) {
  obj.text = value
}

export function ADD_CONDITION_CHILD (state, { condition, child }) {
  if (!condition.uuid || condition.uuid === '') {
    Vue.set(condition, 'uuid', 'tmp-condition' + Math.random())
    Vue.set(condition, 'children', [])
    Vue.set(condition, 'type', 'condition')
    Vue.set(condition, 'logic', 'and')
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

export function UPDATE_JUDGE_RIGHT (state, { judge, index, oneRight }) {
  let rightArray = judge.right
  Vue.set(rightArray, index, oneRight)
}

export function UPDATE_DECISION_RIGHT (state, { decision, assignIndex, oneRight }) {
  let rightArray = decision.right
  Vue.set(rightArray, assignIndex, oneRight)
}

export function REMOVE_JUDGE_FROM_CONDITION (state, { condition, judgeIndex }) {
  condition.children.splice(judgeIndex, 1)
}

export function REMOVE_JUDGE_RIGHT_AFTER_INDEX (state, { judge, index }) {
  judge.right.splice(index)
}
