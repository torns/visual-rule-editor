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

export function UPDATE_DECISION_RIGHT (state, { decision, index, oneRight }) {
  let rightArray = decision.right
  Vue.set(rightArray, index, oneRight)
}

export function REMOVE_JUDGE_FROM_CONDITION (state, { condition, judgeIndex }) {
  condition.children.splice(judgeIndex, 1)
}

export function REMOVE_JUDGE_RIGHT_AFTER_INDEX (state, { judge, index }) {
  judge.right.splice(index)
}

export function REMOVE_DECISION_RIGHT_AFTER_INDEX (state, { decision, index }) {
  decision.right.splice(index)
}

export function UPDATE_METHOD_PARAM (state, { method, index, value }) {
  if (!method.params) {
    Vue.set(method, 'params', [])
  }
  Vue.set(method.params, index, value)
}

export function ADD_DECISION_ROW (state, { decision }) {
  state.content.push(decision)
}

export function MOVE_CONDITION_INDEX (state, { index, left }) {
  let contents = state.content
  for (let i = 0; i < contents.length; i++) {
    let conditions = contents[i].conditions
    let movedConditions = conditions.splice(index, 1)
    if (left) {
      conditions.splice(index - 1, 0, ...movedConditions)
    } else {
      conditions.splice(index + 1, 0, ...movedConditions)
    }
  }
}

export function MOVE_DECISION_INDEX (state, { index, left }) {
  let contents = state.content
  for (let i = 0; i < contents.length; i++) {
    let decisions = contents[i].decisions
    let movedDecisions = decisions.splice(index, 1)
    if (left) {
      decisions.splice(index - 1, 0, ...movedDecisions)
    } else {
      decisions.splice(index + 1, 0, ...movedDecisions)
    }
  }
}

export function APPEND_NEW_CONDITION (state, obj) {
  let contents = state.content
  for (let i = 0; i < contents.length; i++) {
    let conditions = contents[i].conditions
    if (i === 0) {
      conditions.push({
        uuid: 'tmp-condition' + Math.random(),
        type: 'condition',
        logic: 'and',
        children: [
          {
            uuid: 'tmp-judge' + Math.random(),
            type: 'judge',
            left: obj,
            judgement: '请选择',
            right: [
              { type: 'unknow' }
            ]
          }
        ]
      })
    } else {
      conditions.push({})
    }
  }
}

export function APPEND_NEW_ASSIGN (state, obj) {
  let contents = state.content
  for (let i = 0; i < contents.length; i++) {
    let decisions = contents[i].decisions
    decisions.push({
      uuid: 'tmp-assign' + Math.random(),
      type: 'assign',
      left: obj,
      right: [{ type: 'unknow' }]
    })
  }
}
