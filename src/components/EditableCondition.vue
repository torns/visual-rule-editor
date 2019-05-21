<template>
  <div class="row justify-center">
    &nbsp;
    <editable-expression v-if="condition.type == 'expression'" :expression="condition" />

    <div v-if="condition.type == 'condition'" class="row justify-center">
      <condition-content-displayer :condition="condition" :main-left-uuid="mainLeftUuid" />

      <div v-if="!condition.children || condition.children.length == 0" class="bg-red-1">&nbsp;</div>

    </div>
    <q-menu touch-position context-menu>
      <q-list dense style="min-width: 100px">
        <q-item clickable v-close-popup @click="editing = true">
          <q-item-section>修改</q-item-section>
        </q-item>
      </q-list>
    </q-menu>

    <q-dialog v-model="editing" persistent full-width>
      <q-card>
        <q-card-section class="row items-center">
          <q-space />
          <q-btn icon="close" flat round dense v-close-popup />
        </q-card-section>
        <q-card-section class="q-pb-lg">
          <condition-editor-wrap :condition="condition" :main-left-uuid="mainLeftUuid"/>
        </q-card-section>
      </q-card>
    </q-dialog>
  </div>
</template>

<script>
import ConditionEditorWrap from './ConditionEditorWrap'
import ConditionContentDisplayer from './ConditionContentDisplayer'
import EditableExpression from './EditableExpression'

export default {
  name: 'EditableCondition',
  components: {
    ConditionEditorWrap,
    EditableExpression,
    ConditionContentDisplayer
  },
  props: {
    condition: Object,
    mainLeftUuid: String // 主判断对象的uuid
  },
  data: () => {
    return {
      editing: false
    }
  }
}
</script>
