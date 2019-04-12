<template>
  <span :class="['text-' + coloredDisplay.color, wrapClass]" class="cursor-pointer">
    {{coloredDisplay.display}}
    <selection-menu v-if="currentJudge" @item-selected="itemSelected"/>
  </span>
</template>

<script>
import SelectionMenu from './SelectionMenu'
export default {
  name: 'ColoredSelection',
  components: {
    SelectionMenu
  },
  props: {
    obj: Object,
    currentJudge: Object,
    isLeft: Boolean,
    wrapClass: {
      type: String,
      default: 'q-pa-sm'
    }
  },
  data: () => {
    return {
      coloredDisplay: {
        display: '请选择',
        color: 'red-10'
      }
    }
  },
  mounted () {
    if (this.obj) {
      if (this.obj.type === 'object') {
        this.coloredDisplay = this.$store.getters['env/getObjectDisplayName'](this.obj.uuid)
      } else if (this.obj.type === 'string') {
        this.coloredDisplay = {
          display: this.obj.text,
          color: 'grey-10'
        }
      }
    } else if (this.currentJudge) {
      let currentObj = this.isLeft ? this.currentJudge.left : this.currentJudge.right
      if (currentObj) {
        if (currentObj.type === 'object') {
          this.coloredDisplay = this.$store.getters['env/getObjectDisplayName'](currentObj.uuid)
        } else if (currentObj.type === 'string') {
          this.coloredDisplay = {
            display: currentObj.text,
            color: 'grey-10'
          }
        }
      }
    }
  },
  methods: {
    itemSelected (v) {
      if (this.isLeft) {
        let changeJudgement = false
        if (this.currentJudge.left.type === 'object') {
          let leftObj = this.$store.getters['env/findObject'](v.uuid)
          let objJudgements = this.$judgements4Type(leftObj.valueType)
          if (!objJudgements.includes(this.currentJudge.judgement)) {
            changeJudgement = true
          }
        }
        this.$store.commit('rule/UPDATE_JUDGE_LEFT', { judge: this.currentJudge, left: v, changeJudgement })
      }
    }
  }
}
</script>
