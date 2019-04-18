<template>
  <div class="row justify-center">
    <div v-if="decision.type == 'assign'">
      <colored-selection v-if="mainDecisionUuid != decision.left.uuid" :obj="decision.left" class="q-pa-xs"/>
      <span v-if="mainDecisionUuid != decision.left.uuid">等于</span>
      <assign-right-selection-wrap :decision="decision" only-show text-wrap-class="q-pa-xs"/>
    </div>
  </div>
</template>

<script>
import ColoredSelection from './ColoredSelection'
import AssignRightSelectionWrap from './AssignRightSelectionWrap'
export default {
  name: 'EditableDecision',
  components: {
    ColoredSelection,
    AssignRightSelectionWrap
  },
  props: {
    decision: Object,
    mainDecisionUuid: String
  },
  computed: {
  },
  data: () => {
    return {
    }
  },
  methods: {
  }
}
</script>
