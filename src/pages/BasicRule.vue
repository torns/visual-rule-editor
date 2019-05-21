<template>
    <div class="q-pa-lg">
      <div class="row">
        chushihuadongzuo
      </div>
      <div class="row" v-if="rule.activities.length == 0">
        <activity-wrap />
      </div>
      <div v-for="(activity, index) in rule.activities" :key="activity.uuid" class="row">
        <activity-wrap :activity="activity" :is-else="index > 0" />
      </div>
      <div class="row">
        elsedongzuo
      </div>
    </div>
</template>

<script>
import ActivityWrap from 'src/components/ActivityWrap.vue'
export default {
  name: 'BasicRule',
  components: {
    ActivityWrap
  },
  data: () => {
    return {
    }
  },
  computed: {
    rule () {
      return this.$store.state.rule
    }
  }
}
</script>
