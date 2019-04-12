<template>
    <div>
      <condition-wrap v-bind:activity="rule.activity[0]"/>
    </div>
</template>

<script>
import ConditionWrap from 'src/components/ConditionWrap.vue'
export default {
  name: 'BasicRule',
  components: {
    ConditionWrap
  },
  data: () => {
    return {
      rule: {

      }
    }
  }
}
</script>
