<template>
  <div @dblclick="editing = true">
    <span v-show="!editing">{{ displayDecision() }}</span>

    <q-popup-edit v-if="decision.right.type=='string'" v-model="decision.right.text" buttons>
      <q-input v-model="decision.right.text" dense autofocus />
    </q-popup-edit>

  </div>
</template>

<script>
export default {
  name: 'EditableDecision',
  components: {
  },
  props: {
    contentIndex: Number,
    decisionIndex: Number,
    mainDecisionUuid: String
  },
  computed: {
    decision: {
      get: function () {
        let decisions = this.$store.state.rule.content[this.contentIndex].decisions
        return decisions[this.decisionIndex]
      },
      set: function (newValue) {

      }
    }
  },
  data: () => {
    return {
      editing: false
    }
  },
  methods: {
    displayDecision () {
      if (this.decision.uuid) {
        if (this.decision.type === 'assign') {
          return this.decision.right.type === 'string' ? this.decision.right.text : 'xxxxx'
        }
      } else {
        return '&nbsp;'
      }
    }
  }
}
</script>
