<template>
  <q-menu>
    <q-list>
      <q-item clickable>
        <q-item-section>传递变量</q-item-section>
        <q-item-section side>
          <q-icon name="keyboard_arrow_right" />
        </q-item-section>
        <q-menu anchor="top right" self="top left">
          <q-list>
            <q-item dense clickable v-for="v in values" :key="'value:' + v.uuid">
              <q-item-section @click="objClicked(v)">{{ v.display }}</q-item-section>
              <q-item-section side v-if="v.methods && v.methods.length > 0">
                <q-icon name="keyboard_arrow_right" />
                <q-menu anchor="top right" self="top left">
                  <q-list>
                    <q-item dense clickable v-for="m in v.methods" :key="m.uuid" >
                      <q-item-section>{{ m.display }}</q-item-section>
                    </q-item>
                  </q-list>
                </q-menu>
              </q-item-section>
            </q-item>
          </q-list>
        </q-menu>
      </q-item>
    </q-list>
  </q-menu>
</template>

<script>
export default {
  name: 'SelectionMenu',
  props: {
    judge: Object,
    isLeft: Boolean
  },
  computed: {
    values: function () {
      return this.$store.state.env.values
    }
  },
  methods: {
    objClicked (v) {
      if (this.judge) {
        if (this.isLeft) {
          let changeJudgement = false
          if (this.judge.left.type === 'object') {
            let leftObj = this.$store.getters['env/findObject'](v.uuid)
            let objJudgements = this.$judgements4Type(leftObj.valueType)
            if (!objJudgements.includes(this.judge.judgement)) {
              changeJudgement = true
            }
          }
          this.$store.commit('rule/UPDATE_JUDGE_LEFT', { judge: this.judge, left: v, changeJudgement })
        }
      }
    }
  }
}
</script>
