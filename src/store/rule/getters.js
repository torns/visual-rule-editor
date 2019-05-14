/*
export function someGetter (state) {
}
*/

export function ruleCondition (state) {
  return (contentIndex, conditionIndex) => {
    return state.content[contentIndex].conditions[conditionIndex]
  }
}

export function decisionConditionFieldUuids (state) {
  let uuids = []
  // for (let ci = 0; ci < state.content.length; ci++) {
  //   let content = state.content[ci]
  //   for (let ji = 0; ji < content.conditions.length; ji++) {
  //     let condition = content.conditions[ji]
  //     if (condition.uuid) {
  //       if (condition.children[0]) {
  //         let obj = condition.children[0].left
  //         if (!uuids.includes(obj.uuid)) {
  //           uuids.push(obj.uuid)
  //         }
  //       }
  //     }
  //   }
  // }
  for (let i = 0; i < state.head.conditions.length; i++) {
    let obj = state.head.conditions[i]
    uuids.push(obj.uuid)
  }
  return uuids
}

export function decisionAssignUuids (state) {
  let uuids = []
  // for (let ci = 0; ci < state.content.length; ci++) {
  //   let content = state.content[ci]
  //   for (let di = 0; di < content.decisions.length; di++) {
  //     let d = content.decisions[di]
  //     if (d.uuid && !uuids.includes(d.left.uuid)) {
  //       uuids.push(d.left.uuid)
  //     }
  //   }
  // }
  for (let i = 0; i < state.head.decisions.length; i++) {
    let obj = state.head.decisions[i]
    uuids.push(obj.uuid)
  }
  return uuids
}
