<template>
    <div>
      <condition-wrap v-bind:activity="rule.activity[0]"/>
    </div>
</template>

<script>
import ConditionWrap from 'src/components/ConditionWrap.vue'
export default {
  name: 'BasicRule',
  data: () => {
    return {
      rule: {

      }
    }
  }
}
</script>
