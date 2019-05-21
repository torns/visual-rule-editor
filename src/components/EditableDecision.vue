<template>
  <div class="row justify-center">
    &nbsp;
    <editable-expression v-if="decision.type == 'expression'" :expression="decision" />

    <div v-if="decision.type == 'assign'">
      <assignment :main-decision-uuid="mainDecisionUuid" :assign="decision" in-table text-wrap-class="q-pa-xs" only-show/>

      <div v-if="!decision.right || decision.right.length == 0" class="bg-red-1">&nbsp;</div>

    </div>
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
import Assignment from './Assignment'
import DecisionEditorWrap from './DecisionEditorWrap'
import EditableExpression from './EditableExpression'
export default {
  name: 'EditableDecision',
  components: {
    Assignment,
    DecisionEditorWrap,
    EditableExpression
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
