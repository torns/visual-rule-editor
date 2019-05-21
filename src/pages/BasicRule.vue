<template>
    <div class="q-pa-lg">
      <div class="column" v-if="showInitial">
        <h5 class="text-weight-bolder q-my-md">初始化动作</h5>
        <actions-wrap :actions="rule.initial"/>
      </div>
      <div class="column" v-if="rule.activities.length == 0">
        <activity-wrap />
      </div>
      <div v-for="(activity, index) in rule.activities" :key="activity.uuid" class="column">
        <activity-wrap :activity="activity" :is-else="index > 0" />
      </div>
      <div class="column" v-if="showElse">
        <h5 class="text-weight-bolder q-my-md">否则</h5>
        <actions-wrap :actions="rule.else"/>
      </div>

      <q-page-sticky position="top-right" :offset="[18, 68]">
        <q-btn round color="primary" :icon="showProperty ? 'arrow_forward' : 'arrow_back'" @click="showProperty = !showProperty"/>
      </q-page-sticky>
      <q-drawer side="right" v-model="showProperty" bordered :width="200" :breakpoint="500">
        <q-checkbox v-model="showInitial" label="初始化动作" />
         <q-checkbox v-model="showElse" label="否则动作" />
      </q-drawer>
    </div>
</template>

<script>
import ActionsWrap from 'src/components/ActionsWrap'
import ActivityWrap from 'src/components/ActivityWrap'
export default {
  name: 'BasicRule',
  components: {
    ActionsWrap,
    ActivityWrap
  },
  data: () => {
    return {
      showProperty: false
    }
  },
  computed: {
    rule () {
      return this.$store.state.rule
    },
    showInitial: {
      get () {
        return this.rule.initial.length > 0
      },
      set (v) {
        if (v) {
          this.$store.commit('rule/APPEND_CHILD', { parent: this.rule.initial, child: {} })
        } else {
          this.$store.commit('rule/CLEAR_CHILD', { parent: this.rule.initial })
        }
      }
    },
    showElse: {
      get () {
        return this.rule.else.length > 0
      },
      set (v) {
        if (v) {
          this.$store.commit('rule/APPEND_CHILD', { parent: this.rule.else, child: {} })
        } else {
          this.$store.commit('rule/CLEAR_CHILD', { parent: this.rule.else })
        }
      }
    }
  }
}
</script>
