<template>
  <div class="wrapper row">
    <div v-for="(j, i) in judge.right" :key="j.uuid ? j.uuid : j.type + Math.random()" class="row">
      <div v-if="!onlyShow && j.type != 'unknow'" class="change-type cursor-pointer" :key="j.uuid">
        <q-icon name="gamepad" color="accent" class="fix-top">
          <q-tooltip>
            选择其他
          </q-tooltip>
        </q-icon>
        <selection-menu v-if="!onlyShow" :value-type="needValueType" :ext-info="{theJudge: j}" can-input  @item-selected="itemSelected"/>
      </div>
      <div v-if="j.type == 'unknow'" class="text-accent cursor-pointer fix-padding-top" :key="j.type + Math.random()">
        请选择
        <selection-menu v-if="!onlyShow" :value-type="needValueType" :ext-info="{theJudge: j}" can-input @item-selected="itemSelected"/>
      </div>
      <editable-string-text v-if="j.type === 'string'" :string-typed="j" :wrap-class="textWrapClass"/>
      <div v-if="j.type == 'object'" class="cursor-pointer fix-padding-top">
        <span v-if="j.uuid" :class="['text-' + getObjectColoredDisplay(j.uuid).color]" >
          {{getObjectColoredDisplay(j.uuid).display}}
        </span>
        <span v-if="!j.uuid" >
          请选择
        </span>
        <selection-menu v-if="!onlyShow" :value-type="needValueType" :ext-info="{ judgeIndex: i }" can-input @item-selected="itemSelected"/>
      </div>
    </div>
  </div>
</template>
<script>
import EditableStringText from './EditableStringText'
import SelectionMenu from './SelectionMenu'

export default {
  name: 'JudgeRightSelectionWrap',
  components: {
    SelectionMenu,
    EditableStringText
  },
  props: {
    judge: Object,
    onlyShow: {
      type: Boolean,
      default: false
    },
    textWrapClass: String
  },
  computed: {
    needValueType: {
      get () {
        return this.$store.getters['env/findObject'](this.judge.left.uuid).valueType
      }
    }
  },
  methods: {
    getObjectColoredDisplay (uuid) {
      return this.$store.getters['env/getObjectDisplayName'](uuid)
    },
    itemSelected (v, { judgeIndex }) {
      judgeIndex = judgeIndex | 0
      let oneRight
      if (v.type === 'string') {
        oneRight = v
      } else {
        oneRight = {
          uuid: v.uuid,
          type: v.type
        }
      }
      this.$store.commit('rule/UPDATE_JUDGE_RIGHT', { judge: this.judge, judgeIndex, oneRight })
    }
  }
}
</script>

<style scoped>
.fix-top {
  margin-top: 11px;
}
.fix-padding-top {
  padding-top: 8px;
}
.change-type {
  visibility: hidden
}
.wrapper:hover .change-type{
  visibility: visible;
}
</style>
