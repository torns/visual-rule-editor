<template>
  <div class="wrapper row">
    <div v-for="(j, i) in judge.right" :key="j.uuid ? j.uuid : j.type + Math.random()" class="row">
      <!-- 链接符号 -->
      <div v-if="i % 2 == 1 && j.type == 'symbol'" class="cursor-pointer" :class="textWrapClass">
        {{j.symbol}}
        <symbol-menu :target-obj-type="needValueType" :ext-info="{ symbolIndex: i }" @item-selected="symbolSelected" @remove-selected="symbolRemove"/>
      </div>
      <!-- 变量前的选择符号 -->
      <div v-if="i % 2 == 0 && !onlyShow && j.type != 'unknow'" class="change-type cursor-pointer">
        <q-icon name="gamepad" color="accent" class="fix-top">
          <q-tooltip>
            选择其他
          </q-tooltip>
        </q-icon>
        <selection-menu :value-type="needValueType" :ext-info="{ judgeIndex: i }" can-input  @item-selected="itemSelected"/>
      </div>
      <!-- 变量未知的情况下 -->
      <div v-if="i % 2 == 0 && j.type == 'unknow'" class="text-accent cursor-pointer" :class="{'fix-padding-top-table': inTable, 'fix-padding-top': !inTable}" :key="j.type + Math.random()">
        请选择
        <selection-menu v-if="!onlyShow" :value-type="needValueType" :ext-info="{ judgeIndex: i }" can-input @item-selected="itemSelected"/>
      </div>
      <!-- 变量为直接输入字符串 -->
      <editable-string-text v-if="i % 2 == 0 && j.type === 'string'" :string-typed="j" :wrap-class="textWrapClass"/>
      <!-- 变量为对象 -->
      <div v-if="i % 2 == 0 && j.type == 'object'" class="cursor-pointer" :class="{'fix-padding-top-table': inTable, 'fix-padding-top': !inTable}">
        <span v-if="j.uuid" :class="['text-' + getObjectColoredDisplay(j.uuid).color]" >
          {{getObjectColoredDisplay(j.uuid).display}}
        </span>
        <span v-if="!j.uuid" >
          请选择
        </span>
        <selection-menu v-if="!onlyShow" :value-type="needValueType" :ext-info="{ judgeIndex: i }" can-input @item-selected="itemSelected"/>
      </div>
    </div>
    <div v-if="showSymbolLink" class="link-symbol cursor-pointer">
      <q-icon name="usb" class="fix-top"/>
      <symbol-menu :target-obj-type="needValueType" :ext-info="{ symbolIndex: -1 }" @item-selected="symbolSelected"/>
    </div>
  </div>
</template>
<script>
import EditableStringText from './EditableStringText'
import SelectionMenu from './SelectionMenu'
import SymbolMenu from './SymbolMenu'

export default {
  name: 'JudgeRightSelectionWrap',
  components: {
    SelectionMenu,
    SymbolMenu,
    EditableStringText
  },
  props: {
    judge: Object,
    onlyShow: {
      type: Boolean,
      default: false
    },
    textWrapClass: {
      type: String,
      default: 'q-pa-sm'
    },
    inTable: Boolean
  },
  computed: {
    needValueType: {
      get () {
        return this.$store.getters['env/findObject'](this.judge.left.uuid).valueType
      }
    },
    showSymbolLink () {
      return !this.onlyShow && this.judge.right.length % 2 === 1
    }
  },
  methods: {
    getObjectColoredDisplay (uuid) {
      return this.$store.getters['env/getObjectDisplayName'](uuid)
    },
    symbolSelected (v, { symbolIndex }) {
      symbolIndex = symbolIndex === -1 ? this.judge.right.length : symbolIndex
      this.$store.commit('rule/UPDATE_JUDGE_RIGHT', { judge: this.judge, index: symbolIndex, oneRight: v })
      this.$store.commit('rule/UPDATE_JUDGE_RIGHT', { judge: this.judge, index: symbolIndex + 1, oneRight: { type: 'unknow' } })
    },
    symbolRemove ({ symbolIndex }) {
      this.$store.commit('rule/REMOVE_JUDGE_RIGHT_AFTER_INDEX', { judge: this.judge, index: symbolIndex })
    },
    itemSelected (v, { judgeIndex }) {
      let oneRight
      if (v.type === 'string') {
        oneRight = v
      } else {
        oneRight = {
          uuid: v.uuid,
          type: v.type
        }
      }
      this.$store.commit('rule/UPDATE_JUDGE_RIGHT', { judge: this.judge, index: judgeIndex, oneRight })
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
.fix-padding-top-table {
  padding-top: 4px;
}
.change-type, .link-symbol {
  visibility: hidden
}
.wrapper:hover .change-type, .wrapper:hover .link-symbol{
  visibility: visible;
}
</style>
