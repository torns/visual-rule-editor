/*
export function someGetter (state) {
}
*/
export function getObjectDisplayName (state) {
  return (uuid) => {
    for (let i = 0; i < state.values.length; i++) {
      let obj = state.values[i]
      if (obj.uuid === uuid) {
        return {
          display: obj.display,
          color: 'pink-7'
        }
      }
    }
    for (let i = 0; i < state.variables.length; i++) {
      let obj = state.variables[i]
      if (obj.uuid === uuid) {
        return {
          display: obj.display,
          color: 'red-7'
        }
      }
    }
    return {
      display: '请选择',
      color: 'deep-orange'
    }
  }
}

export function findObject (state) {
  return (uuid, withoutSheet, withoutTree) => {
    let r = null
    let found = false
    for (let i = 0; i < state.values.length && !found; i++) {
      let obj = state.values[i]
      if (obj.uuid === uuid) {
        r = obj
        found = true
      }
    }

    for (let i = 0; i < state.variables.length && !found; i++) {
      let obj = state.variables[i]
      if (obj.uuid === uuid) {
        r = obj
        found = true
      }
    }

    if (!withoutSheet) {
      for (let i = 0; i < state.sheets.length && !found; i++) {
        let s = state.sheets[i]
        for (let vi = 0; vi < s.fields.length && !found; vi++) {
          let v = s.fields[vi]
          if (v.uuid === uuid) {
            r = v
            found = true
          }
        }
      }
    }

    if (!found && !withoutTree) {
      r = _findObjectFromTrees(uuid, state.trees)
    }

    return r
  }
}

function _findObjectFromTrees (uuid, trees) {
  for (let i = 0; i < trees.length; i++) {
    let t = trees[i]
    let obj = _deeplyFindObjectFromTree(t, uuid)
    if (obj != null) {
      return obj
    }
  }
  return null
}

function _deeplyFindObjectFromTree (treenode, uuid) {
  if (treenode.uuid === uuid) {
    return treenode
  }
  for (let vi = 0; vi < treenode.props.length; vi++) {
    let v = treenode.props[vi]
    if (v.uuid === uuid) {
      return v
    }
  }
  for (let ti = 0; ti < treenode.children.length; ti++) {
    let obj = _deeplyFindObjectFromTree(treenode.children[ti], uuid)
    if (obj) {
      return obj
    }
  }
  return null
}
