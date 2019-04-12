<template>
  <div :class="wrapClass" class="cursor-pointer">
    {{ $tagT(judge.judgement) }}
    <q-menu auto-close>
      <q-list>
        <q-item clickable v-for="judgement in showedJudgements" :key="judgement" @click="$store.commit('rule/UPDATE_JUDGE_JUDGEMENT', { judge, judgement})">
          <q-item-section>
            <q-item-label>{{ $tagT(judgement) }}</q-item-label>
          </q-item-section>
        </q-item>
      </q-list>
    </q-menu>
  </div>
</template>

<script>
export default {
  name: 'JudgementOperator',
  props: {
    judge: Object,
    wrapClass: {
      type: String,
      default: 'q-pa-sm'
    }
  },
  data: () => {
    return {
    }
  },
  computed: {
    leftType: {
      get () {
        if (this.judge.left.type === 'object') {
          let leftObj = this.$store.getters['env/findObject'](this.judge.left.uuid)
          return leftObj.valueType
        }
        return 'unknow'
      },
      set (vt) {

      }
    },
    canJudgements () {
      if (this.judge.left.type === 'object') {
        return this.$judgements4Type(this.leftType)
      }
      return []
    },
    showedJudgements () {
      let j = []
      for (let i = 0; i < this.canJudgements.length; i++) {
        let judgement = this.canJudgements[i]
        if (judgement !== this.judge.judgement) {
          j.push(judgement)
        }
      }
      return j
    }
  }
}
</script>
