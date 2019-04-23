<template>
  <div class="row justify-center">
    <div v-if="decision.type == 'assign'">
      <colored-selection v-if="decision.left && mainDecisionUuid != decision.left.uuid" :obj="decision.left" class="q-pa-xs"/>
      <span v-if="decision.left && mainDecisionUuid != decision.left.uuid">等于</span>
      <operator-right-selection-wrap
        :right-array="decision.right"
        only-show
        text-wrap-class="q-pa-xs"
        in-table/>
    </div>

    <div v-if="!decision.right || decision.right.length == 0" class="bg-red-1">&nbsp;</div>

    <q-menu touch-position context-menu>
      <q-list dense style="min-width: 100px">
        <q-item clickable v-close-popup @click="editing = true">
          <q-item-section>修改</q-item-section>
        </q-item>
      </q-list>
    </q-menu>

    <q-dialog v-model="editing" persistent>
      <q-card>
        <q-card-section class="row items-center">
          <q-space />
          <q-btn icon="close" flat round dense v-close-popup />
        </q-card-section>
        <q-card-section>
          <decision-editor-wrap :decision="decision" :main-decision-uuid="mainDecisionUuid"/>
        </q-card-section>
      </q-card>
    </q-dialog>
  </div>
</template>

<script>
import DecisionEditorWrap from './DecisionEditorWrap'
import ColoredSelection from './ColoredSelection'
import OperatorRightSelectionWrap from './OperatorRightSelectionWrap'
export default {
  name: 'EditableDecision',
  components: {
    DecisionEditorWrap,
    ColoredSelection,
    OperatorRightSelectionWrap
  },
  props: {
    decision: Object,
    mainDecisionUuid: String
  },
  computed: {
  },
  data: () => {
    return {
      editing: false
    }
  },
  methods: {
  }
}
</script>
