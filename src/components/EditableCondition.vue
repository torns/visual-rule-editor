<template>
  <div class="row justify-center">
    <div v-for="(judge, index) in condition.children" :key="judge.uuid" class="row">
      <span v-if="index > 0" class="q-pa-xs">{{ condition.logic == 'and' ? '并且' : '或者' }}</span>
      <colored-selection v-if="mainLeftUuid != judge.left.uuid" :obj="judge.left" wrap-class="q-pa-xs"/>

      <span class="q-pa-xs">{{ displayCondition(judge) }}</span>
      <q-popup-edit v-if="judge.right.type=='string'" :value="judge.right.text" buttons >
        <q-input :value="judge.right.text" dense autofocus @input="(v) => { $store.commit('rule/UPDATE_DECISION_RULE_CONDITION_JUDGEMENT_RIGHT_STRING', { condition, judgementIndex: index, value: v }) }"/>
      </q-popup-edit>

      <operator-right-selection-wrap
        v-if="$judgementHasRight(judge)"
        :needed-value-type="$store.getters['env/findObject'](mainLeftUuid).valueType"
        :right-array="judge.right"
        :ext-info="{judgeIndex: index}"
        @symbol-selected="symbolSelected"
        @symbol-remove="symbolRemove"
        @item-selected="itemSelected"
        only-show
        text-wrap-class="q-pa-xs"
        in-table/>

    </div>

    <div v-if="!condition.children || condition.children.length == 0" class="bg-red-1">&nbsp;</div>

    <q-menu touch-position context-menu>
      <q-list dense style="min-width: 100px">
        <q-item clickable v-close-popup @click="editing = true">
          <q-item-section>修改</q-item-section>
        </q-item>
      </q-list>
    </q-menu>

    <q-dialog v-model="editing" persistent>
      <q-card>
        <q-card-section class="row items-center">
          <q-space />
          <q-btn icon="close" flat round dense v-close-popup />
        </q-card-section>
        <q-card-section>
          <condition-editor-wrap :condition="condition" :main-left-uuid="mainLeftUuid"/>
        </q-card-section>
      </q-card>
    </q-dialog>
  </div>
</template>

<script>
import ConditionEditorWrap from './ConditionEditorWrap'
import ColoredSelection from './ColoredSelection'
import OperatorRightSelectionWrap from './OperatorRightSelectionWrap'
export default {
  name: 'EditableCondition',
  components: {
    ConditionEditorWrap,
    ColoredSelection,
    OperatorRightSelectionWrap
  },
  props: {
    condition: Object,
    mainLeftUuid: String // 主判断对象的uuid
  },
  data: () => {
    return {
      editing: false
    }
  },
  methods: {
    symbolSelected (symbolIndex, v, extInfo) {
      let judgeIndex = extInfo ? (extInfo.judgeIndex) : 0
      this.$store.commit('rule/UPDATE_JUDGE_RIGHT', { judge: this.condition.children[judgeIndex], index: symbolIndex, oneRight: v })
      this.$store.commit('rule/UPDATE_JUDGE_RIGHT', { judge: this.condition.children[judgeIndex], index: symbolIndex + 1, oneRight: { type: 'unknow' } })
    },
    symbolRemove (symbolIndex, extInfo) {
      let judgeIndex = extInfo ? (extInfo.judgeIndex) : 0
      this.$store.commit('rule/REMOVE_JUDGE_RIGHT_AFTER_INDEX', { judge: this.condition.children[judgeIndex], index: symbolIndex })
    },
    itemSelected (rightIndex, v, extInfo) {
      let judgeIndex = extInfo ? (extInfo.judgeIndex) : 0
      this.$store.commit('rule/UPDATE_JUDGE_RIGHT', { judge: this.condition.children[judgeIndex], index: rightIndex, oneRight: v })
    },
    popupValue (judgementIndex) {
      return this.condition.children[judgementIndex].right.text
    },
    displayCondition (judge) {
      let text = ''
      if (judge.uuid) {
        if (this.mainLeft && this.mainLeft !== judge.left.uuid) {
          text = this.$store.getters['env/getObjectDisplayName'](judge.left.uuid).display + ' '
        }
        text += this.$tagT(judge.judgement)
      }
      return text
    }
  }
}
</script>
