<template>
  <div>
    <span>{{ displayDecision() }}</span>

    <q-popup-edit v-if="decision.right[0].type=='string'" v-model="decision.right[0].text" buttons>
      <q-input v-model="decision.right[0].text" dense autofocus />
    </q-popup-edit>

  </div>
</template>

<script>
export default {
  name: 'EditableDecision',
  components: {
  },
  props: {
    decision: Object,
    mainDecisionUuid: String
  },
  computed: {
  },
  data: () => {
    return {
    }
  },
  methods: {
    displayDecision () {
      if (this.decision.uuid) {
        if (this.decision.type === 'assign') {
          return this.decision.right[0].type === 'string' ? this.decision.right[0].text : 'xxxxx'
        }
      } else {
        return '&nbsp;'
      }
    }
  }
}
</script>
