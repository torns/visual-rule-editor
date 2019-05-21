<template>
  <div class="column">
    <div v-for="action in actions" :key="action.uuid">
      <assignment v-if="action.type=='assign'" :assign="action"/>
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
export default {
  name: 'ActionsWrap',
  components: {
    Assignment
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
