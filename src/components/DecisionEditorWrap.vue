<template>
  <div class="column q-gutter-x-lg">
    <div class="row judge-row">
      <operator-right-selection-wrap
        :needed-value-type="$store.getters['env/findObject'](mainDecisionUuid).valueType"
        :right-array="decision.right"
        @symbol-selected="symbolSelected"
        @symbol-remove="symbolRemove"
        @item-selected="itemSelected"/>
    </div>
  </div>
</template>

<script>
import OperatorRightSelectionWrap from './OperatorRightSelectionWrap'
export default {
  name: 'DecisionEditorWrap',
  components: {
    OperatorRightSelectionWrap
  },
  props: {
    decision: Object,
    mainDecisionUuid: String
  },
  computed: {
    needValueType () {
      return this.$store.getters['env/findObject'](this.mainDecisionUuid).valueType
    }
  },
  methods: {
    symbolSelected (symbolIndex, v) {
      this.$store.commit('rule/UPDATE_DECISION_RIGHT', { decision: this.decision, index: symbolIndex, oneRight: v })
      this.$store.commit('rule/UPDATE_DECISION_RIGHT', { decision: this.decision, index: symbolIndex + 1, oneRight: { type: 'unknow' } })
    },
    symbolRemove (symbolIndex) {
      this.$store.commit('rule/REMOVE_DECISION_RIGHT_AFTER_INDEX', { decision: this.decision, index: symbolIndex })
    },
    itemSelected (rightIndex, v) {
      this.$store.commit('rule/UPDATE_DECISION_RIGHT', { decision: this.decision, index: rightIndex, oneRight: v })
    }
  }
}
</script>
