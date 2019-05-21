<template>
  <div class="column">
    <div v-for="action in actions" :key="action.uuid">
      <assignment v-if="action.type=='assign'" :assign="action"/>
      <method-displayer v-if="action.type=='method'" :method="action"/>
      <editable-expression v-if="action.type=='expression'" :expression="action"/>

    </div>
    <div class="hover-show-parent">
      <q-btn flat size="xs" icon="keyboard_tab" class="hover-show q-pa-xs">
        <q-tooltip>
          新增动作
        </q-tooltip>
      </q-btn>
    </div>
  </div>
</template>

<script>
import Assignment from './Assignment'
import MethodDisplayer from './MethodDisplayer'
import EditableExpression from './EditableExpression'
export default {
  name: 'ActionsWrap',
  components: {
    Assignment,
    MethodDisplayer,
    EditableExpression
  },
  props: {
    actions: Array
  },
  data () {
    return {

    }
  }
}
</script>
