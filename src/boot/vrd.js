// import something here

// leave the export, even if you don't use it
export default ({ app, router, Vue }) => {
  // Vue.prototype.$objectDisplay = function (obj) {
  //   if (obj && obj.display) {
  //     return obj.display
  //   }
  //   return ''
  // }
  // Vue.prototype.$methodDisplay = function (method) {
  //   if (method && method.display) {
  //     let dis = method.display
  //     for (let i = 0; i < method.params.length; i++) {
  //       let replacement = '{arg' + (i + 1) + '}'
  //       let p = method.params[i]
  //       if (p.display) {
  //         dis.replace(replacement, p.display)
  //       } else {
  //         dis.replace(replacement, ' 未设置 ')
  //       }
  //     }
  //     return dis
  //   }
  //   return ''
  // }
  Vue.prototype.$judgements4Type = function (valueType) {
    let judgements = []
    switch (valueType) {
      case 'byte':
      case 'short':
      case 'int':
      case 'long':
      case 'double':
      case 'float':
        judgements = ['==', '!=', '>', '>=', '<', '<=']
        break
      case 'string':
        judgements = ['==', '!=', 'empty', 'notEmpty', 'null', 'notNull', 'startsWith', 'notStartsWith', 'endsWith', 'notEndsWith', 'contains', 'notContains', 'contained', 'notContained', 'regex']
        break
      default:
        judgements = ['==', 'null', 'notNull']
        break
    }
    return judgements
  }
  Vue.prototype.$judgementHasRight = function (judgement) {
    if (['empty', 'notEmpty', 'null', 'notNull'].includes(judgement)) {
      return false
    }
    return true
  }
  Vue.prototype.$tagT = function (tag) {
    switch (tag) {
      case '':
        return '请选择'
      case '==':
        return '等于'
      case '!=':
        return '不等于'
      case '>':
        return '大于'
      case '<':
        return '小于'
      case '>=':
        return '大于等于'
      case '<=':
        return '小于等于'
      case 'empty':
        return '为空'
      case 'notEmpty':
        return '不为空'
      case 'notNull':
        return '存在'
      case 'null':
        return '不存在'
      case 'startsWith':
        return '起始于'
      case 'notStartsWith':
        return '不起始于'
      case 'endsWith':
        return '结束于'
      case 'NotEndsWith':
        return '不结束于'
      case 'contains':
        return '包含'
      case 'notContains':
        return '不包含'
      case 'contained':
        return '存在于'
      case 'notContained':
        return '不存在于'
      case 'regex':
        return '符合正则表达式'
      default:
        return tag
    }
  }
  Vue.prototype.$availableSymbols = function (valueType) {
    let result = []
    switch (valueType) {
      case 'string':
        result.push('+')
        break
      case 'byte':
      case 'short':
      case 'int':
      case 'long':
        result.push('%')
      case 'double':
      case 'float':
        result.push(...['+', '-', '*', '/'])
        break
      default:
        break
    }
    return result
  }
}
