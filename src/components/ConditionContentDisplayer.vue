<template>
  <div class="row">
    <div v-for="(judge, index) in condition.children" :key="judge.uuid" class="row">
      <span v-if="index > 0" class="q-pa-xs">{{ condition.logic == 'and' ? '并且' : '或者' }}</span>

      <editable-expression v-if="judge.type == 'expression'" :expression="judge" wrap-class="q-pa-xs"/>

      <div v-if="judge.type == 'judge'" class="row">
        <colored-selection v-if="mainLeftUuid != judge.left.uuid" is-left :obj="judge.left" wrap-class="q-pa-xs" @selection-changed="(v) => {leftChanged(judge, v)}"/>

        <judgement-operator :judge="judge" wrap-class="q-pa-xs"/>

        <q-popup-edit v-if="judge.right.type=='string'" :value="judge.right.text" buttons >
          <q-input :value="judge.right.text" dense autofocus @input="(v) => { $store.commit('rule/UPDATE_DECISION_RULE_CONDITION_JUDGEMENT_RIGHT_STRING', { condition, judgementIndex: index, value: v }) }"/>
        </q-popup-edit>

        <operator-right-selection-wrap
          v-if="$judgementHasRight(judge)"
          :needed-value-type="$store.getters['env/findObject'](mainLeftUuid).valueType"
          :right-array="judge.right"
          :ext-info="{judgeIndex: index}"
          @symbol-selected="symbolSelected"
          @symbol-remove="symbolRemove"
          @item-selected="itemSelected"
          only-show
          text-wrap-class="q-pa-xs"
          in-table/>
      </div>
      <div v-if="judge.type == 'condition'" class="row">
        (
          <condition-content-displayer :condition="judge" :main-left-uuid="mainLeftUuid" />
        )
      </div>
    </div>
  </div>
</template>
<script>
import ColoredSelection from './ColoredSelection'
import JudgementOperator from './JudgementOperator'
import OperatorRightSelectionWrap from './OperatorRightSelectionWrap'
import EditableExpression from './EditableExpression'
export default {
  name: 'ConditionContentDisplayer',
  components: {
    ColoredSelection,
    JudgementOperator,
    EditableExpression,
    OperatorRightSelectionWrap
  },
  props: {
    condition: Object,
    mainLeftUuid: String // 主判断对象的uuid
  },
  methods: {
    symbolSelected (symbolIndex, v, extInfo) {
      let judgeIndex = extInfo ? (extInfo.judgeIndex) : 0
      let judge = this.condition.children[judgeIndex]
      this.$store.commit('rule/UPDATE_JUDGE_RIGHT', { judge, index: symbolIndex, oneRight: v })
      if (judge.right.length < symbolIndex + 1) {
        this.$store.commit('rule/UPDATE_JUDGE_RIGHT', { judge, index: symbolIndex + 1, oneRight: { type: 'unknow' } })
      }
    },
    symbolRemove (symbolIndex, extInfo) {
      let judgeIndex = extInfo ? (extInfo.judgeIndex) : 0
      this.$store.commit('rule/REMOVE_JUDGE_RIGHT_AFTER_INDEX', { judge: this.condition.children[judgeIndex], index: symbolIndex })
    },
    itemSelected (rightIndex, v, extInfo) {
      let judgeIndex = extInfo ? (extInfo.judgeIndex) : 0
      this.$store.commit('rule/UPDATE_JUDGE_RIGHT', { judge: this.condition.children[judgeIndex], index: rightIndex, oneRight: v })
    },
    leftChanged (judge, v) {
      let changeJudgement = false
      if (judge.left.type === 'object') {
        let leftObj = this.$store.getters['env/findObject'](v.uuid)
        let objJudgements = this.$judgements4Type(leftObj.valueType)
        if (!objJudgements.includes(judge.judgement)) {
          changeJudgement = true
        }
      }
      this.$store.commit('rule/UPDATE_JUDGE_LEFT', { judge, left: v, changeJudgement })
    }
  }
}
</script>
