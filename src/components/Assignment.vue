<template>
  <div>
    <colored-selection v-if="assign.left && mainDecisionUuid != assign.left.uuid" is-left :obj="assign.left" class="q-pa-xs" @selection-changed="leftChanged"/>
    <span v-if="assign.left && mainDecisionUuid != assign.left.uuid">等于</span>
    <operator-right-selection-wrap
      :right-array="assign.right"
      :only-show="onlyShow"
      :text-wrap-class="textWrapClass"
      :in-table="inTable"/>
  </div>
</template>

<script>
import ColoredSelection from './ColoredSelection'
import OperatorRightSelectionWrap from './OperatorRightSelectionWrap'
export default {
  name: 'Assignment',
  components: {
    ColoredSelection,
    OperatorRightSelectionWrap
  },
  props: {
    mainDecisionUuid: String,
    assign: Object,
    inTable: Boolean,
    textWrapClass: String,
    onlyShow: Boolean
  },
  methods: {
    leftChanged (v) {
      this.$store.commit('rule/UPDATE_LEFT', { parent: this.assign, value: v })
    }
  }
}
</script>
