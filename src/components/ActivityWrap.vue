<template>
  <div>
    <h5 class="text-weight-bolder q-my-md">
      {{isElse ? '否则': ''}}如果
    </h5>
    <div class="row">
      <condition-editor-wrap v-if="activity" :condition="activity.condition"/>
    </div>
    <h5 class="text-weight-bolder q-my-md">
      那么
    </h5>
  </div>
</template>

<script>
import ConditionEditorWrap from './ConditionEditorWrap'
export default {
  name: 'ConditionWrap',
  components: {
    ConditionEditorWrap
  },
  props: {
    activity: Object, // condition, actions
    isElse: {
      type: Boolean,
      default: false
    }
  }
}
</script>
